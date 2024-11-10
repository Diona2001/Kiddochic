import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from './ShoppingCartContext';
import SummaryApi from '../common';

import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const {
    name,
    category,
    subcategory,
    description,
    originalPrice,
    discountPrice,
    discount,
    imageUrl,
  } = product;

  const handleImageClick = () => {
    navigate(`/products/${product._id}`);
  };

  const addProductToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      const usertoken = localStorage.getItem("user");
      if (!token) {
        toast.error("Please Login");
        return;
      }

      const { url, method } = SummaryApi.addToCartProduct();
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1, usertoken }),
      });

      const result = await response.json();

      if (result.success) {
        addToCart({ productId: product._id, quantity: 1 });  // Update cart in context
        toast.success("Product added to cart!");
        navigate('/cart');
      } else {
        toast.error("Product not added to cart!");
      }
    } catch (err) {
      toast.error("Error occurred while adding product to cart!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={imageUrl}
        alt={name}
        onClick={handleImageClick}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <span className="text-gray-600 line-through">₹{originalPrice.toFixed(2)}</span>
          <span className="text-green-500 font-semibold">₹{discountPrice.toFixed(2)}</span>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {category} - {subcategory}
        </span>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">Discount: {discount}%</span>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          className="text-white px-4 py-2 rounded mr-2 bg-pink-500"
          onClick={() => addProductToCart(product)}
        >
          Add to Cart
        </button>
        <button className="px-4 py-2 rounded border-2 border-pink-500 text-pink-500">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
