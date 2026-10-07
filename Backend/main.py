from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.inventory import router as inventory_router

from database import Base, engine

from models.pharmacy import (
    Vendor,
    Medicine,
    Customer,
    Purchase,
    PurchaseItem,
    Sale,
    SaleItem,
    Inventory,
    Prescription,
    AIQuery
)


app = FastAPI(
    title="AI Document Chatbot API",
    description="Backend for AI-powered document chatbot",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Home
# --------------------------------------------------

@app.get("/")
async def home():
    return {
        "status": "success",
        "message": "AI Document Chatbot Backend is running"
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
async def health():
    return {
        "status": "success",
        "message": "Backend is working properly"
    }


# --------------------------------------------------
# Register API Routes
# --------------------------------------------------

app.include_router(chat_router)
app.include_router(upload_router)
app.include_router(inventory_router)