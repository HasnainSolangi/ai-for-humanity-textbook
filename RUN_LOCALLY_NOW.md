# Run Locally RIGHT NOW (No GitHub/Vercel Needed!)

## What "vercel dev" Actually Does

**IT RUNS ON YOUR LOCAL COMPUTER!** It's just a development server (like `npm start`) but better because it:
- Runs Docusaurus on http://localhost:3000
- Enables the `/api/chat` endpoint 
- Loads your `.env.local` file

**You're NOT deploying anything!**

## Run Now - Step by Step

### 1. Open Terminal in Your Project Folder

```bash
cd d:\ai-for-humanity-textbook
```

### 2. Run ONE of These Commands:

**Option A: Use the script I made**
```bash
.\start-with-api.bat
```

**Option B: Run manually**
```bash
npx vercel dev
```

**Option C: Use your existing Python backend instead**
```bash
# Terminal 1
cd backend
uvicorn main:app --reload

# Terminal 2  
npm start
```

### 3. What Happens Next?

If you chose Option A or B (Vercel dev), you'll see:
- "Vercel CLI" might ask to login - **SKIP THIS by pressing Ctrl+C and try Option C**
- OR it will ask setup questions - just press Enter for defaults
- Server starts on http://localhost:3000

If you chose Option C (Python backend):
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:3000
- Chatbot will connect to your Python backend

### 4. Test the Chatbot

1. Open http://localhost:3000
2. Click the purple chatbot button (bottom-right)
3. Ask: "What is this textbook about?"

## If You Get Errors

**"Vercel login required"**
→ Use Option C (Python backend) instead

**"Port already in use"**
→ Close other running servers and try again

**Still "connection error"?**
→ The server isn't running. Make sure you see "Ready" or "Compiled successfully" in terminal

---

## Later: Deploy to Vercel (Optional)

When you're ready to deploy, THEN we'll:
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

But for now, just run locally to test!
