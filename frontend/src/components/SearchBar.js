// src/components/SearchBar.js
import React, { useState } from 'react';
import { searchYouTube } from '../services/youtubeService';
import '../styles/SearchBar.css';
import SearchResults from './SearchResults';

const SearchBar = ({ onSearch, setPlaylist, setCurrentIndex }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchYouTube(query);
    setResults(data);
    onSearch();
  };

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="search-bar-input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for music"
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={results} setPlaylist={setPlaylist} setCurrentIndex={setCurrentIndex} />
    </div>
  );
};

export default SearchBar;
