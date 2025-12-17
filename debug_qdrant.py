
from qdrant_client import QdrantClient
from backend.core.config import get_settings
from langchain_cohere import CohereEmbeddings

settings = get_settings()

def debug_qdrant():
    print("🐞 Debugging Qdrant Connection & Data...")
    
    # 1. Connect
    url = settings.QDRANT_URL
    key = settings.QDRANT_API_KEY
    if not key:
        print("⚠️ No API Key found in settings.")
    
    client = QdrantClient(url=url, api_key=key)
    
    # 2. Check Collection Info
    col_name = settings.QDRANT_COLLECTION_NAME
    try:
        col_info = client.get_collection(col_name)
        print(f"✅ Collection '{col_name}' exists!")
        print(f"   - Status: {col_info.status}")
        print(f"   - Vectors Count: {col_info.vectors_count}")
        print(f"   - Indexed Vectors: {col_info.indexed_vectors_count}")
        
        # Check config for dimension
        # Note: structure depends on Qdrant version, usually config.params.vectors.size
        print(f"   - Collection Configuration: {col_info.config}")
        
    except Exception as e:
        print(f"❌ Failed to get collection info: {e}")
        return

    # 3. Test Embedding & Search
    print("\n🧪 Testing Search with Cohere Embeddings...")
    try:
        embeddings = CohereEmbeddings(
            model="embed-english-v3.0",
            cohere_api_key=settings.COHERE_API_KEY
        )
        query_text = "What is Physical AI?"
        query_vector = embeddings.embed_query(query_text)
        print(f"   - Generated query vector of size: {len(query_vector)}")
        
        results = client.search(
            collection_name=col_name,
            query_vector=query_vector,
            limit=3
        )
        print(f"✅ Search returned {len(results)} results.")
        for hit in results:
            print(f"   - Score: {hit.score:.4f} | Payload: {hit.payload.get('source', 'Unknown')}")
            # print(f"     Content snippet: {hit.payload.get('page_content', '')[:100]}...")
            
    except Exception as e:
        print(f"❌ Search Failed: {e}")

if __name__ == "__main__":
    debug_qdrant()
