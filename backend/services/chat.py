from langchain_cohere import ChatCohere
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from core.config import get_settings
import re

settings = get_settings()

from services.navigation import build_toc

# Cache the TOC on startup
FULL_BOOK_INDEX = build_toc()

# ========== LANGUAGE DETECTION ==========
def detect_question_language(question: str) -> str:
    """
    Detects if question is in English or Urdu.
    Returns: "en" for English, "ur" for Urdu
    """
    # Urdu script ranges (Unicode)
    urdu_pattern = r'[\u0600-\u06FF]'  # Arabic script block (covers Urdu)
    
    # Count Urdu characters
    urdu_chars = len(re.findall(urdu_pattern, question))
    total_chars = len(question.replace(" ", "").replace("\n", ""))
    
    # If more than 30% Urdu characters, it's Urdu
    if total_chars > 0 and (urdu_chars / total_chars) > 0.3:
        return "ur"
    else:
        return "en"

# ========== MULTILINGUAL RAG CHAIN ==========

# Initialize Global Components (Lazy loading recommended, but global for simplicity here)
def get_rag_chain(language: str = "en"):
    """
    Creates a language-aware RAG chain.
    Args:
        language: "en" for English, "ur" for Urdu
    """
    # 1. Connect to Qdrant
    if settings.QDRANT_API_KEY:
        client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
    else:
        client = QdrantClient(url=settings.QDRANT_URL)

    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",  # Supports 100+ languages including Urdu
        cohere_api_key=settings.COHERE_API_KEY
    )

    vector_store = QdrantVectorStore(
        client=client,
        collection_name=settings.QDRANT_COLLECTION_NAME,
        embedding=embeddings,
    )

    # 2. Language-Aware Retriever
    # Simple retriever that will get top results (LangChain handles embedding/search)
    retriever_base = vector_store.as_retriever(search_kwargs={"k": 20})
    
    # Post-processing: filter by language preference
    def filter_by_language(docs):
        """Post-filter documents to prefer the target language"""
        same_lang_docs = [d for d in docs if d.metadata.get("language") == language]
        if same_lang_docs:
            return same_lang_docs
        return docs  # Fallback to all docs if no same-language results

    # Helper: Generate Docusaurus URL from filename
    def get_docusaurus_url(filepath: str) -> str:
        filepath = filepath.replace("\\", "/")
        if "docs/" in filepath:
            rel_path = filepath.split("docs/")[-1]
        elif "i18n/ur/" in filepath:
            # For Urdu files, extract the relative path
            rel_path = filepath.split("i18n/ur/docusaurus-plugin-content-docs/current/")[-1]
        else:
            rel_path = filepath
        rel_path = rel_path.replace(".md", "")
        segments = rel_path.split("/")
        clean_segments = []
        for seg in segments:
            clean_seg = re.sub(r'^\d+-', '', seg)
            clean_segments.append(clean_seg)
        
        # Build locale-aware URL
        locale_prefix = "/ur" if language == "ur" else ""
        return f"{locale_prefix}/docs/" + "/".join(clean_segments)

    # 3. Language-Aware Prompt Template
    if language == "ur":
        template = """آپ "AI Book Assistant" ہیں، "AI for Humanity" کتاب کے لیے ایک ماہر AI RAG ایجنٹ۔

کتاب کا ڈھانچہ اور نیویگیشن ڈیٹا:
نیچے کتاب کا مکمل انڈیکس ہے۔ اس کو سختی سے استعمال کریں تاکہ "کتنے باب" یا "ڈھانچہ" کے سوالات کے جواب دیں۔
{book_index}

رویے کی ہدایات:
1. **شناخت**: آپ "AI Book Assistant" ہیں۔ اپنے آپ کو "Command R" یا "Cohere" کہہ کر نہ بلائیں۔
2. **مواد**: صرف "AI for Humanity" ڈیٹاسیٹ (Context) سے جوابات دیں۔
3. **منتخب متن کی ترجیح**: اگر نیچے "منتخب متن" فیلڈ میں متن دیا گیا ہے تو اس کو ترجیح دیں۔
4. **کوئی ہلوسنیشن نہیں**: اگر معلومات انڈیکس یا Context میں نہیں ہے تو "معلومات دستیاب نہیں" کہیں۔

منتخب متن:
{selected_text}

ویکٹر کیوری سے Context:
{context}

صارف کا سوال:
{question}

آپ کا جواب:
"""
    else:
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

    # 4. LLM (Cohere supports Urdu natively)
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
            "context": itemgetter("question") | retriever_base | format_docs, 
            "question": itemgetter("question"),
            "selected_text": itemgetter("selected_text")
        }
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return rag_chain

async def ask_question(question: str, selected_text: str = None):
    """
    Answer questions using language-aware RAG.
    Automatically detects if question is in English or Urdu and responds accordingly.
    """
    # Detect language
    detected_language = detect_question_language(question)
    print(f"🌐 Detected language: {'Urdu' if detected_language == 'ur' else 'English'}")
    
    # Greeting Bypass: Check for greetings and return polite static response immediately
    greeting_patterns = [r'\bhi\b', r'\bhello\b', r'\bhey\b', r'\bgreetings\b', r'\bسلام\b', r'\bassalam\b']
    question_lower = question.lower().strip()

    is_greeting = False
    for pattern in greeting_patterns:
        if re.search(pattern, question_lower):
            is_greeting = True
            break
            
    if is_greeting and len(question.split()) < 4:
        if detected_language == "ur":
            return "السلام علیکم! میں آپ کی AI Book Assistant ہوں۔ AI for Humanity کتاب کے بارے میں آپ کو کیسے مدد کر سکتا ہوں؟"
        else:
            return "Hello! I am your AI Book Assistant for the AI for Humanity textbook. How can I help you navigate or understand the book today?"

    try:
        # Get language-aware RAG chain
        chain = get_rag_chain(language=detected_language)
        response = chain.invoke({
            "question": question,
            "selected_text": selected_text if selected_text else "[No text selected by user]"
        })
        return response
    except Exception as e:
        print(f"ERROR in RAG chain: {str(e)}")
        import traceback
        traceback.print_exc()
        
        if detected_language == "ur":
            return f"معافی دیں، متن میں تلاش کرتے ہوئے خرابی آئی۔ براہ کرم یقینی بنائیں کہ Qdrant اور Cohere صحیح طریقے سے کنفیگر ہیں۔ خرابی: {str(e)}"
        else:
            return f"I encountered an error while searching the textbook. Please make sure Qdrant and Cohere are properly configured. Error: {str(e)}"
