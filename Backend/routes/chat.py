

# from fastapi import APIRouter, HTTPException, Depends
# from pydantic import BaseModel
# from sqlalchemy.orm import Session

# from database import get_db

# from services.gemini_service import ask_gemini
# from services.openai_service import ask_openai
# from services.rag_service import get_document_context

# from models.pharmacy import Medicine, Inventory

# router = APIRouter(prefix="/chat", tags=["Chat"])


# class ChatRequest(BaseModel):
#     message: str
#     provider: str = "gemini"


# @router.get("/")
# async def chat_home():
#     return {
#         "status": "success",
#         "message": "Chat API is working"
#     }


# # --------------------------------------------------
# # Find medicine from user question
# # --------------------------------------------------

# def find_medicine(db: Session, message: str):

#     words = message.lower().split()

#     medicines = []

#     for word in words:

#         if len(word) < 3:
#             continue

#         result = (
#             db.query(Medicine)
#             .filter(
#                 Medicine.medicine_name.ilike(
#                     f"%{word}%"
#                 )
#             )
#             .limit(10)
#             .all()
#         )

#         medicines.extend(result)

#     # Remove duplicate medicines

#     unique_medicines = {}

#     for medicine in medicines:
#         unique_medicines[medicine.id] = medicine

#     return list(unique_medicines.values())


# # --------------------------------------------------
# # Get medicine stock
# # --------------------------------------------------

# def get_stock_information(db: Session, message: str):

#     medicines = find_medicine(db, message)

#     results = []

#     for medicine in medicines:

#         inventory = (
#             db.query(Inventory)
#             .filter(
#                 Inventory.medicine_id == medicine.id
#             )
#             .first()
#         )

#         if inventory:

#             results.append({
#                 "medicine_id": medicine.id,
#                 "medicine_name": medicine.medicine_name,
#                 "generic_name": medicine.generic_name,
#                 "brand_name": medicine.brand_name,
#                 "current_stock": inventory.current_stock,
#                 "reorder_level": inventory.reorder_level,
#                 "expiry_date": (
#                     str(medicine.expiry_date)
#                     if medicine.expiry_date
#                     else None
#                 ),
#                 "selling_price": medicine.selling_price
#             })

#     return results


# # --------------------------------------------------
# # Chat
# # --------------------------------------------------

# @router.post("/")
# async def chat(
#     request: ChatRequest,
#     db: Session = Depends(get_db)
# ):

#     message = request.message.strip()

#     if not message:
#         raise HTTPException(
#             status_code=400,
#             detail="Message cannot be empty"
#         )

#     provider = request.provider.lower()

#     # --------------------------------------------------
#     # Pharmacy database query
#     # --------------------------------------------------

#     pharmacy_keywords = [
#         "stock",
#         "available",
#         "availability",
#         "medicine",
#         "medicines",
#         "paracetamol",
#         "amoxicillin",
#         "quantity",
#         "reorder"
#     ]

#     is_pharmacy_query = any(
#         keyword in message.lower()
#         for keyword in pharmacy_keywords
#     )

#     if is_pharmacy_query:

#         stock_data = get_stock_information(
#             db,
#             message
#         )

#         if stock_data:

#             # Convert database information into
#             # a simple prompt for the AI

#             pharmacy_context = f"""
# You are a pharmacy AI assistant.

# The following information was retrieved
# directly from the pharmacy database:

# {stock_data}

# User question:
# {message}

# Answer using ONLY the database information above.

# Give a simple and clear answer.

# Do not invent stock quantities,
# medicine information, prices or dates.
# """

#             if provider == "openai":

#                 ai_response = ask_openai(
#                     pharmacy_context
#                 )

#             elif provider == "gemini":

#                 ai_response = ask_gemini(
#                     pharmacy_context
#                 )

#             else:

#                 raise HTTPException(
#                     status_code=400,
#                     detail="Unsupported AI provider"
#                 )

#             return {
#                 "status": "success",
#                 "provider": provider,
#                 "source": "pharmacy_database",
#                 "user_message": message,
#                 "database_data": stock_data,
#                 "ai_response": ai_response
#             }

#     # --------------------------------------------------
#     # Existing Document RAG
#     # --------------------------------------------------

#     document_context = get_document_context()

#     if document_context:

#         prompt = f"""
# You are an AI document assistant.

# Answer the user's question using
# the uploaded document information.

# DOCUMENT CONTEXT:
# {document_context}

# USER QUESTION:
# {message}

# Instructions:
# - Give a clear and simple answer.
# - Use the document context.
# - Do not invent information.
# - If the answer is not available in the document,
#   say that it is not available in the uploaded document.
# """

#     else:

#         prompt = message

#     # --------------------------------------------------
#     # AI Provider
#     # --------------------------------------------------

#     if provider == "openai":

#         ai_response = ask_openai(prompt)

#     elif provider == "gemini":

#         ai_response = ask_gemini(prompt)

#     else:

#         raise HTTPException(
#             status_code=400,
#             detail="Unsupported AI provider"
#         )

#     return {
#         "status": "success",
#         "provider": provider,
#         "source": "ai",
#         "user_message": message,
#         "ai_response": ai_response
#     }

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