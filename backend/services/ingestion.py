import sys
import os

# Add the parent directory (backend) to sys.path so we can import 'core'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import glob
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http import models
from core.config import get_settings

settings = get_settings()

def ingest_docs():
    """
    Reads all markdown files from:
    1. docs/ (English)
    2. i18n/ur/docusaurus-plugin-content-docs/current/ (Urdu)
    Splits them, and uploads vectors to Qdrant with language metadata.
    """
    print("🚀 Starting Ingestion Process (English + Urdu)...")
    
    # 1. Load Documents
    documents = []
    
    # Load ENGLISH files from docs/
    print("📂 Loading English files from docs/...")
    en_docs_path = "docs"
    en_files = glob.glob(f"{en_docs_path}/**/*.md", recursive=True)
    print(f"   Found {len(en_files)} English markdown files.")
    
    for file_path in en_files:
        try:
            loader = TextLoader(file_path, encoding="utf-8")
            docs = loader.load()
            for doc in docs:
                # Add metadata
                doc.metadata["source"] = file_path
                doc.metadata["filename"] = os.path.basename(file_path)
                doc.metadata["language"] = "en"  # English marker
            documents.extend(docs)
        except Exception as e:
            print(f"   ⚠️ Failed to load {file_path}: {e}")
    
    print(f"   ✅ Loaded {len(documents)} documents from English files.")
    
    # Load URDU files from i18n/ur/docusaurus-plugin-content-docs/current/
    print("📂 Loading Urdu files from i18n/ur/...")
    ur_docs_path = "i18n/ur/docusaurus-plugin-content-docs/current"
    ur_files = glob.glob(f"{ur_docs_path}/**/*.md", recursive=True)
    print(f"   Found {len(ur_files)} Urdu markdown files.")
    
    en_count = len(documents)
    for file_path in ur_files:
        try:
            loader = TextLoader(file_path, encoding="utf-8")
            docs = loader.load()
            for doc in docs:
                # Add metadata
                doc.metadata["source"] = file_path
                doc.metadata["filename"] = os.path.basename(file_path)
                doc.metadata["language"] = "ur"  # Urdu marker
            documents.extend(docs)
        except Exception as e:
            print(f"   ⚠️ Failed to load {file_path}: {e}")
    
    ur_count = len(documents) - en_count
    print(f"   ✅ Loaded {ur_count} documents from Urdu files.")

    print(f"\n📄 Total: {len(documents)} documents loaded ({en_count} EN + {ur_count} UR)")

    # 2. Split Text
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n## ", "\n### ", "\n", " ", ""]
    )
    splits = text_splitter.split_documents(documents)
    print(f"🔪 Split into {len(splits)} chunks.")
    
    # Show language distribution
    en_chunks = sum(1 for s in splits if s.metadata.get("language") == "en")
    ur_chunks = sum(1 for s in splits if s.metadata.get("language") == "ur")
    print(f"   📊 Chunk distribution: {en_chunks} EN + {ur_chunks} UR")

    # 3. Connect to Qdrant
    if settings.QDRANT_API_KEY:
        client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
        print("☁️ Connecting to Qdrant Cloud...")
    else:
        client = QdrantClient(url=settings.QDRANT_URL)
        print("🏠 Connecting to Qdrant Local...")

    # 4. Recreate Collection (Force Fresh Start)
    collection_name = settings.QDRANT_COLLECTION_NAME
    print(f"♻️ Recreating collection '{collection_name}' to ensure fresh data...")
    client.recreate_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE),
    )

    # 5. Embed and Upsert with Language-Aware Embedding
    print("🧠 Generating embeddings for English and Urdu content...")
    print("   Using Cohere embed-english-v3.0 (supports multilingual including Urdu)...")
    
    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",  # Supports 100+ languages including Urdu
        cohere_api_key=settings.COHERE_API_KEY
    )
    
    vector_store = QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings,
    )
    
    # Batch add with aggressive rate limiting for Cohere trial API
    print(f"   Upserting {len(splits)} chunks to Qdrant...")
    print("   ⏳ Processing in small batches with long delays (respecting Cohere trial rate limits)...")
    
    import time
    batch_size = 25  # Even smaller batches to respect rate limits
    max_retries = 5
    for i in range(0, len(splits), batch_size):
        batch = splits[i:i + batch_size]
        batch_num = i // batch_size + 1
        total_batches = (len(splits) + batch_size - 1) // batch_size
        print(f"   📦 Batch {batch_num}/{total_batches} ({len(batch)} chunks)...", end=" ", flush=True)
        
        retry_count = 0
        success = False
        while retry_count < max_retries and not success:
            try:
                vector_store.add_documents(batch)
                print("✅")
                success = True
            except Exception as e:
                error_msg = str(e)
                if "timed out" in error_msg.lower():
                    print(f"⏱️ timeout", end="")
                elif "too many requests" in error_msg.lower() or "429" in error_msg:
                    print(f"🔄 rate_limit", end="")
                else:
                    print(f"⚠️ error", end="")
                
                retry_count += 1
                if retry_count < max_retries:
                    wait_time = 30 * retry_count  # Exponential backoff: 30s, 60s, 90s...
                    print(f" (retry {retry_count}/{max_retries} in {wait_time}s)...", end="", flush=True)
                    time.sleep(wait_time)
                else:
                    print(f" ❌ FAILED after {max_retries} retries")
                    raise RuntimeError(f"Failed to ingest batch {batch_num} after {max_retries} retries") from e
        
        # Longer delay between batches to respect rate limits
        if i + batch_size < len(splits):
            time.sleep(10)  # 10 second delay between batches
    
    print(f"\n✅ Ingestion Complete!")
    print(f"   Total chunks indexed: {len(splits)}")
    print(f"   English chunks: {en_chunks}")
    print(f"   Urdu chunks: {ur_chunks}")
    print(f"   Collection: {collection_name}")
    return {"status": "success", "chunks_ingested": len(splits), "en_chunks": en_chunks, "ur_chunks": ur_chunks}

if __name__ == "__main__":
    ingest_docs()
