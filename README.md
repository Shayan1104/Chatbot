# Symtera AI Chatbot 🤖

An intelligent, context-aware Retrieval-Augmented Generation (RAG) chatbot designed for **Symtera Technologies**. The assistant leverages local domain knowledge documents to answer customer and user queries with high accuracy, zero hallucinations, and rapid inference.

---

## 🚀 Features

- **Retrieval-Augmented Generation (RAG)**: Retrieves precise company information from domain text files to ground AI responses.
- **Fast LLM Inference**: Powered by Groq using Meta's `llama-3.3-70b-versatile` model.
- **Vector Search & Embeddings**: Uses FAISS vector store with HuggingFace `sentence-transformers/all-MiniLM-L6-v2` embeddings.
- **Maximal Marginal Relevance (MMR)**: Balances relevance and diversity in document chunk retrieval.
- **Multi-turn Memory**: Maintains recent conversational context for natural follow-up interactions.
- **Automatic Vector DB Sync**: Detects file updates in the `data/` directory and rebuilds the FAISS index automatically.
- **Interactive Web Interface**: Clean and modern React chat widget styled with Tailwind CSS.
- **RESTful API**: FastAPI backend with CORS support and interactive Swagger documentation.

---

## 📁 Project Structure

```text
symtera_chatbot/
├── backend/
│   ├── build_vector_db.py     # Script to build FAISS vector index
│   ├── chatbot.py             # Chatbot logic, prompt engineering, and Groq integration
│   ├── main.py                # FastAPI entry point & API endpoints
│   ├── rag_pipeline.py        # Core RAG pipeline logic
│   ├── test_groq.py           # Test utility for Groq API
│   ├── utils.py               # Helper functions
│   └── vectorstore.py         # Document loader & FAISS vector store manager
├── data/                      # Knowledge base documents
│   ├── about_company.txt
│   ├── company_products.txt
│   ├── contact_info.txt
│   ├── faq.txt
│   ├── management.txt
│   ├── services.txt
│   └── technologies.txt
├── frontend/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatwidget.jsx # Interactive chat widget UI
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── .env.example               # Template for environment variables
├── .gitignore
├── requirements.txt           # Python dependencies
└── README.md
```

---

## 🛠️ Tech Stack

- **Backend**: Python 3.10+, FastAPI, Uvicorn, LangChain, Groq API, FAISS
- **Embeddings**: HuggingFace (`sentence-transformers/all-MiniLM-L6-v2`)
- **Frontend**: React, Tailwind CSS, Axios / Fetch API
- **Model**: `llama-3.3-70b-versatile` via Groq Cloud

---

## ⚙️ Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher & **npm**
- **Groq API Key**: Obtain a free API key from [Groq Console](https://console.groq.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shayan1104/chatbot.git
cd chatbot
```

### 2. Backend Setup

1. Create and activate a virtual environment:

   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. (Optional) Pre-build the FAISS vector database:

   ```bash
   python -m backend.build_vector_db
   ```
   *Note: If omitted, the vector store will automatically build on the first query.*

5. Start the FastAPI backend server:

   ```bash
   uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
   ```

   The backend will be running at `http://127.0.0.1:8000`. You can access interactive API docs at `http://127.0.0.1:8000/docs`.

---

### 3. Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Launch the React development server:

   ```bash
   npm start
   ```

   The frontend will open in your browser at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check endpoint |
| `POST` | `/ask` | Submit a question and receive a context-grounded AI answer |
| `GET` | `/docs` | Interactive Swagger API documentation |

### Example Request (`POST /ask`):

```json
{
  "question": "What services does Symtera offer?"
}
```

### Example Response:

```json
{
  "answer": "Symtera Technologies provides services including custom software development, cloud computing solutions, AI & data engineering, and IT consulting..."
}
```

---

## 📝 Customizing the Knowledge Base

To update the chatbot's knowledge:
1. Add, remove, or modify `.txt` files inside the `data/` folder.
2. The vector store detects file modifications and automatically updates the FAISS index on the next query.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

