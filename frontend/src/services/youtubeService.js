// src/services/youtubeService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const searchYouTube = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { params: { q: query } });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching data from YouTube', error);
    return []; // Return an empty array in case of error
  }
};

export const getAudioUrl = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/audioUrl`, { params: { videoId: videoId } });
    return response.data.audioUrl || null;
  } catch (error) {
    console.error('Error fetching audio URL', error);
    return null; // Return null in case of error
  }
};