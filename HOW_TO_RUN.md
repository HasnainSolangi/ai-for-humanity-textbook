# 🚀 How to Run Your Project (IMPORTANT!)

## The Issue You're Experiencing

You're seeing "trouble connecting to knowledge base" because:
1. Running `npm start` only starts Docusaurus (frontend)
2. The `/api/chat` route needs **Vercel Dev** to work
3. I've created `.env.local` with your credentials ✅

## ✅ SOLUTION: Run with Vercel Dev

### Option 1: Use the Startup Script (Easiest)

```bash
.\start-with-api.bat
```

This will:
- Install dependencies
- Start Vercel dev server (enables API routes)
- Open on http://localhost:3000

### Option 2: Manual Start

```bash
npx vercel dev
```

When prompted:
- "Set up and develop": Yes
- "Which scope": Select your account
- "Link to existing project": No (first time) or Yes (if you've deployed)
- "Project name": ai-for-humanity-textbook
- "Directory": ./
- "Override settings": No

## 🎯 After Starting

1. Open http://localhost:3000
2. Click the chatbot button (bottom-right purple button)
3. Ask: **"What is this textbook about?"**
4. You should get an answer from your book! 📚

## Auto-Scroll Fixed ✅

The chat will now automatically scroll down on every message and when you hit enter!

## Alternative: Use Python Backend

If Vercel dev doesn't work, you can use your existing Python backend:

```bash
# Terminal 1: Start Python backend
cd backend
uvicorn main:app --reload

# Terminal 2: Start frontend
npm start
```

## Troubleshooting

### "Vercel not found"
```bash
npm install -g vercel
```

### Still showing connection error?
- Check if Vercel dev is running (not just `npm start`)
- Look for "api/chat.ts" in the console logs
- Make sure `.env.local` exists (I created it for you)

### Environment Variables Not Loading?
Restart the server after creating `.env.local`
