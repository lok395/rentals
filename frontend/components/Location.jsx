import React, { useState,useEffect } from 'react'
import '../css/Location.css'
function Location({setlocation}) {
    const [input,setinput]=useState("");

    const handleLocation=(value)=>{
        setinput(value);
        setlocation(value);
    }
    const[Locations,setLocations] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/locations')
          .then((response) => response.json())
          .then((data) => setLocations(data.locations))
          .catch((error) => console.error('Error fetching locations:', error));
  }, []);
  return (
    <div id='locationinput'>
        <div >
          select a location
            <select id='locationName' name='locationName' value={input} onChange={(e)=>{handleLocation(e.target.value)}}>
                    <option value="">Select a location</option>
                    {Locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
            </select>
         </div>
    </div>
  )
}

export default Location