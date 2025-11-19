from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, auth, database
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post('/signup', response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(database.SessionLocal)):
    existing = crud.get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    created = crud.create_user(db, user)
    return created

@router.post('/login', response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token = auth.create_access_token({'id': user.id, 'email': user.email, 'role': user.role})
    return {'access_token': access_token, 'token_type': 'bearer'}

@router.get('/me', response_model=schemas.UserOut)
def me(current_user = Depends(auth.get_current_user)):
    return current_user
