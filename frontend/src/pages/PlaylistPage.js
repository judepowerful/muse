import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlaylistPage.css';

const PlaylistPage = () => {
  const [lists, setLists] = useState([]);
  const [editableListId, setEditableListId] = useState(null);
  const navigate = useNavigate();

  const handleCreateList = () => {
    const newList = {
      id: lists.length + 1,
      name: 'New Playlist',
      tracks: []
    };
    setLists([...lists, newList]);
    setEditableListId(newList.id); // Set the editable list ID for the newly created list
  };

  const handleListClick = (id, event) => {
    if (event && !event.target.classList.contains('playlist-name')) {
      navigate(`/playlist/${id}`);
    }
  };

  const handleListNameChange = (id, newName) => {
    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, name: newName };
      }
      return list;
    });
    setLists(updatedLists);
  };

  return (
    <div className="playlist-page">
      <h2>My Playlists</h2>
      <button onClick={handleCreateList} className="create-playlist-button">
        Create Playlist
      </button>
      {lists.map((list) => (
        <div
          key={list.id}
          className="playlist"
          onClick={(event) => handleListClick(list.id, event)} // Pass the event object
        >
          {editableListId === list.id ? (
            <input
              type="text"
              value={list.name}
              autoFocus // Automatically focus the input field when it appears
              onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the parent div
              onChange={(e) => handleListNameChange(list.id, e.target.value)}
              onBlur={() => setEditableListId(null)}
            />
          ) : (
            <div
              className="playlist-name"
              onClick={() => setEditableListId(list.id)} // Enable editing onClick
            >
              {list.name}
            </div>
          )}
          <ul>
            {list.tracks.map((track) => (
              <li key={track.id}>{track.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlaylistPage;
