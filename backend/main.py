from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.chatbot import ask_question

class Question(BaseModel):
    question: str

app = FastAPI(title="Symtera Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Symtera Chatbot API is running."}

@app.post("/ask")
async def ask_endpoint(q: Question):
    answer = ask_question(q.question)
    return {"answer": answer}