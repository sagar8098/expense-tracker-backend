from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.auth import get_current_user

router = APIRouter(tags=["Budget"])


@router.post("/budget")
def create_budget(
    budget: schemas.BudgetCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    existing_budget = db.query(models.Budget).filter(
        models.Budget.user_id == current_user.id
    ).first()

    # Update existing budget
    if existing_budget:
        existing_budget.monthly_budget = budget.monthly_budget

        db.commit()
        db.refresh(existing_budget)

        return existing_budget

    # Create new budget
    new_budget = models.Budget(
        monthly_budget=budget.monthly_budget,
        user_id=current_user.id
    )

    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)

    return new_budget


@router.get("/budget")
def get_budget(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    budget = db.query(models.Budget).filter(
        models.Budget.user_id == current_user.id
    ).first()

    if not budget:
        return {
            "monthly_budget": 0
        }

    return budget