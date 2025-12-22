from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from pydantic import BaseModel
from services.ingestion import ingest_docs
from services.chat import ask_question
from services.translation import translate_text

class ChatRequest(BaseModel):
    question: str
    selectedText: str = None

class TranslateRequest(BaseModel):
    text: str
    targetLanguage: str = "Urdu"

class PersonalizeRequest(BaseModel):
    user_id: str
    software_background: str = None
    hardware_background: str = None

class PersonalizeResponse(BaseModel):
    recommendations: list
    learning_path: str
    difficulty_level: str
    focus_areas: list

router = APIRouter()

@router.post("/ingest")
async def trigger_ingestion(background_tasks: BackgroundTasks):
    """
    Triggers the ingestion process in the background.
    """
    background_tasks.add_task(ingest_docs)
    return {"message": "Ingestion started in background"}

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    RAG Chat endpoint.
    """
    try:
        answer = await ask_question(request.question, request.selectedText)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/translate")
async def translate_endpoint(request: TranslateRequest):
    """
    Real-time AI Translation endpoint.
    """
    try:
        translation = await translate_text(request.text, request.targetLanguage)
        return {"translation": translation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/personalize")
async def personalize_endpoint(request: PersonalizeRequest):
    """
    Personalization endpoint that generates content recommendations based on user background.
    """
    try:
        # Determine learning path based on background
        learning_path = 'comprehensive'
        difficulty_level = 'intermediate'
        focus_areas = []

        # Analyze software background
        if request.software_background == 'beginner':
            difficulty_level = 'beginner'
            focus_areas.extend(['foundations', 'basics'])
        elif request.software_background == 'intermediate':
            difficulty_level = 'intermediate'
            focus_areas.extend(['practical', 'implementation'])
        elif request.software_background == 'expert':
            difficulty_level = 'advanced'
            focus_areas.extend(['advanced', 'optimization'])
        else:
            focus_areas.extend(['foundations', 'ethics'])

        # Analyze hardware background
        if request.hardware_background == 'beginner':
            focus_areas.append('theoretical')
        elif request.hardware_background == 'intermediate':
            focus_areas.append('integration')
        elif request.hardware_background == 'expert':
            focus_areas.append('embedded', 'robotics')

        # Determine learning path
        if request.software_background == 'beginner' and request.hardware_background == 'beginner':
            learning_path = 'beginner-friendly'
        elif request.software_background == 'expert' or request.hardware_background == 'expert':
            learning_path = 'accelerated'
        else:
            learning_path = 'balanced'

        # Generate recommendations based on background
        recommendations = generate_recommendations(
            request.software_background,
            request.hardware_background,
            focus_areas
        )

        return {
            "recommendations": recommendations,
            "learning_path": learning_path,
            "difficulty_level": difficulty_level,
            "focus_areas": list(set(focus_areas))  # Remove duplicates
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def generate_recommendations(software_bg: str, hardware_bg: str, focus_areas: list):
    """
    Generate content recommendations based on user background.
    """
    recommendations = []

    # Base recommendation for everyone
    recommendations.append({
        "id": "preface",
        "title": "Preface: Guiding the Dawn of AI for Humanity",
        "url": "/docs/00-preface",
        "priority": 1,
        "reason": "Essential introduction to AI for Humanity concepts"
    })

    # Add recommendations based on software background
    if software_bg == 'beginner':
        recommendations.extend([
            {
                "id": "systems-thinking",
                "title": "Systems Thinking for AI Deployments",
                "url": "/docs/part-1-foundations/chapter-2-concepts-and-mental-models/01-lesson-2-1-systems-thinking-for-ai-deployments",
                "priority": 2,
                "reason": "Fundamental concepts for beginners"
            },
            {
                "id": "fairness-discrimination",
                "title": "Operationalizing Fairness and Non-Discrimination",
                "url": "/docs/part-2-humane-ai-design/chapter-4-ethics-into-engineering/01-lesson-4-1-operationalizing-fairness-and-non-discrimination",
                "priority": 3,
                "reason": "Important ethical foundations"
            }
        ])
    elif software_bg == 'intermediate':
        recommendations.extend([
            {
                "id": "architecture-foundations",
                "title": "Reference Architecture: Modular, Testable, Auditable Systems",
                "url": "/docs/part-3-enterprise-reliability-engineering/chapter-7-architectural-foundations-for-enterprise-ai/01-lesson-7-1-reference-architecture-modular-testable-auditable-systems",
                "priority": 2,
                "reason": "Practical architecture patterns"
            },
            {
                "id": "human-centered-design",
                "title": "Designing for Mental Models of Diverse Users",
                "url": "/docs/part-2-humane-ai-design/chapter-5-human-centered-interaction-design/01-lesson-5-1-designing-for-mental-models-of-diverse-users",
                "priority": 3,
                "reason": "Human-centered design principles"
            }
        ])
    elif software_bg == 'expert':
        recommendations.extend([
            {
                "id": "mlops-best-practices",
                "title": "CI/CD for Models vs Code: Canaries, Shadowing, Gating",
                "url": "/docs/part-3-enterprise-reliability-engineering/chapter-10-sre-mlops-best-practices/01-lesson-10-1-ci-cd-for-models-vs-code-canaries-shadowing-gating",
                "priority": 2,
                "reason": "Advanced MLOps practices"
            },
            {
                "id": "regulations-overview",
                "title": "International Regulations Overview and Mapping",
                "url": "/docs/part-6-governance/chapter-22-legal-regulatory/01-lesson-22-1-international-regulations-overview-and-mapping",
                "priority": 3,
                "reason": "Advanced governance considerations"
            }
        ])

    # Add recommendations based on hardware background
    if hardware_bg == 'beginner':
        recommendations.append({
            "id": "transformational-promise",
            "title": "The Transformational Promise Across Sectors",
            "url": "/docs/part-1-foundations/chapter-1-the-case-for-institutional-intelligence/01-lesson-1-1-the-transformational-promise-across-sectors",
            "priority": 4,
            "reason": "High-level overview of AI impact"
        })
    elif hardware_bg == 'intermediate':
        recommendations.extend([
            {
                "id": "iiot-embedded",
                "title": "IIoT and Embedded AI Systems",
                "url": "/docs/part-4-sector-playbooks/chapter-13-manufacturing/01-lesson-13-1-iiot-and-embedded-ai-systems",
                "priority": 4,
                "reason": "Hardware-focused AI applications"
            },
            {
                "id": "autonomous-systems",
                "title": "Autonomous Systems and Safety-Critical AI",
                "url": "/docs/part-4-sector-playbooks/chapter-14-automotive/01-lesson-14-1-autonomous-systems-and-safety-critical-ai",
                "priority": 5,
                "reason": "Safety considerations for hardware AI"
            }
        ])
    elif hardware_bg == 'expert':
        recommendations.extend([
            {
                "id": "iiot-embedded",
                "title": "IIoT and Embedded AI Systems",
                "url": "/docs/part-4-sector-playbooks/chapter-13-manufacturing/01-lesson-13-1-iiot-and-embedded-ai-systems",
                "priority": 4,
                "reason": "Advanced embedded systems concepts"
            },
            {
                "id": "hospital-case-study",
                "title": "Case Study: Hospital Clinical Decision Support at Scale",
                "url": "/docs/part-8-case-studies/chapter-27-hospital/01-lesson-27-1-case-study-hospital-clinical-decision-support-at-scale",
                "priority": 5,
                "reason": "Real-world implementation example"
            }
        ])

    return recommendations[:5]  # Return top 5 recommendations
