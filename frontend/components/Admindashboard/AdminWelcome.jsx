import React, { useState, useEffect } from 'react';
import '../../css/Admindashboardcss/WelcomeAdmin.css';

const WelcomeAdmin = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchAdmin = async () => {
          try {
              const response = await fetch("http://localhost:3000/grabAdmin", {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  credentials: "include" 
              });

              if (response.ok) {
                  const data = await response.json(); 
                  console.log("Admin Data:", data); 
                  setName(data.name); 
              } else {
                  setError("Failed to fetch Admin"); 
              }
          } catch (err) {
              setError("An error occurred while fetching account details"); 
          }
      };

      fetchAdmin();
  }, []);

  return (
    <div className="welcome-container">
      {error ? (
        <h1 className="error-text">{error}</h1>
      ) : (
        <h1 className="welcome-text">WELCOME {name}</h1>
      )}
    </div>
  );
};

export default WelcomeAdmin;