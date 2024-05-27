const axios = require('axios');
require('dotenv').config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const ytdl = require('ytdl-core'); // Import ytdl
//const ffmpeg = require('fluent-ffmpeg');
//const ffmpegStatic = require('ffmpeg-static');
//const stream = require('stream');

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
        const videoUrl =`https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(videoUrl);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        console.log('Audio Formats:');
        audioFormats.forEach((format, index) => {
            console.log(`Format ${index + 1}:`);
            console.log('  Container:', format.container);
            console.log('  Bitrate:', format.audioBitrate);
            console.log('  Codec:', format.codec);
            console.log('  URL:', format.url);
        });
        const mp4Format = audioFormats.find(format => format.container === 'mp4');
        if (!mp4Format) {
            return res.status(404).send('No suitable audio format found');
        }

        const audioUrl = mp4Format.url;
        res.json({ audioUrl });

        /*
        ffmpeg.setFfmpegPath(ffmpegStatic);
        
        var audio = ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly'});
        ffmpeg(audio)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => console.error(err))
        .on('end', () => console.log('Finished!'))
        .pipe(res, {
          end: true
       });
       */
    } catch (error) {
        console.error('Error fetching audio URL from YouTube:', error);
        return null;
    }
};

module.exports = { searchYouTube, getAudioUrl };