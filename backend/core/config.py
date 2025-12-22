from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    APP_NAME: str = "AI for Humanity RAG"
    API_V1_STR: str = "/api/v1"
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Cohere
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY", "")

    # Qdrant
    QDRANT_URL: str = os.getenv("QDRANT_URL", "https://f5820ca8-f5ab-469d-bb86-967448d610db.us-west-2-0.aws.cloud.qdrant.io:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.D8XfwMQWOrj-APFIe0Q4yEMeIaojP-XIfBuNDPrMdt4")
    QDRANT_COLLECTION_NAME: str = "textbook_rag"
    
    # Database (Neon/Postgres)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")

    # OAuth Providers
    GITHUB_CLIENT_ID: str = os.getenv("GITHUB_CLIENT_ID", "")
    GITHUB_CLIENT_SECRET: str = os.getenv("GITHUB_CLIENT_SECRET", "")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")

    # CORS - Allow ALL origins for Hackathon/Demo flexibility
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = [".env", "../.env"]
        env_file_encoding = 'utf-8'
        extra = 'ignore'


@lru_cache
def get_settings():
    return Settings()
