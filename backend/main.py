from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import socket

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WebsiteRequest(BaseModel):
    url: str

@app.get("/")
def home() -> dict:
    return {
        "message": "IP Lookup API is running"
    }

@app.post("/lookup")
def lookup_ip(website: WebsiteRequest) -> dict:

    try:
        ip = socket.gethostbyname(website.url)

        return {
            "url": website.url,
            "ip": ip
        }

    except socket.gaierror:
        raise HTTPException(
            status_code=400,
            detail="Die URL ist ungültig oder konnte nicht aufgelöst werden.",
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Serverfehler.",
        )