# main.py
# Point d'entrée de l'application FastAPI

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import report

app = FastAPI(title="hEDS Clinical Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report.router)

@app.get("/")
def root():
    return {"status": "ok", "message": "hEDS API is running"}