from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.auth import get_current_user
from app import models

router = APIRouter(tags=["Analytics"])


@router.get("/analytics")
def analytics(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    data = db.query(
        models.Expense.category,
        func.sum(models.Expense.amount).label("total")
    ).filter(
        models.Expense.user_id == current_user.id
    ).group_by(
        models.Expense.category
    ).all()

    result = []

    for category, total in data:
        result.append({
            "category": category,
            "total": total
        })

    return result