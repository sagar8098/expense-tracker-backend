import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get database URL from Render Environment Variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine with SSL support for Render PostgreSQL
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"}
)

# Create session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()