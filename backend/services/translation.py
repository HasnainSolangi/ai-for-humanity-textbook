from langchain_cohere import ChatCohere
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from core.config import get_settings

settings = get_settings()

async def translate_text(text: str, target_language: str = "Urdu"):
    """
    Translates text to the target language using AI.
    """
    llm = ChatCohere(
        model="command-r-08-2024", 
        cohere_api_key=settings.COHERE_API_KEY,
        temperature=0
    )

    template = """You are a professional translator specialized in technical and philosophical text.
Translate the following text into natural, fluent {target_language}.
Maintain the technical accuracy and the professional yet engaging tone of the original "AI for Humanity" textbook.
Return ONLY the translated text.

TEXT TO TRANSLATE:
{text}

TRANSLATION:
"""
    
    prompt = ChatPromptTemplate.from_template(template)
    
    chain = prompt | llm | StrOutputParser()
    
    try:
        response = await chain.ainvoke({
            "text": text,
            "target_language": target_language
        })
        return response
    except Exception as e:
        print(f"Error in translation: {str(e)}")
        raise e
