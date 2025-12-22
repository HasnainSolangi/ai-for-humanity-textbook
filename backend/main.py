from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import get_settings

# Optional: Try to import better_auth, but don't fail if it's not installed
try:
    from better_auth import create_auth
    from better_auth.integrations.fastapi import add_better_auth_to_fastapi
    HAS_BETTER_AUTH = True
except ImportError:
    HAS_BETTER_AUTH = False
    print("⚠️ Warning: better-auth not installed. Auth features disabled.")

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Initialize Better-Auth only if available
if HAS_BETTER_AUTH:
    auth = create_auth(
        secret=settings.SECRET_KEY if hasattr(settings, 'SECRET_KEY') else "dev-secret-key-change-in-production",
        database_url=settings.DATABASE_URL if hasattr(settings, 'DATABASE_URL') else "sqlite:///./test.db",
        social_providers={
            "github": {
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
            },
            "google": {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
            }
        }
    )

    # Add Better-Auth to FastAPI app
    add_better_auth_to_fastapi(app, auth)
else:
    print("ℹ️ Better-Auth disabled for this session.")

@app.get("/")
def root():
    return {"message": "Welcome to AI for Humanity RAG API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include Routers
from api import routes
app.include_router(routes.router, prefix=settings.API_V1_STR)

