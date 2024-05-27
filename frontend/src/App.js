// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage'; // Import the PlaylistPage component
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import MusicPlayer from './components/MusicPlayer'; // Import the MusicPlayer component
import './App.css';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <Router>
      <Sidebar /> {/* Render the sidebar component outside of the Routes */}
      <Routes>
        <Route path="/" element={<HomePage  setPlaylist={setPlaylist}  setCurrentIndex={setCurrentIndex} />} />
        <Route path="/list" element={<PlaylistPage  setPlaylist={setPlaylist} />} />
        {/* Add more routes as needed */}
      </Routes>
      <MusicPlayer
        playlist={playlist}
        setPlaylist={setPlaylist}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      /> {/* MusicPlayer is always rendered */}
    </Router>
  );
};

export default App;