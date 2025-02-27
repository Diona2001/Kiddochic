import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from './ShoppingCartContext';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const {
    name,
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
        addToCart({ productId: product._id, quantity: 1 });
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
    <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          {discount}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          onClick={handleImageClick}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
            {subcategory}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-blue-600 cursor-pointer"
            onClick={handleImageClick}>
          {name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-800">
              ₹{discountPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => addProductToCart(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FaShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button 
            onClick={handleImageClick}
            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-lg font-medium transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
