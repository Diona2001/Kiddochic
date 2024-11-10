import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart and update cartItems state
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.productId === item.productId);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map(i =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // If item does not exist, add it to the cart
        return [...prevItems, { ...item, quantity: item.quantity }];
      }
    });
  };

  const buyNow = (item) => {
    // Implement buyNow function if necessary
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, addToCart, buyNow }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
