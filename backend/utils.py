import os
from langchain_text_splitters import RecursiveCharacterTextSplitter

# ✅ Load all txt files
def load_documents():
    docs = []
    data_path = os.path.join(os.getcwd(), "data")

    for file in os.listdir(data_path):
        if file.endswith(".txt"):
            with open(os.path.join(data_path, file), "r", encoding="utf-8") as f:
                docs.append(f.read())

    return docs


# ✅ Text splitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)