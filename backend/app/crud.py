from sqlalchemy.orm import Session
from . import models, schemas, auth
from typing import Optional

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed = auth.get_password_hash(user.password)
    db_user = models.User(name=user.name, email=user.email, hashed_password=hashed, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str) -> Optional[models.User]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not auth.verify_password(password, user.hashed_password):
        return None
    return user

# Attendance CRUD

def create_attendance(db: Session, teacher_id: int, attendance: schemas.AttendanceCreate):
    date = attendance.date
    if date is None:
        from datetime import datetime
        date = datetime.utcnow()
    db_att = models.Attendance(teacher_id=teacher_id, student_id=attendance.student_id, date=date, status=attendance.status, meta=attendance.meta)
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att

def publish_attendance(db: Session, attendance_id: int):
    att = db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()
    if att:
        att.published = True
        db.commit()
        db.refresh(att)
    return att

def get_student_attendance(db: Session, student_id: int):
    return db.query(models.Attendance).filter(models.Attendance.student_id == student_id, models.Attendance.published == True).all()

# Grades CRUD

def create_grade(db: Session, teacher_id: int, grade: schemas.GradeCreate):
    db_grade = models.Grade(teacher_id=teacher_id, student_id=grade.student_id, title=grade.title, score=grade.score, max_score=grade.max_score)
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade

def publish_grade(db: Session, grade_id: int):
    g = db.query(models.Grade).filter(models.Grade.id == grade_id).first()
    if g:
        g.published = True
        db.commit()
        db.refresh(g)
    return g

def get_student_grades(db: Session, student_id: int):
    return db.query(models.Grade).filter(models.Grade.student_id == student_id, models.Grade.published == True).all()
