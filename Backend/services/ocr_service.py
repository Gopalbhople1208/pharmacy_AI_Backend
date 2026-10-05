import os

from pypdf import PdfReader


def extract_text(file_path: str) -> str:

    if not os.path.exists(file_path):

        return "File not found."


    extension = os.path.splitext(
        file_path
    )[1].lower()


    # -----------------------------------------
    # TXT
    # -----------------------------------------

    if extension == ".txt":

        try:

            with open(
                file_path,
                "r",
                encoding="utf-8"
            ) as file:

                return file.read()

        except Exception as error:

            return (
                f"Text extraction error: {str(error)}"
            )


    # -----------------------------------------
    # PDF
    # -----------------------------------------

    if extension == ".pdf":

        try:

            reader = PdfReader(
                file_path
            )

            pages_text = []


            for page in reader.pages:

                text = page.extract_text()

                if text:

                    pages_text.append(text)


            extracted_text = "\n".join(
                pages_text
            )


            if extracted_text.strip():

                return extracted_text


            return (
                "No digital text found in PDF. "
                "OCR is required for this scanned PDF."
            )


        except Exception as error:

            return (
                f"PDF extraction error: {str(error)}"
            )


    # -----------------------------------------
    # Images
    # -----------------------------------------

    if extension in {
        ".png",
        ".jpg",
        ".jpeg"
    }:

        return (
            "Image uploaded successfully. "
            "OCR processing for images will be "
            "connected next."
        )


    # -----------------------------------------
    # DOC/DOCX
    # -----------------------------------------

    if extension in {
        ".doc",
        ".docx"
    }:

        return (
            "Document uploaded successfully. "
            "DOC/DOCX text extraction will be "
            "connected next."
        )


    return (
        "File uploaded, but text extraction "
        "is not available for this file type."
    )