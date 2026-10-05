import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException

from services.ocr_service import extract_text
from services.rag_service import save_document_context


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


UPLOAD_FOLDER = "data/uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".txt",
    ".doc",
    ".docx"
}


@router.post("/")
async def upload_document(
    file: UploadFile = File(...)
):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected"
        )


    extension = os.path.splitext(
        file.filename
    )[1].lower()


    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="File type is not supported"
        )


    unique_filename = (
        f"{uuid.uuid4()}{extension}"
    )


    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )


    try:

        file_content = await file.read()

        with open(
            file_path,
            "wb"
        ) as buffer:

            buffer.write(file_content)


        # Extract text
        extracted_text = extract_text(
            file_path
        )


        # Save text for RAG
        save_document_context(
            extracted_text
        )


        return {
            "status": "success",
            "message": "Document uploaded successfully",
            "filename": file.filename,
            "saved_filename": unique_filename,
            "text_length": len(extracted_text)
        }


    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(error)}"
        )