  // Example: src/pages/Home.js
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  const Home = () => {
      const [data, setData] = useState([]);

      useEffect(() => {
          axios.get('http://localhost:5000/api/some-endpoint') // Update with your API URL
              .then(response => {
                  setData(response.data);
              })
              .catch(error => {
                  console.error("There was an error fetching the data!", error);
              });
      }, []);

      return (
          <div>
              <h2>Data from Backend</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
      );
  };

  export default Home;
  