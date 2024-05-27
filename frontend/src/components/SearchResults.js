// src/components/SearchResults.js
import React from 'react';
import { decodeHtmlEntities } from '../utils/htmlUtils';
import '../styles/SearchResults.css';

const SearchResults = ({ results, setPlaylist, setCurrentIndex }) => {
  const handleAddToPlaylist = async (videoId, title, image) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = [...prevPlaylist, { videoId, title, image }];
      setCurrentIndex(newPlaylist.length - 1); // Set the new song as the current song
      return newPlaylist;
    });
  };

  return (
    <div className="results">
      {results.map((result) => (
        <div key={result.id} className="result-item" onClick={() => handleAddToPlaylist(result.id, result.title, result.thumbnail)}>
          <img src={result.thumbnail} alt={result.title} className="result-image" />
          <div className="result-title">{decodeHtmlEntities(result.title)}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

