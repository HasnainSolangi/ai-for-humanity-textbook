# Deploying AI for Humanity Textbook to Vercel

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Environment Variables**: You'll need:
   - `COHERE_API_KEY` - From [Cohere Dashboard](https://dashboard.cohere.com/)
   - `QDRANT_URL` - Your Qdrant cluster URL
   - `QDRANT_API_KEY` - Your Qdrant API key
   - `QDRANT_COLLECTION_NAME` - Default: `textbook_rag`

## Deployment Steps

### 1. Install Required Dependencies

```bash
npm install @qdrant/js-client-rest cohere-ai @vercel/node
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Add Vercel serverless API for RAG chatbot"
git push origin main
```

### 3. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Docusaurus
4. Add environment variables:
   - Click "Environment Variables"
   - Add each variable listed above
   - Make sure they're available for Production, Preview, and Development

### 4. Configure Build Settings

Vercel should auto-configure, but verify:
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 5. Deploy

Click "Deploy" and wait for the build to complete.

## Ingesting Book Content

After deployment, you need to populate your Qdrant database with book content:

### Option 1: Use Local Script (Recommended for first-time)

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Run ingestion script
python backend/services/ingestion.py
```

### Option 2: API Endpoint (Future)

You can create a `/api/ingest` endpoint for on-demand ingestion (requires authentication).

## Verifying Deployment

1. Visit your deployed site: `https://your-project.vercel.app`
2. Open the chatbot widget (bottom-right floating button)
3. Ask: "What is AI for Humanity about?"
4. Verify it responds with book content

## Troubleshooting

### Chatbot shows connection error

- Check Vercel deployment logs
- Verify environment variables are set correctly
- Ensure Qdrant database is accessible from Vercel
- Check if collection name matches

### Empty/Generic responses

- Verify Qdrant collection has data: Run ingestion script
- Check Cohere API key is valid
- Review API logs in Vercel dashboard

### Build fails

- Check `package.json` has all dependencies
- Verify Node.js version compatibility (use Node 18+)
- Review build logs in Vercel

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Create .env.local with your credentials
cp ENV_TEMPLATE.md .env.local
# Edit .env.local with your actual keys

# Start development server
npm run start

# In another terminal, start the Python backend (for local testing)
cd backend
uvicorn main:app --reload
```

## Continuous Deployment

Once connected to GitHub, Vercel will automatically deploy:
- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches
