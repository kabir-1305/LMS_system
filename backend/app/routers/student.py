from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, auth, database

router = APIRouter(prefix="/api/student", tags=["student"])

@router.get('/attendance')
def get_attendance(current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail='Only students can view their attendance')
    return crud.get_student_attendance(db, current_user.id)

@router.get('/grades')
def get_grades(current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail='Only students can view their grades')
    return crud.get_student_grades(db, current_user.id)
