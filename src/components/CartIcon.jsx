// src/components/CartIcon.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

const CartIcon = () => {
  const context = useContext(CartContext);

  if (!context) {
    return null; // Optionally, return a fallback UI or an empty view
  }

  const { cartItems } = context;

  return (
    <View style={styles.container}>
      <FontAwesome name="shopping-cart" size={24} color="gray" />
      {cartItems.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    bottom: 20,
    height: 16,
    width: 16,
    backgroundColor: '#E96E6E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
});

export default CartIcon;
