from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.auth import get_current_user
from app import models, schemas

router = APIRouter(tags=["Expense"])


@router.post("/expense")
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_expense = models.Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        owner_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


@router.get("/expenses")
def get_expenses(
    category: Optional[str] = None,
    min_amount: Optional[float] = None,
    max_amount: Optional[float] = None,
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    query = db.query(models.Expense).filter(
        models.Expense.owner_id == current_user.id
    )

    if category:
        query = query.filter(
            models.Expense.category == category
        )

    if min_amount:
        query = query.filter(
            models.Expense.amount >= min_amount
        )

    if max_amount:
        query = query.filter(
            models.Expense.amount <= max_amount
        )

    skip = (page - 1) * limit

    expenses = query.offset(skip).limit(limit).all()

    return expenses


@router.get("/expense/{id}")
def get_single_expense(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    expense = db.query(models.Expense).filter(
        models.Expense.id == id,
        models.Expense.owner_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return expense


@router.put("/expense/{id}")
def update_expense(
    id: int,
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    db_expense = db.query(models.Expense).filter(
        models.Expense.id == id,
        models.Expense.owner_id == current_user.id
    ).first()

    if not db_expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db_expense.title = expense.title
    db_expense.amount = expense.amount
    db_expense.category = expense.category

    db.commit()
    db.refresh(db_expense)

    return db_expense


@router.delete("/expense/{id}")
def delete_expense(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    expense = db.query(models.Expense).filter(
        models.Expense.id == id,
        models.Expense.owner_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }