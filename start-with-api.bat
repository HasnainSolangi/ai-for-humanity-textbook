@echo off
echo ========================================
echo Starting AI for Humanity Textbook
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server with Vercel...
echo This will enable the /api/chat endpoint
echo.
echo Once started:
echo - Open http://localhost:3000
echo - Click the chatbot button (bottom-right)
echo - Ask: "What is this textbook about?"
echo.
call npx vercel dev
