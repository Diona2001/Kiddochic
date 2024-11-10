import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const clearCart = () => {
    setCartItems([]); // Reset cart items to an empty array
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
