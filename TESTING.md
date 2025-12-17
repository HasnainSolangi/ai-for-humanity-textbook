# Testing Your RAG Chatbot Locally

## The Fix Applied

**Problem**: The API was accessing `payload.source` but your Qdrant data has `payload.metadata.source`

**Solution**: Updated `/api/chat.ts` to correctly access nested metadata:
```typescript
const metadata = payload.metadata || {};
const sourceFile = metadata.source || 'unknown';
const filename = metadata.filename || '';
const content = payload.page_content || '';
```

## Test Locally Before Deploying

### Option 1: Test with Vercel Dev (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run in development mode
vercel dev
```

This will:
- Start Docusaurus on port 3000
- Run API routes locally
- Let you test `/api/chat` endpoint

### Option 2: Test Python Backend (Alternative)

```bash
# Start Python backend
cd backend
uvicorn main:app --reload

# In another terminal, start frontend
npm start
```

## Quick Test

1. **Start the server** (choose Option 1 or 2 above)
2. **Open browser**: `http://localhost:3000`
3. **Click chatbot** (bottom-right floating button)
4. **Ask**: "What is AI for Humanity about?"
5. **Expected**: Should get answer from your book content

## Verify Data Connection

Check if your environment variables are set:

**For Local Development** (create `.env.local`):
```bash
COHERE_API_KEY=your_actual_key
QDRANT_URL=https://your-cluster.cloud.qdrant.io:6333
QDRANT_API_KEY=your_actual_key
QDRANT_COLLECTION_NAME=textbook_rag
```

**For Vercel Production**:
Add these same variables in Vercel Dashboard → Project Settings → Environment Variables

## Check Qdrant Connection

Your data looks good (413 points with proper structure):
- ✅ Collection: `textbook_rag`
- ✅ Vectors: 1024 dimensions (matches Cohere embed-english-v3.0)
- ✅ Payload structure: `page_content` + `metadata{source, filename}`

## Troubleshooting

### Still not getting responses?

1. **Check API logs**:
   - With `vercel dev`: Logs appear in terminal
   - In production: Vercel Dashboard → Functions → Logs

2. **Test API directly**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"What is this book about?"}'
```

3. **Verify environment variables**:
```bash
# Check in your terminal
echo $COHERE_API_KEY
echo $QDRANT_URL
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Failed to process question" | Check Cohere/Qdrant credentials in env vars |
| Empty response | Verify collection name is exactly `textbook_rag` |
| CORS error | Already handled in `/api/chat.ts` - shouldn't happen |
| "couldn't find information" | Question might be too specific - try broader topics |

## Next Steps

1. **Test locally first**: Use `vercel dev` or Python backend
2. **If working locally**: Push to GitHub and deploy to Vercel
3. **If still not working**: Check the specific error in console/logs
