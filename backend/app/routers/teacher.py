from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, auth, database

router = APIRouter(prefix="/api/teacher", tags=["teacher"])

@router.post('/attendance')
def post_attendance(attendance: schemas.AttendanceCreate, current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    # only teachers allowed
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail='Only teachers can post attendance')
    created = crud.create_attendance(db, current_user.id, attendance)
    return created

@router.post('/attendance/{attendance_id}/publish')
def publish(attendance_id: int, current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail='Only teachers can publish attendance')
    att = crud.publish_attendance(db, attendance_id)
    if not att:
        raise HTTPException(status_code=404, detail='Attendance not found')
    return att

@router.post('/grades')
def post_grade(grade: schemas.GradeCreate, current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail='Only teachers can post grades')
    created = crud.create_grade(db, current_user.id, grade)
    return created

@router.post('/grades/{grade_id}/publish')
def publish_grade(grade_id: int, current_user = Depends(auth.get_current_user), db: Session = Depends(database.SessionLocal)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail='Only teachers can publish grades')
    g = crud.publish_grade(db, grade_id)
    if not g:
        raise HTTPException(status_code=404, detail='Grade not found')
    return g
