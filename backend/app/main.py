import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import report

app = FastAPI(title="hEDS Clinical Tool API")

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report.router)

@app.get("/")
def root():
    return {"status": "ok", "message": "hEDS API is running"}