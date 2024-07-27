import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CartCard = ({ item = {}, handleDelete = () => {} }) => {
  const handleDeleteClick = () => {
    console.log("Delete button clicked for item id:", item.id); // Debugging
    if (handleDelete) {
      handleDelete(item.id);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image || 'fallback_image_url' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.textCircleContainer}>
          <View
            style={[styles.circle, { backgroundColor: item.color || 'red' }]}
          />
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteClick}
        accessibilityLabel={`Delete ${item.title} from cart`}
      >
        <Image source={require('../assets/deleteIcon.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

CartCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string,
    size: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func,
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  textCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  sizeContainer: {
    backgroundColor: '#FFFFFF',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 0,
    marginTop: 10,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});

