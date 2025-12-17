from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import get_settings

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

@app.get("/")
def root():
    return {"message": "Welcome to AI for Humanity RAG API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include Routers
from backend.api import routes
app.include_router(routes.router, prefix=settings.API_V1_STR)
