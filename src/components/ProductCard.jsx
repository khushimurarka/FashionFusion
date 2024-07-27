import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";


const ProductCard = ({ item, handleProductClick, toggleFavorite }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(item);
          }}
        >
          {item.isFavorite ? (
            <AntDesign name="heart" size={20} color="red" style={styles.favoriteIcon} />
          ) : (
            <AntDesign name="hearto" size={20} color="black" style={styles.favoriteIcon} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  coverImage: {
    width: "100%",
    aspectRatio: 1,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    fontSize: 18,
    color: "#000",
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  favoriteIcon: {
    height: 20,
    width: 20,
  },
});
