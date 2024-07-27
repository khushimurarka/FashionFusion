// context/CartContext.js
import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const loadCartItems = useCallback(async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cart');
      const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      if (Array.isArray(parsedCartItems)) {
        setCartItems(parsedCartItems);
        calculateTotalPrice(parsedCartItems);
      } else {
        throw new Error('Invalid cart items data');
      }
    } catch (error) {
      setError('Failed to load cart items');
      console.error(error);
    }
  }, []);

  const updateCartItems = async (updatedCartItems) => {
    try {
      calculateTotalPrice(updatedCartItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } catch (error) {
      setError('Failed to update cart items');
      console.error(error);
    }
  };

  const addToCartItem = async (item) => {
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems];
      const itemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (itemIndex === -1) {
        updatedCartItems.push(item);
        updateCartItems(updatedCartItems);
      }

      return updatedCartItems;
    });
  };

  const deleteCartItem = async (id) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter((item) => item.id !== id);
      updateCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  const calculateTotalPrice = useCallback((items) => {
    const totalSum = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(parseFloat(totalSum.toFixed(2)));
  }, []);

  const value = {
    cartItems,
    addToCartItem,
    deleteCartItem,
    totalPrice,
    error,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
