
# Spec-Kit Implementation Prompt: Integrated RAG Chatbot

**Use the following prompt with your AI Agent (via `/sp.specify` or similar) to generate the complete RAG Chatbot implementation:**

---

## 🚀 Requirement: Integrated RAG Chatbot Development

**Objective:**
Build and embed a Retrieval-Augmented Generation (RAG) chatbot within the "Physical AI & Humanoid Robotics" Docusaurus book. The system must answer user questions based *only* on the book's content.

### 🛠️ Tech Stack & Constraints
1.  **Frontend:** React (embedded in Docusaurus via `swizzling` or Layout wrapping).
2.  **Backend:** FastAPI (Python) running on `localhost:8000`.
3.  **Vector Database:** Qdrant Cloud (Free Tier) or Local Docker.
4.  **Database:** Neon (Serverless Postgres) for storing chat logs/history.
5.  **LLM:** OpenAI GPT-4o-mini (via LangChain or ChatKit SDK).
6.  **Ingestion:** A Python script to parse Docusaurus Markdown files (`docs/`), split them, embed them using `text-embedding-3-small`, and upload to Qdrant.

### 📋 detailed Implementation Specs

#### 1. Backend Architecture (`/backend`)
*   **Structure:**
    *   `main.py`: FastAPI entry point with CORS enabled for `localhost:3000`.
    *   `core/config.py`: Pydantic settings for `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.
    *   `services/ingestion.py`:
        *   Load all `.md` files from `docs/`.
        *   Clean frontmatter (YAML headers).
        *   Split text into 1000-token chunks with 200 overlap.
        *   Upsert vectors to Qdrant collection `textbook_rag`.
    *   `services/chat.py`:
        *   Receive `question` from frontend.
        *   Embed question.
        *   Search Qdrant for top 5 relevant chunks.
        *   Construct a prompt: "Answer based ONLY on the following context...".
        *   Return stream or JSON response.
    *   `api/routes.py`:
        *   `POST /api/chat`: Accepts `{question: str}`. Returns `{answer: str}`.
        *   `POST /api/ingest`: Triggers the ingestion process.

#### 2. Frontend Integration (`/src`)
*   **Chat Widget:** Create `src/components/ChatWidget.tsx`.
    *   A floating "Chat" button in the bottom-right.
    *   Expands into a chat window (messenger style).
    *   Displays user messages (right) and AI responses (left).
    *   Shows a "Loading..." spinner while fetching.
*   **Mounting:**
    *   Create `src/theme/Root.tsx` (Docusaurus wrapper) to render `<ChatWidget />` globally on every page.

#### 3. Database Schema (Neon/Postgres)
*   Table `chat_history`:
    *   `id` (UUID)
    *   `user_message` (Text)
    *   `bot_response` (Text)
    *   `timestamp` (Timestamp)
    *   `metadata` (JSONB) - potentially for "selected text" context.

### ✅ Acceptance Criteria
1.  User can click the floating chat button on any page.
2.  User can ask "What hardware do I need for Module 3?".
3.  The system ingests the book content and provides an accurate answer citation.
4.  The backend runs on `uvicorn backend.main:app --reload`.
