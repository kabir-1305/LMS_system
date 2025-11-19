from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = 'student'

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class AttendanceCreate(BaseModel):
    student_id: int
    date: Optional[datetime.datetime] = None
    status: str = 'present'
    meta: Optional[str] = None

class AttendanceOut(BaseModel):
    id: int
    teacher_id: int
    student_id: int
    date: datetime.datetime
    status: str
    published: bool

    class Config:
        orm_mode = True

class GradeCreate(BaseModel):
    student_id: int
    title: str
    score: int
    max_score: Optional[int] = 100

class GradeOut(BaseModel):
    id: int
    teacher_id: int
    student_id: int
    title: str
    score: int
    max_score: int
    published: bool
    created_at: datetime.datetime

    class Config:
        orm_mode = True
