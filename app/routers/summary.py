from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.database import get_db
from app.auth import get_current_user
from app import models

router = APIRouter(tags=["Summary"])


@router.get("/summary")
def get_summary(
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):

    data = db.query(
        extract('month', models.Expense.created_at),
        func.sum(models.Expense.amount)
    ).filter(
        models.Expense.owner_id == current_user.id
    ).group_by(
        extract('month', models.Expense.created_at)
    ).all()

    months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    result = {}

    for month, total in data:
        result[months[int(month)]] = total

    return result