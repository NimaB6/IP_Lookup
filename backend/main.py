from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse

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
    url = website.url
    if "://" in url:
        url = urlparse(url).hostname
    try:
        ip = socket.gethostbyname(url)

        return {
            "url": url,
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