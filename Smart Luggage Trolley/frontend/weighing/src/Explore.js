// src/Explore.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css';

const Explore = () => {
  return (
    <div className="exploreContainer">
      <h1>IOT Weighing Scale</h1>
      <Link to="/check-weight">
        <input type="button" className="checkWeight" value="Check Weight" />
      </Link>
      <Link to="/map">
        <input type="button" className="checkWeightDatabase" value="Check Location" />
      </Link>
    </div>
  );
};

export default Explore;
