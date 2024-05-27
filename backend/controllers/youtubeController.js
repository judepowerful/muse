const axios = require('axios');
require('dotenv').config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const ytdl = require('ytdl-core'); // Import ytdl

const searchYouTube = async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                maxResults: 10 ,
                part: 'snippet',
                type: 'video',
                q: query,
                key: YOUTUBE_API_KEY
            }
        });

        const videos = response.data.items;
        const results = [];

        for (const video of videos) {
            results.push({
                id: video.id.videoId,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.default.url,
            });
        }

        res.json(results);
    } catch (error) {
        console.error('Error fetching data from YouTube:', error);
        res.status(500).send('Error fetching data from YouTube Jude');
    }
};

const getAudioUrl = async (req, res) => {
    try {
        const videoId = req.query.videoId;
        const audioInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`); // Get video info
        const audioFormats = ytdl.filterFormats(audioInfo.formats, 'audioonly'); // Filter audio formats
        const audioUrl = audioFormats[0].url;
        res.json({ audioUrl });
    } catch (error) {
        console.error('Error fetching audio URL from YouTube:', error);
        return null;
    }
};

module.exports = { searchYouTube, getAudioUrl };
