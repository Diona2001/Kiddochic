import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from './ShoppingCartContext';
import SummaryApi from '../common';

import { toast } from 'react-toastify';


const ProductCard = ({ product }) => {
  const { buyNow } = useContext(ShoppingCartContext);
  const navigate = useNavigate();  // React Router's useNavigate to redirect

  const {
    name,
    category,
    subcategory,
    description,
    originalPrice,
    discountPrice,
    discount,
    // stock,
    imageUrl,
  } = product;

  // Function to handle clicking the image (e.g., navigate to product details)
  const handleImageClick = () => {
    navigate(`/products/${product._id}`);  // Redirect to product details page
  };

  const addToCart = async (product) => {
    console.log("Entered the function", product._id);
  
    try {
      const token = localStorage.getItem("token"); // Get JWT token from local storage or context
      const usertoken=localStorage.getItem("user");
      if (!token) {
        toast.error("Please Login");
        return;
      }
  
      const { url, method } = SummaryApi.addToCartProduct();
  
      const responses = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        },
        body: JSON.stringify({ productId: product._id, quantity: 1,usertoken })
      });
  
      const response = await responses.json();
  
      if (response.success) {
        alert("Product added to cart!");
        navigate('/cart');  // Redirect to cart page
      } else {
        alert("Product not added to cart!");
      }
    } catch (err) {
      toast.error("Error occurred while adding product to cart!");
      console.error(err);
    }
  };
  
  


  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white"
      style={{
        border: '1px solid #eaeaea',
        transition: 'transform 0.2s',
        hover: { transform: 'scale(1.02)' },
      }}
    >
      {/* Image */}
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={imageUrl}
        alt={name}
        onClick={handleImageClick}
        style={{
          height: '250px',
          width: '100%',
          objectFit: 'cover',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          transition: 'opacity 0.3s',
        }}
      />
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-2"
          style={{ color: '#333', fontSize: '1.25rem', fontWeight: '600' }}
        >
          {name}
        </div>
        <p className="text-gray-700 text-base" style={{ fontSize: '0.95rem', color: '#555' }}>
          {description}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <span
            className="text-gray-600 line-through"
            style={{ fontSize: '0.95rem', color: '#999', marginRight: '8px' }}
          >
            ₹{originalPrice.toFixed(2)}
          </span>
          <span className="text-green-500 font-semibold" style={{ fontSize: '1rem' }}>
            ₹{discountPrice.toFixed(2)}
          </span>
        </div>
        <span
          className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
          style={{
            fontSize: '0.8rem',
            padding: '4px 8px',
            color: '#007acc',
            backgroundColor: '#e6f4ff',
            borderRadius: '12px',
          }}
        >
          {category} - {subcategory}
        </span>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-600" style={{ fontSize: '0.9rem', color: '#888' }}>
          Discount: {discount}%
        </span>
      </div>

      {/* Add to Cart and Buy Now buttons */}
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          className="text-white px-4 py-2 rounded mr-2"
          onClick={() => addToCart(product)}
          style={{
            backgroundColor: '#ff69b4', // Pink background for Add to Cart button
            padding: '10px 16px',
            fontSize: '1rem',
            fontWeight: '500',
            borderRadius: '4px',
            transition: 'background-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = '0px 4px 15px rgba(255, 105, 180, 0.6)'} // Pink shadow on hover
          onMouseLeave={(e) => e.target.style.boxShadow = 'none'} // Remove shadow on mouse leave
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 rounded"
          onClick={() => buyNow(product)}
          style={{
            color: '#ff69b4',
            border: '2px solid #ff69b4',
            padding: '10px 16px',
            fontSize: '1rem',
            fontWeight: '500',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            transition: 'border-color 0.3s, color 0.3s',
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
