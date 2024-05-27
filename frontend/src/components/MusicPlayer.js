import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faVolumeMute, faStepBackward, faStepForward, faListUl } from "@fortawesome/free-solid-svg-icons";
import defaultAlbumImage from '../assets/images/default-album-image.jpg';
import { getAudioUrl } from '../services/youtubeService';
import CurrentPlaylist from './CurrentPlaylist';
import { decodeHtmlEntities } from '../utils/htmlUtils';
import '../styles/MusicPlayer.css';

const MusicPlayer = ({ playlist, setPlaylist, currentIndex, setCurrentIndex }) => {
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false); // Track if the title is overflowing
  const [isLoadingNextSong, setIsLoadingNextSong] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef(new Audio());
  const titleRef = useRef(null); // Reference to the title element

  const isSingleSong = playlist.length <= 1;
  const noSong = playlist.length === 0;
  const isControlsDisabled = isLoadingNextSong || isSingleSong;


  // current music info is current index song in playlist
  const currentMusicInfo = playlist[currentIndex] || {};

  const handlePrevSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = useCallback(() => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first song
    }
  }, [currentIndex, playlist, setCurrentIndex]);
  
  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  // currentMusicInfo.videoId changes -> audioUrl Changes
  useEffect(() => {
    const fetchAudioUrl = async () => {
      setIsLoadingNextSong(true); // Set loading state to true
      setAudioUrl('')
      if (currentMusicInfo.videoId) {
        try {
          const url = await getAudioUrl(currentMusicInfo.videoId);
          setAudioUrl(url);
        } catch (error) {
          console.error('Error fetching audio URL:', error);
          // Handle error, e.g., set an error state or show a message to the user
        } finally {
          setIsLoadingNextSong(false);
        }
      } else {
        setAudioUrl('')
        setIsLoadingNextSong(false);
      }
    };

    fetchAudioUrl();
  }, [currentMusicInfo.videoId]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      handleNextSong(); // Automatically play the next song when the current song ends
    };

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const checkTitleOverflow = () => setIsOverflowing(titleRef.current.offsetWidth < titleRef.current.scrollWidth);

    const setupAudio = () => {
      if (audio.src !== audioUrl && audioUrl) {
        audio.src = audioUrl;
        //audio.load();
        setIsPlaying(true);
      } else if (!audioUrl) {
        audio.src = '';
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      }

      audio.volume = isMuted ? 0 : volume;

      if (isPlaying && !isLoadingNextSong) {
        audio.play().catch(error => console.error('Error playing music:', error));
      } else {
        audio.pause();
      }
    };

    setupAudio();
    checkTitleOverflow();

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl, isPlaying, volume, isMuted, handleNextSong, isLoadingNextSong]);

  
  return (
    <div className="music-player">
      <div className='music-info-container'>
        <div className="album-image-container">
          <img src={currentMusicInfo.image || defaultAlbumImage} alt="Album Cover" className="album-image" />
        </div>
        <div className="info-container">
          <div className={`music-title ${isOverflowing ? 'overflow' : ''}`} ref={titleRef}>{decodeHtmlEntities(currentMusicInfo.title) || "Muse"}</div>
        </div>
      </div>
      
      <div className="controls-container">
        <div className="playback-controls">
          <div className='playback-controls-icons'>
            <FontAwesomeIcon
              icon={faStepBackward}
              onClick={handlePrevSong}
              size="2x"
              className={`prev-icon ${isControlsDisabled ? 'disabled' : ''}`}
              disabled={isControlsDisabled}
            />
            <FontAwesomeIcon
              icon={isPlaying && !isLoadingNextSong ? faPause : faPlay}
              onClick={togglePlay}
              size="2x"
              className={`play-pause-icon ${isLoadingNextSong || noSong ? 'disabled' : ''}`}
              disabled={isLoadingNextSong || noSong}
            />
            <FontAwesomeIcon
              icon={faStepForward}
              onClick={handleNextSong}
              size="2x"
              className={`next-icon ${isControlsDisabled ? 'disabled' : ''}`}
              disabled={isControlsDisabled}
            />
          </div>
          <div className="time-slider-container">
            <span className="current-time">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleTimeChange}
              className="time-slider"
              style={{
                '--progress': `${(currentTime / duration) * 100}%`
              }}
              disabled={isLoadingNextSong || noSong}
            />
            <span className="duration-time">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
      
      <div className='addition-controls-container'>
        <div className="volume-controls">
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeUp}
            onClick={handleMute}
            size="1x"
            className="mute-icon"
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{
              '--progress': `${volume * 100}%`
            }}
          />
        </div>
        <div className="playlist-control" onClick={togglePlaylist}>
          <FontAwesomeIcon 
            icon={faListUl}
            size="1x"
            className="playlist-icon"
          />
        </div>
      </div>
      {/* CurrentPlaylist Component */}
      <div style={{ display: showPlaylist ? 'block' : 'none' }}>
        <CurrentPlaylist
          playlist={playlist}
          setPlaylist={setPlaylist}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          handleNextSong={handleNextSong}
        />
    </div>
    </div>
  );
};

export default MusicPlayer;
