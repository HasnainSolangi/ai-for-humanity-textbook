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
    Reads all markdown files from d:/ai-for-humanity-textbook/docs,
    splits them, and uploads vectors to Qdrant.
    """
    print("🚀 Starting Ingestion Process...")
    
    # 1. Load Documents
    docs_path = "docs"
    documents = []
    
    # Recursively find all .md files
    files = glob.glob(f"{docs_path}/**/*.md", recursive=True)
    print(f"📂 Found {len(files)} markdown files.")

    for file_path in files:
        try:
            # Force UTF-8 encoding
            loader = TextLoader(file_path, encoding="utf-8")
            docs = loader.load()
            for doc in docs:
                # Add metadata
                doc.metadata["source"] = file_path
                doc.metadata["filename"] = os.path.basename(file_path)
            documents.extend(docs)
        except Exception as e:
            print(f"⚠️ Failed to load {file_path}: {e}")

    print(f"📄 Loaded {len(documents)} documents from {len(files)} files.")

    # 2. Split Text
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n## ", "\n### ", "\n", " ", ""]
    )
    splits = text_splitter.split_documents(documents)
    print(f"🔪 Split into {len(splits)} chunks.")

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

    # 5. Embed and Upsert
    print("🧠 Generating embeddings and uploading (this will take a few minutes)...")
    embeddings = CohereEmbeddings(
        model="embed-english-v3.0", 
        cohere_api_key=settings.COHERE_API_KEY
    )
    
    vector_store = QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings,
    )
    
    # Batch add to avoid timeouts if possible, though LangChain handles it reasonably well
    vector_store.add_documents(splits)
    
    print(f"✅ Ingestion Complete! {len(splits)} chunks indexed.")
    return {"status": "success", "chunks_ingested": len(splits)}

if __name__ == "__main__":
    ingest_docs()
