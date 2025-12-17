from langchain_cohere import ChatCohere
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from core.config import get_settings

settings = get_settings()

from services.navigation import build_toc

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
    retriever = vector_store.as_retriever(search_kwargs={"k": 20})

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
        return "/ai-for-humanity-textbook/" + "/".join(clean_segments)

    # 3. Prompt
    # 3. Prompt
    template = """You are "AI Book Assistant", an expert AI RAG agent for the "AI for Humanity" book.

STRUCTURE & NAVIGATION DATA:
Below is the MASTER INDEX of the book. Use this STRICTLY to answer questions about "how many chapters", "structure", or to PROVIDE LINKS when asked to "open" or "go to" a section.
{book_index}

BEHAVIOR RULES:
1. **Identity**: You are "AI Book Assistant". Never call yourself "Command R" or "Cohere".
2. **Navigation**: If the user says "Open Part X", "Go to Chapter Y", or "Show me Lesson Z", SEARCH the Index above.
   - Return a DIRECT markdown link: `[Open Chapter title](url)`.
   - Distinguish between Parts, Chapters, and Lessons based on the titles in the index.
3. **Content**: Answer questions strictly from the "AI for Humanity" dataset (Context) or the Index.
4. **Selected Text Priority**: If text is provided in the "SELECTED TEXT" field below, prioritize answering based on that specific context.
5. **No Hallucinations**: If it's not in the Index or Context, say "Information not available."

SELECTED TEXT: 
{selected_text}

CONTEXT FROM VECTOR QUERY:
{context}

USER QUESTION: 
{question}

YOUR RESPONSE:
"""
    
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

    from operator import itemgetter
    rag_chain = (
        {
            "context": itemgetter("question") | retriever | format_docs, 
            "question": itemgetter("question"),
            "selected_text": itemgetter("selected_text")
        }
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return rag_chain

async def ask_question(question: str, selected_text: str = None):
    # Greeting Bypass: Check for greetings and return polite static response immediately
    # Only if the message is short (likely just a greeting) to avoid blocking actual questions like "Hi, what is AI?"
    import re
    greeting_patterns = [r'\bhi\b', r'\bhello\b', r'\bhey\b', r'\bgreetings\b', r'\bsalam\b', r'\bassalam\b']
    question_lower = question.lower().strip()

    is_greeting = False
    for pattern in greeting_patterns:
        if re.search(pattern, question_lower):
            is_greeting = True
            break
            
    if is_greeting and len(question.split()) < 4:
         if "salam" in question_lower or "assalam" in question_lower:
             return "Walaikum assalam! I am your AI Book Assistant for the AI for Humanity textbook. How can I help you navigate or understand the book today?"
         else:
             return "Hello! I am your AI Book Assistant for the AI for Humanity textbook. How can I help you navigate or understand the book today?"

    try:
        chain = get_rag_chain()
        response = chain.invoke({
            "question": question,
            "selected_text": selected_text if selected_text else "[No text selected by user]"
        })
        return response
    except Exception as e:
        print(f"ERROR in RAG chain: {str(e)}")
        import traceback
        traceback.print_exc()
        return f"I encountered an error while searching the textbook. Please make sure Qdrant and Cohere are properly configured. Error: {str(e)}"
