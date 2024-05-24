import React, { useState, useEffect } from 'react';
import axios from 'axios';

const View= () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/view');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>All Data</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h2>Set {index + 1}</h2>
          {item.map((field, idx) => (
            <div key={idx}>
              <h3>{field.name}</h3>
              <p>{field.description}</p>
              <p>{field.type}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default View;
