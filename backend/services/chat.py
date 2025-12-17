from langchain_cohere import ChatCohere
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from backend.core.config import get_settings

settings = get_settings()

from backend.services.navigation import build_toc

# Cache the TOC on startup
FULL_BOOK_INDEX = build_toc()

# Initialize Global Components (Lazy loading recommended, but global for simplicity here)
def get_rag_chain():
    # 1. Connect to Qdrant
    if settings.QDRANT_API_KEY:
        client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
    else:
        client = QdrantClient(url=settings.QDRANT_URL)

    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",
        cohere_api_key=settings.COHERE_API_KEY
    )

    vector_store = QdrantVectorStore(
        client=client,
        collection_name=settings.QDRANT_COLLECTION_NAME,
        embedding=embeddings,
    )

    # 2. Retriever
    retriever = vector_store.as_retriever(search_kwargs={"k": 5})

    # Helper: Generate Docusaurus URL from filename (Redundant with navigation.py but kept for inline use if needed)
    def get_docusaurus_url(filepath: str) -> str:
        filepath = filepath.replace("\\", "/")
        if "docs/" in filepath:
            rel_path = filepath.split("docs/")[-1]
        else:
            rel_path = filepath
        rel_path = rel_path.replace(".md", "")
        segments = rel_path.split("/")
        clean_segments = []
        for seg in segments:
            import re
            clean_seg = re.sub(r'^\d+-', '', seg)
            clean_segments.append(clean_seg)
        return "/ai-for-humanity/" + "/".join(clean_segments)

    # 3. Prompt
    template = """ROLE: AI Librarian for "AI for Humanity".

RULES:
1. Greetings: Respond warmly to "Hi", "Salam", etc.
2. Navigation: If user asks for "Chapter X" or a topic, SEARCH your Index and provide a markdown link: [Read Chapter X](/docs/path...).
3. Scope: Answer from the book. If the answer isn't there, say "I couldn't find that in the book, but I can help you navigate to relevant sections."

# MASTER BOOK INDEX (Use this to provide Direct Links):
{book_index}

# Instructions:
1. **Direct Navigation:** If the user asks for a specific Chapter, Part, or Lesson Title (e.g. "Go to Chapter 1", "Open Model Lifecycle"), SEARCH the Master Book Index above.
   - If you find a match, provide the Direct Link immediately: `[Read Chapter X](<URL>)`.
2. **Content Questions:** For questions about *concepts*, use the Context below.
3. **Unknowns:** If not in Index and not in Context, say "I couldn't find that in the book, but I can help you navigate to relevant sections."

Context:
{context}

Question: {question}

Answer:"""
    
    prompt = ChatPromptTemplate.from_template(template).partial(book_index=FULL_BOOK_INDEX)

    # 4. LLM
    llm = ChatCohere(
        model="command-r-08-2024", 
        cohere_api_key=settings.COHERE_API_KEY,
        temperature=0
    )

    # 5. Chain
    def format_docs(docs):
        formatted_docs = []
        for doc in docs:
            # Get filename
            source_file = doc.metadata.get("source", "unknown")
            # Generate URL
            url = get_docusaurus_url(source_file)
            
            formatted_docs.append(f"Source File: {source_file}\nLink: {url}\nContent: {doc.page_content}")
        return "\n\n".join(formatted_docs)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return rag_chain

async def ask_question(question: str):
    # Greeting Bypass: Check for greetings and return polite static response immediately
    greeting_patterns = ["hi", "hello", "hey", "greetings", "salam", "assalam", "good morning", "good afternoon", "good evening"]
    question_lower = question.lower().strip()

    for pattern in greeting_patterns:
        if pattern in question_lower:
            if "salam" in question_lower or "assalam" in question_lower:
                return "Walaikum assalam! Welcome to the AI for Humanity textbook. How can I assist you with navigating or understanding the content today?"
            else:
                return "Hello! Welcome to the AI for Humanity textbook. How can I assist you with navigating or understanding the content today?"

    chain = get_rag_chain()
    response = chain.invoke(question)
    return response
