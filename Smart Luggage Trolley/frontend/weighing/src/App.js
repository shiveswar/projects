// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore'; // Import the Explore component
import CheckWeight from './CheckWeight';
import DisplayWeight from './DisplayWeight';
import MapComponent from './MapComponent';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/explore" element={<Explore />} /> {/* Ensure this is correct */}
          <Route path="/check-weight" element={<CheckWeight />} />
          <Route path="/display-weight" element={<DisplayWeight />} />
          <Route path="/map" element={<MapComponent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
