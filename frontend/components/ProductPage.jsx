import React, { useEffect, useState } from 'react';
import { useParams,useLocation,useNavigate } from 'react-router-dom';
import Carousel from './Carousel'; 
import '../css/ProductPage.css';
const ProductPage = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState();
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search)
  const navigate = useNavigate();
   const fetchProduct = async (product_id) => {
    try {
      const response = await fetch(`http://localhost:3000/product/${product_id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      setProduct(product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct(product_id); 
  }, [product_id]);

  if (!product) return <p>Loading...</p>;
  const handleBookNow = () => {
    navigate(`/productbooking/${product_id}?${queryparams}`)
  };

  return (
    <div className="product-page">
      <div className="content">
        <h1>{product.productName}</h1>
        <p>Location: {product.locationName}</p>
        <p>Available from: {new Date(product.fromDateTime).toLocaleString()}</p>
        <p>Available to: {new Date(product.toDateTime).toLocaleString()}</p>
        <p>Price: Rs.{product.price} / hour</p>
        <button onClick={handleBookNow} className="book-button">
          Book Now
        </button>
      </div>
      <div className="images">
        <Carousel images={product.photo} />
      </div>
    </div>
  );
};

export default ProductPage;