from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models
from app.auth import get_current_user

router = APIRouter(tags=["Dashboard"])


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    total_expense = db.query(
        func.sum(models.Expense.amount)
    ).filter(
        models.Expense.user_id == current_user.id
    ).scalar()

    if total_expense is None:
        total_expense = 0

    budget = db.query(models.Budget).filter(
        models.Budget.user_id == current_user.id
    ).first()

    monthly_budget = 0

    if budget:
        monthly_budget = budget.monthly_budget

    remaining_balance = monthly_budget - total_expense

    return {
        "total_expense": total_expense,
        "monthly_budget": monthly_budget,
        "remaining_balance": remaining_balance
    }