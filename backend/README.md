# Backend for College Portal

This is a minimal FastAPI backend for the College Portal frontend.

Quick start (Windows PowerShell):

# Create a virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

API endpoints (examples):
- POST /api/auth/signup
- POST /api/auth/login (OAuth2 password grant)
- GET /api/auth/me
- POST /api/teacher/attendance
- POST /api/teacher/attendance/{id}/publish
- POST /api/teacher/grades
- POST /api/teacher/grades/{id}/publish
- GET /api/student/attendance
- GET /api/student/grades

Notes:
- This is a development scaffold. For production use, secure secrets and use a real database.
