from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    role = Column(String, default='student')
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # relationships
    students = relationship('Attendance', back_populates='student', foreign_keys='Attendance.student_id')
    grades = relationship('Grade', back_populates='student', foreign_keys='Grade.student_id')

class Attendance(Base):
    __tablename__ = 'attendances'
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey('users.id'))
    student_id = Column(Integer, ForeignKey('users.id'))
    date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default='absent')
    published = Column(Boolean, default=False)
    meta = Column(Text, nullable=True)

    teacher = relationship('User', foreign_keys=[teacher_id])
    student = relationship('User', back_populates='students', foreign_keys=[student_id])

class Grade(Base):
    __tablename__ = 'grades'
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey('users.id'))
    student_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    max_score = Column(Integer, nullable=False, default=100)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    teacher = relationship('User', foreign_keys=[teacher_id])
    student = relationship('User', back_populates='grades', foreign_keys=[student_id])
