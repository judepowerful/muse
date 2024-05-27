// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="site-name">Muse</h1>
      <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavLink>
        {/*<NavLink to="/list" activeClassName="active">My List</NavLink>*/}
      </nav>
      {/*
      <button>Sign Out</button>
      */}
      
    </div>
  );
};

export default Sidebar;
