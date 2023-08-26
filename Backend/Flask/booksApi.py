from googleapiclient.discovery import build
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from EmoVideoDict import feelings_to_keywords
# from EmoBooksDict import feelings_to_keywords

app = Flask(__name__)
CORS(app, resources={r"/getBooks": {"origins": { "http://localhost:3500/content/books" } }})

my_api_key = ""

books = build('books', 'v1', developerKey = my_api_key)

@app.route('/getBooks', methods = ['POST'])
def search_books():
    data_received = request.json
    keywords = []
    preferences = []

    if 'preferences' in data_received:
        preferences = data_received['preferences']
    if 'current_emotion' in data_received:
        current_emotion = data_received['current_emotion']
        
    keywords = feelings_to_keywords[current_emotion]

    for preference in preferences:
        if len(keywords_str) > 0:
            keywords_str += "|"
        keywords_str += preference
    for keyword in keywords:
        if len(keywords_str) > 0:
            keywords_str += "|"
        keywords_str += keyword
    
    search_response = books.volumes().list(
        q = keywords_str,
        maxResults = 6,
        filter = "free-ebooks"
    ).execute()

    if 'items' in search_response:
        for item in search_response['items']:
            book_id = item['id']
            book_name = item['volumeInfo']['title']
            print(book_id + " " + book_name)
        return jsonify({ 'books' : search_response['items']}), 200
    else:
        return jsonify({ 'message' : 'An error occurred.' }), 500

if __name__ == '__main__':
    app.run(debug = True, port = 5003)