from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routers import (
    user,
    expense,
    budget,
    dashboard,
    analytics,
    summary,
    export
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
models.Base.metadata.create_all(bind=engine)

# Routers
app.include_router(user.router)
app.include_router(expense.router)
app.include_router(budget.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(summary.router)
app.include_router(export.router)


@app.get("/")
def home():
    return {
        "message": "Expense Tracker API Running Successfully"
    }