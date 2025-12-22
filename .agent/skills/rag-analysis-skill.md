# Textbook RAG Analysis & Navigation Skill

This skill enables deep semantic understanding and intelligent navigation of large-scale educational content through Retrieval-Augmented Generation (RAG).

## Capabilities
- **Context-Aware Retrieval**: Uses Qdrant vector storage and Cohere embeddings to retrieve the most relevant sections of the "AI for Humanity" textbook for any user query.
- **Selection-Aware Analysis**: Prioritizes user-selected text on the frontend to provide hyper-focused explanations and deep-dives into specific paragraphs.
- **Structural Navigation**: Leverages a custom Table of Contents (TOC) service to provide direct markdown links to book parts, chapters, and lessons.

## Usage
The skill is integrated into the `ChatWidget` component and the FastAPI backend.
- **Backend**: `backend/services/chat.py`
- **Frontend**: `src/components/ChatWidget.tsx`

## Impact
Transforms a static textbook into an interactive learning companion, allowing students to ask complex questions and receive accurate, source-cited answers in real-time.
