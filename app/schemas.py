from pydantic import BaseModel, EmailStr


# ---------- USER ----------

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------- EXPENSE ----------

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str

    class Config:
        from_attributes = True

        from pydantic import BaseModel

class BudgetCreate(BaseModel):
    monthly_budget: float


class BudgetResponse(BaseModel):
    id: int
    monthly_budget: float
    user_id: int

    class Config:
        from_attributes = True