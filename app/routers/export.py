import csv

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app import models

router = APIRouter(tags=["Export"])


@router.get("/export")
def export_expenses(
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):

    expenses = db.query(models.Expense).filter(
        models.Expense.owner_id == current_user.id
    ).all()

    filename = "expenses.csv"

    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)

        writer.writerow([
            "ID",
            "Title",
            "Category",
            "Amount"
        ])

        for expense in expenses:
            writer.writerow([
                expense.id,
                expense.title,
                expense.category,
                expense.amount
            ])

    return FileResponse(
        path=filename,
        media_type="text/csv",
        filename="expenses.csv"
    )