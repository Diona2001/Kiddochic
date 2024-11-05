// src/components/ShoppingCartContext.js
import React, { createContext, useState } from 'react';
import SummaryApi from '../common';


export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart function
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    // const dataResponse = await fetch(SummaryApi.addToCartProduct.url, {
    //   method: SummaryApi.addToCart.method,
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify(product)
    // });

    // const dataApi = await dataResponse.json();

    alert(`${product.name} has been added to the cart!`);
  };

  // Buy Now function (you might want to navigate to the checkout page)
  const buyNow = (product) => {
    setCartItems([product]); // Add only the current product to the cart
    alert(`Proceeding to buy ${product.name}`);
    // Navigate to checkout or process the order directly
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, addToCart, buyNow }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
