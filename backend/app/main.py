from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, teacher, student
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title='College Portal API')

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(teacher.router)
app.include_router(student.router)

# Seed sample data on startup
@app.on_event('startup')
def startup_event():
    from .database import SessionLocal
    from . import crud, schemas
    db = SessionLocal()
    try:
        # create a teacher and a student if not exists
        t = crud.get_user_by_email(db, 'teacher@college.edu')
        if not t:
            teacher = schemas.UserCreate(name='Prof Rajesh', email='teacher@college.edu', password='password', role='teacher')
            crud.create_user(db, teacher)
        s = crud.get_user_by_email(db, 'student@college.edu')
        if not s:
            student = schemas.UserCreate(name='Rahul Sharma', email='student@college.edu', password='password', role='student')
            crud.create_user(db, student)
    finally:
        db.close()

@app.get('/')
def root():
    return {'message': 'College Portal API'}
