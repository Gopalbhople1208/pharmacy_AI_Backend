

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db

from services.gemini_service import ask_gemini
from services.openai_service import ask_openai
from services.rag_service import get_document_context
from services.pharmacy_ai_service import process_pharmacy_query


router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str
    provider: str = "gemini"


@router.get("/")
async def chat_home():
    return {
        "status": "success",
        "message": "Chat API is working"
    }


@router.post("/")
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    provider = request.provider.lower()

    # ==================================================
    # STEP 7 — PHARMACY DATABASE AI AGENT
    # ==================================================

       # ======================================================
    # PHARMACY DATABASE
    # ======================================================

    pharmacy_result = process_pharmacy_query(
        db,
        message
    )

    if pharmacy_result:

        pharmacy_data = pharmacy_result["data"]

        pharmacy_context = f"""
You are a pharmacy database assistant.

The following information was retrieved directly
from the pharmacy database.

DATABASE CATEGORY:
{pharmacy_result["category"]}

DATABASE DATA:
{pharmacy_data}

USER QUESTION:
{message}

IMPORTANT RULES:

1. Answer ONLY using the database data.
2. Do not use general internet knowledge.
3. Do not invent any medicine, vendor, customer,
   purchase, sales, stock, expiry or prescription data.
4. If the requested information is not present
   in the database data, clearly say:
   "The requested information is not available
   in the pharmacy database."
5. Give a short and simple answer.
"""

        if provider == "gemini":

            ai_response = ask_gemini(
                pharmacy_context
            )

        elif provider == "openai":

            ai_response = ask_openai(
                pharmacy_context
            )

        else:

            raise HTTPException(
                status_code=400,
                detail="Unsupported AI provider"
            )

        return {
            "status": "success",
            "provider": provider,
            "source": "pharmacy_database",
            "category": pharmacy_result["category"],
            "user_message": message,
            "database_data": pharmacy_data,
            "ai_response": ai_response
        }

    # ==================================================
    # DOCUMENT RAG
    # ==================================================

    document_context = get_document_context()

    if document_context:

        prompt = f"""
You are an AI document assistant.

Answer the user's question using
the uploaded document information.

DOCUMENT CONTEXT:
{document_context}

USER QUESTION:
{message}

Instructions:

- Give a clear and simple answer.
- Use the document context.
- Do not invent information.
- If the answer is not available in the document,
  say that it is not available in the uploaded document.
"""

    else:

        prompt = message

    # ==================================================
    # AI PROVIDER
    # ==================================================

    if provider == "gemini":

        ai_response = ask_gemini(prompt)

    elif provider == "openai":

        ai_response = ask_openai(prompt)

    else:

        raise HTTPException(
            status_code=400,
            detail="Unsupported AI provider"
        )

    return {
        "status": "success",
        "provider": provider,
        "source": "ai",
        "user_message": message,
        "ai_response": ai_response
    }