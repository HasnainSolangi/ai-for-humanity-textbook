
import os
import psycopg2
from qdrant_client import QdrantClient
from dotenv import load_dotenv

load_dotenv()

def verify_connections():
    print("🔍 Starting Verification...")
    
    # 1. Verify Qdrant
    qdrant_key = os.getenv("QDRANT_API_KEY")
    qdrant_url = os.getenv("QDRANT_URL")
    
    # Check if user added key to env, if not try the one from prompt just for testing this script (NOT SAFE FOR PROD, BUT USER REQUESTED VERIFICATION)
    # The user posted: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.D8XfwMQWOrj-APFIe0Q4yEMeIaojP-XIfBuNDPrMdt4
    # URL: https://f5820ca8-f5ab-469d-bb86-967448d610db.us-west-2-0.aws.cloud.qdrant.io:6333
    
    if not qdrant_key or not qdrant_url:
        print("⚠️ QDRANT_API_KEY or QDRANT_URL not found in .env files.")
        print("   Using fallback values from your prompt for this test only.")
        qdrant_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.D8XfwMQWOrj-APFIe0Q4yEMeIaojP-XIfBuNDPrMdt4"
        qdrant_url = "https://f5820ca8-f5ab-469d-bb86-967448d610db.us-west-2-0.aws.cloud.qdrant.io:6333"

    try:
        client = QdrantClient(url=qdrant_url, api_key=qdrant_key)
        collections = client.get_collections()
        print(f"✅ Qdrant Connected! Found {len(collections.collections)} collections.")
        for col in collections.collections:
            print(f"   - {col.name}")
    except Exception as e:
        print(f"❌ Qdrant Connection Failed: {e}")

    # 2. Verify Database (Neon)
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("⚠️ DATABASE_URL not found in .env")
    else:
        try:
            conn = psycopg2.connect(db_url)
            print("✅ Database (Neon) Connected Successfully!")
            conn.close()
        except Exception as e:
            print(f"❌ Database Connection Failed: {e}")

    # 3. Verify Cohere Key Presence
    cohere_key = os.getenv("COHERE_API_KEY")
    if cohere_key:
        print("✅ COHERE_API_KEY found.")
    else:
        print("⚠️ COHERE_API_KEY missing.")

if __name__ == "__main__":
    verify_connections()
