# Quick Start Guide

## 🚀 Deploy to Vercel

### 1. Install Dependencies (Already Done ✓)

The required packages are now installed:
- `@qdrant/js-client-rest` - Qdrant vector database client
- `cohere-ai` - Cohere AI SDK for embeddings and chat
- `@vercel/node` - Vercel serverless function types

### 2. Prepare Environment Variables

You need these environment variables in Vercel:

```
COHERE_API_KEY=<your-cohere-key>
QDRANT_URL=<your-qdrant-url>
QDRANT_API_KEY=<your-qdrant-key>
QDRANT_COLLECTION_NAME=textbook_rag
```

### 3. Push to GitHub

```bash
git add .
git commit -m "Add Vercel serverless RAG API"
git push origin main
```

### 4. Import to Vercel

1. Go to https://vercel.com/new
2. Import your repository
3. Add environment variables (from step 2)
4. Deploy!

## 📚 Ensure Book Content is Ingested

Your chatbot needs data! Run the ingestion script:

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Run ingestion
python backend/services/ingestion.py
```

This will:
- Scan all markdown files in `/docs`
- Generate embeddings using Cohere
- Upload to your Qdrant collection

## 🧪 Test Locally

```bash
# Start Docusaurus
npm start

# Open http://localhost:3000
# Click the chatbot button (bottom right)
# Ask: "What is this textbook about?"
```

**Note**: In local development, the chatbot tries to connect to `http://localhost:8000/api/v1/chat` first (your Python FastAPI backend). If that's not running, you can test the Vercel API route by changing `NODE_ENV` to production or modifying the URL in ChatWidget.tsx temporarily.

## 🎯 What Changed

### Frontend
- **ChatWidget.tsx**: Now uses `/api/chat` in production, falls back to localhost in dev
- Updated welcome message to "AI for Humanity textbook assistant"

### Backend
- **New `/api/chat.ts`**: Vercel serverless function with full RAG pipeline
- Handles embeddings, vector search, and response generation
- Includes greeting detection for friendly responses

### Configuration
- **package.json**: Added Qdrant, Cohere, and Vercel dependencies
- **vercel.json**: Deployment configuration with CORS and environment variables
- **DEPLOYMENT.md**: Full deployment guide
- **ENV_TEMPLATE.md**: Environment variable template

## ✅ Next Steps

1. **Verify Data**: Make sure Qdrant has your book content ingested
2. **Deploy**: Push to GitHub and import to Vercel
3. **Test**: Open chatbot on deployed site and ask questions
4. **Monitor**: Check Vercel logs if you encounter issues

## 🛟 Troubleshooting

### "I'm having trouble connecting to the knowledge base"

- **In Development**: Start the Python backend (`uvicorn backend.main:app --reload`)
- **In Production**: Check Vercel environment variables are set correctly

### Empty or generic responses

- Run the ingestion script to populate Qdrant
- Verify `QDRANT_COLLECTION_NAME` matches in both ingestion and API

### Build errors on Vercel

- Ensure Node.js version is 18+ in Vercel settings
- Check all environment variables are configured
