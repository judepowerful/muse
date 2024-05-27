import React from 'react';
import { FaMusic, FaMinus } from 'react-icons/fa'; // Import the icon for the playlist
import '../styles/CurrentPlaylist.css'; // Define your styles for the CurrentPlaylist component
import { decodeHtmlEntities } from '../utils/htmlUtils';

const CurrentPlaylist = ({ playlist, setPlaylist, currentIndex, setCurrentIndex, handleNextSong }) => {
  const handleSongClick = (index) => {
    setCurrentIndex(index);
  };

  const handleRemoveSong = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
  
    if (updatedPlaylist.length === 0) {
      // If the playlist is empty, reset everything
      setCurrentIndex(-1);
    } else if (currentIndex === index) {
      // If the removed song is the current song
      handleNextSong(); // Automatically play the next song
    } else if (currentIndex > index) {
      // If the removed song is before the current song
      setCurrentIndex(currentIndex - 1);
    }

    setPlaylist(updatedPlaylist);
  }

  return (
    <div className="current-playlist">
      {playlist.length === 0 ? ( // Conditionally render based on playlist length
        <div className="empty-playlist">
          <FaMusic size={48} color="#555" /> {/* Icon for empty playlist */}
          <p style={{ color: '#555', fontSize: '14px' }}>Your playlist is empty</p>
        </div>
      ) : (
        <ul className="current-playlist-items">
          {playlist.map((song, index) => (
            <li
              key={index}
              className={index === currentIndex ? 'current-song' : ''}
              onClick={() => handleSongClick(index)}
            >
              <img src={song.image} alt={song.title} className="thumbnail" />
              <span>{decodeHtmlEntities(song.title)}</span>
              <button
                className="remove-song"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating to the list item
                  handleRemoveSong(index);
                }}
              >
                <FaMinus />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentPlaylist;
