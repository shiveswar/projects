// DataTable.js
import React, { useEffect, useState } from 'react';
import { database } from './firebaseConfig'; // Adjust the path as needed
import { ref, onValue } from 'firebase/database';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, 'path/to/your/data'); // Set to your Firebase path
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      const dataArray = [];
      
      // Convert fetched object data to an array
      for (const key in fetchedData) {
        dataArray.push({ id: key, ...fetchedData[key] });
      }
      setData(dataArray);
    });
  }, []);

  return (
    <div>
      <h1>Data Table</h1>
      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            {/* Add more columns based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.value}</td>
                {/* Add more cells based on your data structure */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
