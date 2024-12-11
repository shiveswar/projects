// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css'; // Ensure this file exists

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>IOT Weighing Scale</h1>
      <Link to="/explore">
        <input type="button" className='explore-button' value="Explore" />
      </Link>
    </div>
  );
};

export default Home;
    