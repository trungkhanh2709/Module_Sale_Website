import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng CartContext
export const useCart = () => useContext(CartContext);
