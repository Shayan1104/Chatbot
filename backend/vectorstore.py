import os
import time
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

DATA_FOLDER = "data"
INDEX_FOLDER = "backend/vectorstore"

# Initialize embeddings once
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={}
)

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)

def load_documents():
    docs = []
    for file in os.listdir(DATA_FOLDER):
        if file.endswith(".txt"):
            path = os.path.join(DATA_FOLDER, file)
            with open(path, "r", encoding="utf-8") as f:
                docs.append(f.read())
    return docs
def is_data_updated():
    if not os.path.exists(INDEX_FOLDER):
        return True

    index_time = os.path.getmtime(INDEX_FOLDER)

    for file in os.listdir(DATA_FOLDER):
        if file.endswith(".txt"):
            file_path = os.path.join(DATA_FOLDER, file)
            if os.path.getmtime(file_path) > index_time:
                return True

    return False
# Initialize vectorstore only when called
def get_vectorstore():
    if os.path.exists(INDEX_FOLDER) and not is_data_updated():
        print("✅ Loading existing FAISS index...")
        return FAISS.load_local(INDEX_FOLDER, embeddings, allow_dangerous_deserialization=True)

    print("⚡ Rebuilding FAISS index (data updated)...")
    docs = load_documents()
    chunks = splitter.split_text("\n".join(docs))

    vectorstore = FAISS.from_texts(chunks, embeddings)
    vectorstore.save_local(INDEX_FOLDER)

    print("✅ FAISS index updated")
    return vectorstore