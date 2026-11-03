import os
from dotenv import load_dotenv
from groq import Groq
from backend.vectorstore import get_vectorstore

# Load env
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("❌ GROQ_API_KEY not found in .env")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Lazy load vector store
vector_store = None

# 🧠 Simple in-memory chat history
chat_history = []


def ask_question(question: str) -> str:
    global vector_store, chat_history

    # Normalize input (basic cleanup)
    question = question.strip()

    # Load FAISS once
    if vector_store is None:
        vector_store = get_vectorstore()

    try:
        # 🔍 Better retrieval (MMR instead of basic similarity)
        docs = vector_store.max_marginal_relevance_search(
            question,
            k=4,
            fetch_k=8
        )

        context = "\n".join([doc.page_content for doc in docs])

        # 🧠 Include last few messages for memory
        history_text = "\n".join(
            [f"{msg['role']}: {msg['content']}" for msg in chat_history[-6:]]
        )

        # 🧠 Improved prompt
        prompt = f"""
You are an AI assistant for Symtera Technologies.

Instructions:
- Understand user intent even if there are spelling mistakes
- Use conversation history for follow-up questions
- Answer clearly, professionally, and in structured format (use bullet points if needed)
- ONLY use the provided context (do not hallucinate)

Conversation History:
{history_text}

Context:
{context}

User Question:
{question}
"""

        print("📤 Sending request to GROQ...")

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a smart and professional AI assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.4
        )

        answer = response.choices[0].message.content

        print("✅ Response received")

        # 🧠 Save conversation
        chat_history.append({"role": "user", "content": question})
        chat_history.append({"role": "assistant", "content": answer})

        return answer

    except Exception as e:
        print("❌ ERROR:", str(e))
        return f"Error: {str(e)}"