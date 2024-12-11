import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead
import './Explore.css'; // Importing the same CSS as Explore

const CheckWeight = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = () => {
    // Reset error message
    setError('');

    // Validation: Check if ticketNumber is a 6-digit number
    if (!/^\d{6}$/.test(ticketNumber)) {
      setError('Ticket number must be exactly 6 digits.');
      return;
    }

    // Navigate to DisplayWeight with ticketNumber as state
    navigate('/display-weight', { state: { ticketNumber } }); // Use navigate instead of history.push
  };

  return (
    <div className="checkWeightContainer">
      <h2>Enter the Ticket Number</h2>
      <input
        type="text"
        value={ticketNumber}
        onChange={(e) => setTicketNumber(e.target.value)}
        placeholder="Ticket Number"
        className="ticketInput"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input 
        type="button" 
        value="Submit" 
        className="submitButton" 
        onClick={handleSubmit} 
      />
    </div>
  );
};

export default CheckWeight;
