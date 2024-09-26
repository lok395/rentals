import React, { useState } from 'react';
import '../css/PriceFilter.css'; 

const PriceFilter = ({setminprice,setmaxprice}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    setminprice(value);
  };

 
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    setmaxprice(value);

  };

  return (
    <div className="price-filter">
      <div className="price-input">
        <label htmlFor="min-price">Min Price:</label>
        <input
          type="number"
          id="min-price"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min"
          min="0" 
        />
      </div>
      <div className="price-input">
        <label htmlFor="max-price">Max Price:</label>
        <input
          type="number"
          id="max-price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max"
          min={minPrice || '0'} 
        />
      </div>
    </div>
  );
};

export default PriceFilter;