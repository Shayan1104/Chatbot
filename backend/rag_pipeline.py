import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter 
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
DATA_PATH = "data"
def load_documents():
    documents = []

    for file in os.listdir(DATA_PATH):
        if file.endswith(".txt"):
            loader = TextLoader(os.path.join(DATA_PATH, file))
            documents.extend(loader.load())

    return documents
def split_documents(documents):

    text_splitter = CharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    docs = text_splitter.split_documents(documents)

    return docs
def create_embeddings():

    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2"
    )

    return embeddings
def build_vector_database():

    documents = load_documents()

    docs = split_documents(documents)

    embeddings = create_embeddings()

    vector_store = FAISS.from_documents(
        docs,
        embeddings
    )

    vector_store.save_local("vector_store")

    print("Vector database created successfully.")