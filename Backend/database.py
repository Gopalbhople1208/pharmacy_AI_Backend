# import os

# from dotenv import load_dotenv
# from sqlalchemy import create_engine
# from sqlalchemy.orm import declarative_base, sessionmaker

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL is not configured in .env")

# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True
# )

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()


# def get_db():
#     db = SessionLocal()

#     try:
#         yield db
#     finally:
#         db.close()


# import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import declarative_base, sessionmaker
# from dotenv import load_dotenv

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True
# )

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()


import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not configured in .env")


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


# Database session for FastAPI routes
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()