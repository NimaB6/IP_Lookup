from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
from typing import Optional

import socket

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MESSAGES = {
    "de": {
        "invalid_url": "Die URL ist ungültig oder konnte nicht aufgelöst werden.",
        "server_error": "Serverfehler.",
    },
    "en": {
        "invalid_url": "The URL is invalid or could not be resolved.",
        "server_error": "Server error.",
    },
}

class WebsiteRequest(BaseModel):
    url: str
    lang: Optional[str] = "de"

@app.get("/")
def home() -> dict:
    return {
        "message": "IP Lookup API is running"
    }

@app.post("/lookup")
def lookup_ip(website: WebsiteRequest) -> dict:
    lang = website.lang if website.lang in MESSAGES else "de"
    msgs = MESSAGES[lang]

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
            detail=msgs["invalid_url"],
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail=msgs["server_error"],
        )