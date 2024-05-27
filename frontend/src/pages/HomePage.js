// src/pages/HomePage.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/HomePage.css';

const HomePage = ({ setPlaylist, setCurrentIndex }) => {
  const [searched, setSearched] = useState(false);
  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="homepage-container">
      <div className="main-content">
        <SearchBar onSearch={handleSearch} setPlaylist={setPlaylist} setCurrentIndex={setCurrentIndex} />
        {!searched && (
          <div>
            <h2>Welcome to our music website!</h2>
            <p>Explore our collection of music and discover new tracks.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
