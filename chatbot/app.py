import os
import openai
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import DirectoryLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper

app = Flask(__name__)
CORS(app)
openai.api_key = os.getenv('OPENAI_API_KEY')

PERSIST = False

if PERSIST and os.path.exists("persist"):
    vectorstore = Chroma(persist_directory="persist", embedding_function=OpenAIEmbeddings())
    index = VectorStoreIndexWrapper(vectorstore=vectorstore)
else:
    loader = DirectoryLoader("data/")
    if PERSIST:
        index = VectorstoreIndexCreator(embedding=OpenAIEmbeddings(), vectorstore_kwargs={"persist_directory": "persist"}).from_loaders([loader])
    else:
        index = VectorstoreIndexCreator(embedding=OpenAIEmbeddings()).from_loaders([loader])

chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

def transform_chat_history(chat_history):
    # Convert the chat history into a list of tuples
    return [(item['query'], item['response']) for item in chat_history]

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        query = data.get('query')
        chat_history = data.get('chat_history', [])
        
        app.logger.info("Received query: %s", query)
        app.logger.info("Chat history: %s", chat_history)
        
        transformed_chat_history = transform_chat_history(chat_history)
        
        result = chain({"question": query, "chat_history": transformed_chat_history})
        
        app.logger.info("Generated answer: %s", result['answer'])
        
        new_chat_history = chat_history + [{'query': query, 'response': result['answer']}]
        return jsonify({'answer': result['answer'], 'chat_history': new_chat_history})
    except Exception as e:
        app.logger.error("Error: %s", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)