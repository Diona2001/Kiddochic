import React, { createContext, useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const usertoken = localStorage.getItem("user");
      
      if (!token || !usertoken) {
        setCartItems([]);
        return;
      }

      const user = JSON.parse(usertoken);
      const { url, method } = SummaryApi.getCart;
      
      const response = await fetch(`${url}?userId=${user._id}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setCartItems(data.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    }
  };

  // Fetch cart items when component mounts and when auth state changes
  useEffect(() => {
    fetchCartItems();
  }, []);

  const clearCart = async () => {
    setCartItems([]); // Clear local state
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { url, method } = SummaryApi.clearCart;
      await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const addToCart = async (item) => {
    try {
      await fetchCartItems(); // Refresh cart items after adding
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const buyNow = (item) => {
    // Implement buyNow function if necessary
  };

  return (
    <ShoppingCartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      buyNow,
      clearCart,
      refreshCart: fetchCartItems 
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
