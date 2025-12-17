@echo off
echo ========================================
echo AI for Humanity - Starting Backend
echo ========================================
echo.
echo Starting FastAPI backend on http://localhost:8000
echo The chatbot will connect to this API
echo.
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
