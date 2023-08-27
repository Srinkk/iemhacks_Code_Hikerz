const asynchandler = require('express-async-handler')

const VIDEO_BASE_URL = "http://127.0.0.1:5002"
const BOOKS_BASE_URL = "http://127.0.0.1:5003"
const MUSIC_BASE_URL = "http://127.0.0.1:5004"

const videoApiURL = `${VIDEO_BASE_URL}/getVideos`
const booksApiURL = `${BOOKS_BASE_URL}/getBooks`
const musicApiURL = `${MUSIC_BASE_URL}/getMusics`

const getVideo = asynchandler((req, res) => {
    const { preferences, currentEmotion } = req.body

    try {
        fetch(videoApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences, current_emotion: currentEmotion })
        })
        .then(response => response.json())
        .then(data => {
            videoIds = data.videoIds
            return res.status(200).json({ videoIds: videoIds })
        })
        .catch(error => {
            return res.status(500).json({ message: `An error occured: ${error}` })
        })
    } catch (error) {
        return res.status(500).json({ message: `An error occured: ${error}` })
    }
    
}) 

const getMusic = asynchandler((req, res) => {
    const { preferences, currentEmotion } = req.body

    try {
        fetch(musicApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences, current_emotion: currentEmotion })
        })
        .then(response => response.json())
        .then(data => {
            musicIds = data.musicIds
            return res.status(200).json({ musicIds: musicIds })
        })
        .catch(error => {
            return res.status(500).json({ message: `An error occured: ${error}` })
        })
    } catch (error) {
        return res.status(500).json({ message: `An error occured: ${error}` })
    }
})

const getBooks = asynchandler((req, res) => {
    const { preferences, currentEmotion } = req.body

    if (!preferences || !currentEmotion) {
        return res.status(400).json({ message: 'Not enough data for fetching books.' })
    }

    try {
        fetch(booksApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences, current_emotion: currentEmotion })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            books = data.books
            return res.status(200).json({ books: books })
        })
        .catch(error => {
            return res.status(500).json({ message: `An error occured: ${error}` })
        })
    } catch (error) {
        return res.status(500).json({ message: `An error occured: ${error}` })
    }
})

module.exports = {
    getVideo,
    getMusic,
    getBooks
}