import React, { useState } from 'react';
import "../css/SearchBar.css"; 
const SearchBar = ({setsearchinput}) => {
    const [input, setInput] = useState('');

    const handleChange = (value) => {
        setInput(value);
        setsearchinput(value);
    };


    return (
        <div className='input-wrapper'>
            <input
                placeholder='Type to Search...'
                value={input}
                onChange={(e) => handleChange(e.target.value)} 
            />
        </div>
    );
};

export default SearchBar;
