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
      // console.log(token)
      if (!token) {
        toast.error("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      // Decode the token to get user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Assuming userId is the field in the token
      // console.log("userid=",userId)
      if (!userId) {
        toast.error("Invalid user ID. Please log in again.");
        setLoading(false);
        return;
      }

      const { url, method } = SummaryApi.getCart;
      const response = await fetch(`${url}?userId=${userId}`, {  // Pass userId as a query parameter
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
  // Handle Remove Item
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
      const deleteUrl = `${url}?userId=${userId}`;  // Append userId as query parameter
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
        fetchCart(); // Refresh cart after deletion
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.product._id} className="flex items-center justify-between mb-4 border p-2">
          <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover" />
          <div className="flex-1 px-4">
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">{item.product.description}</p>
            <p>Price: ₹{item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
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
      <div className="text-right font-bold text-xl mt-4">
        Total Amount: ₹{cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
