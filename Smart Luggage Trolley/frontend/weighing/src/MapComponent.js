import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default center position
  const [destination, setDestination] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);

  // Function to handle the form submission for the destination
  const handleSubmit = (e) => {
    e.preventDefault();
    const lat = 51.505; // Replace with logic to get latitude
    const lng = -0.09; // Replace with logic to get longitude
    setMarkerPosition([lat, lng]);
    setPosition([lat, lng]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
        <button type="submit">Show on Map</button>
      </form>
      <MapContainer center={position} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={L.icon({ iconUrl: 'marker-icon.png' })}>
            <Popup>{destination}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
