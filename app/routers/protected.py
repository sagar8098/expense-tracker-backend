from fastapi import APIRouter, Depends
from app.auth import get_current_user

router = APIRouter()


@router.get("/users/me")
def read_users_me(
        current_user: str = Depends(get_current_user)):
    return {
        "username": current_user
    }