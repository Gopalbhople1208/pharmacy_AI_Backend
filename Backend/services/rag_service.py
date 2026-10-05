# Stores the currently uploaded document text.
# Later this can be replaced with FAISS + embeddings.

_document_context = ""


def save_document_context(text: str):

    global _document_context

    _document_context = text or ""


def get_document_context() -> str:

    return _document_context


def clear_document_context():

    global _document_context

    _document_context = ""


def create_context(
    text: str,
    max_length: int = 15000
) -> str:

    if not text:

        return ""

    return text[:max_length]