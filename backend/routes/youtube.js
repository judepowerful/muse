const express = require('express');
const { searchYouTube, getAudioUrl } = require('../controllers/youtubeController');
const router = express.Router();

router.get('/search', searchYouTube);
router.get('/audioUrl', getAudioUrl);

module.exports = router;
