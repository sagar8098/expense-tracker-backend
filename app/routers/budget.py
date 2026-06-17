from fastapi import APIRouter, Depends, HTTPException
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

    if existing_budget:
        raise HTTPException(
            status_code=400,
            detail="Budget already exists"
        )

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
        raise HTTPException(
            status_code=404,
            detail="Budget not found"
        )

    return budget