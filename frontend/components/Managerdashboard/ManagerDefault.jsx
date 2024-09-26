import React, { useEffect, useState } from 'react';

const ManagerDefault = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchManager = async () => {
            try {
                const response = await fetch("http://localhost:3000/grabManager", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include" 
                });

                if (response.ok) {
                    const managerName = await response.json(); 
                    console.log("Manager Name:", managerName);
                    setName(managerName); 
                } else {
                    setError("Failed to fetch Manager");
                }
            } catch (err) {
                setError("An error occurred while fetching account details"); 
            }
        };

        fetchManager();
    }, []);

    return (
        <div>
            Welcome {name || "Guest"}
            {error && <p style={{ color: 'red' }}>{error}</p>} {}
        </div>
    );
};

export default ManagerDefault;