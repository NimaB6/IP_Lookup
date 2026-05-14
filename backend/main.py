from fastapi import FastAPI
from pydantic import BaseModel
import socket

app = FastAPI()

class Website(BaseModel):
    url: str

@app.get("/")
def home():
    return {
        "message": "IP Lookup API is running"
    }

@app.post("/lookup")
def lookup_ip(website: Website):

    try:
        ip = socket.gethostbyname(website.url)

        return {
            "url": website.url,
            "ip": ip
        }

    except:
        return {
            "error": "Invalid website URL"
        }











# TODO: Neue Route hinzufügen → GET /servers
#  @Nima Schau dir an, wie die /lookup Route oben aufgebaut ist und mach das gleiche Prinzip.