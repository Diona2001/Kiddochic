import React, { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      if (!userId) {
        toast.error("Invalid user ID. Please log in again.");
        setLoading(false);
        return;
      }

      const { url, method } = SummaryApi.getCart;
      const response = await fetch(`${url}?userId=${userId}`, { 
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }

      const data = await response.json();
      console.log("Fetched Cart Data:", data);

      if (data.success) {
        setCart(data.data);
      } else {
        toast.error(data.message || "Failed to load cart.");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to modify your cart.");
        return;
      }
  
      const { url, method } = SummaryApi.updateCartQuantity(productId);
      
      // Explicitly use the PUT method and add headers and body
      const response = await fetch(url, {
        method: "PUT", // Ensure it’s set explicitly here
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }), // Body with quantity
      });
  
      if (!response.ok) {
        throw new Error("Failed to update quantity.");
      }
  
      const data = await response.json();
      if (data.success) {
        toast.success("Quantity updated.");
        fetchCart(); // Refresh cart after updating
      } else {
        toast.error(data.message || "Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
  };
  

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to modify your cart.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const { url, method } = SummaryApi.removeFromCart(productId);
      const deleteUrl = `${url}?userId=${userId}`;
      console.log("Delete URL:", deleteUrl);

      const response = await fetch(deleteUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete item from cart.");
      }

      const data = await response.json();
      console.log("Deleted Cart Item:", data);

      if (data.success) {
        toast.success("Item removed from cart.");
        fetchCart();
      } else {
        toast.error(data.message || "Failed to remove item.");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete item from cart.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <p>Loading...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (totalAmount * 0.1).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-4 flex">
      {/* Cart Items Section */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.items.map(item => (
          <div key={item.product._id} className="flex items-center justify-between mb-4 border p-2">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover" />
            <div className="flex-1 px-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">{item.product.description}</p>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <div className="flex items-center">
                <button
                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => item.quantity > 1 && handleUpdateQuantity(item.product._id, item.quantity - 1)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary Section */}
      <div className="w-1/3 p-4 border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p className="text-lg">Total Amount: ₹{totalAmount.toFixed(2)}</p>
        <p className="text-lg text-green-600">Discount: -₹{discountAmount}</p>
        <p className="text-lg">Shipping Fee: Free</p>
        <hr className="my-2" />
        <p className="text-xl font-bold">Grand Total: ₹{(totalAmount - discountAmount).toFixed(2)}</p>
        <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
