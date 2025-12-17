from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from backend.services.ingestion import ingest_docs
from backend.services.chat import ask_question

class ChatRequest(BaseModel):
    question: str

router = APIRouter()

@router.post("/ingest")
async def trigger_ingestion(background_tasks: BackgroundTasks):
    """
    Triggers the ingestion process in the background.
    """
    background_tasks.add_task(ingest_docs)
    return {"message": "Ingestion started in background"}

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    RAG Chat endpoint.
    """
    try:
        answer = await ask_question(request.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
