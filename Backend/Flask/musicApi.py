from googleapiclient.discovery import build
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from langdetect import detect
from EmoVideoDict import feelings_to_keywords
# from EmoMusicsDict import feelings_to_keywords

app = Flask(__name__)
CORS(app, resources={r"/getMusics": {"origins": { "http://localhost:3500/content/music" } }})

my_api_key = ""

@app.route('/getMusics', methods = ['POST'])
def search_musics():
    data_received = request.json
    preferences = []
    keywords = []

    if 'preferences' in data_received:
        preferences = data_received['preferences']
    if 'current_emotion' in data_received:
        current_emotion = data_received['current_emotion'].lower()
        keywords = feelings_to_keywords[current_emotion]

    print(keywords)

    # build the q
    keywords_str = ""
    preferences_str = ""
    for keyword in keywords:
        if (len(keywords_str) > 0):
            keywords_str += "|"
        keywords_str += keyword
    for preference in preferences:
        if (len(preferences_str) > 0):
            preferences_str += "|"
        preferences_str += preference

    youtube = build('youtube', 'v3', developerKey = my_api_key)

    musicsToShow = []

    try:
        next_page_token = ""
        filter_str = ""
        while (len(musicsToShow) < 6):

            if (len(musicsToShow) < 4):
                filter_str = keywords_str
            else:
                filter_str = preferences_str
            
            if (len(musicsToShow) == 4):
                next_page_token = ""

            search_response = youtube.search().list(
                part = 'snippet',
                q = filter_str,
                maxResults = 10,
                safeSearch = 'strict',
                type = 'video',
                videoDefinition = 'high',
                videoDuration = 'medium',
                pageToken = next_page_token
            ).execute()

            if 'items' in search_response:
                for item in search_response['items']:
                    music_id = item['id']['videoId']
                    music_title = item['snippet']['title']
                    try:
                        titleLang = detect(music_title)
                        if titleLang == 'en' and len(musicsToShow) < 6:
                            musicsToShow.append(music_id)
                            print("passed: " + music_id)
                        else:
                            pass
                    except Exception as e:
                        pass
                    
            next_page_token = search_response.get('nextPageToken')
                
    except Exception as e:
        print('Error' + str(e))
        return jsonify({ 'error' : str(e) }), 500

    for music in musicsToShow:
        print(music)

    return jsonify({ 'musicIds' : musicsToShow }), 200

if __name__ == '__main__':
    app.run(debug = True, port = 5004)