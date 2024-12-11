import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_SHFeYHzmIYZmeBFjAzL_vIq7I3yFwJM",
    authDomain: "iot-weighing-machine.firebaseapp.com",
    databaseURL: "https://iot-weighing-machine-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-weighing-machine",
    storageBucket: "iot-weighing-machine.appspot.com",
    messagingSenderId: "95509724253",
    appId: "1:95509724253:web:d2ba2417cb2ab81aa9e1b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const DisplayWeight = () => {
  const { state } = useLocation();
  const { ticketNumber } = state || {};
  const [weightData, setWeightData] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const db = getDatabase(app);
      const path = `/measurements/${ticketNumber}`;
      const weightRef = ref(db, path);

      get(weightRef).then((snapshot) => {
        if (snapshot.exists()) {
          setWeightData(snapshot.val());
        } else {
          setWeightData('No data found for this ticket number.');
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
        setWeightData('Error fetching data.');
      });
    }
  }, [ticketNumber]);

  return (
    <div className="displayWeightContainer">
      <h2>Weight Data for Ticket Number: {ticketNumber}</h2>
      {weightData ? (
        <div>
          <p>Weight: {weightData.weight} KG</p>
          <p>Timestamp: {weightData.timestamp}</p>
          {weightData.notification && (
            <p className="notification">{weightData.notification}</p> // Apply notification class
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DisplayWeight;
