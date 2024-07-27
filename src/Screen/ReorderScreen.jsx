import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ReorderScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [itemHeight, setItemHeight] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedData = await AsyncStorage.getItem('reorderedItems');
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          const defaultProducts = [
            {
              id: 1,
              image: 'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/cwlk21f74nd9iamrlzkh.png',
              title: 'Jacket',
              price: 49.99,
            },
            {
              id: 2,
              image: 'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/qichw3wrcioebkvzudib.png',
              title: 'Jeans',
              price: 39.99,
            },
            {
              id: 3,
              image: 'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/vy2q98s8ucsywwxjx2cf.png',
              title: 'Acrylic Sweater',
              price: 29.99,
            },
          ];
          setData(defaultProducts);
        }
      } catch (error) {
        console.error('Error loading items from AsyncStorage:', error);
      }
    };

    loadItems();
  }, []);

  const handlePanResponderMove = (e, gestureState) => {
    pan.setValue({ x: 0, y: gestureState.moveY });
  };

  const handlePanResponderRelease = async (e, gestureState) => {
    const { moveY } = gestureState;
    const newIndex = Math.floor((moveY - itemHeight / 2) / itemHeight);

    if (newIndex >= 0 && newIndex < data.length && draggingIndex !== null) {
      const newData = [...data];
      const [removed] = newData.splice(draggingIndex, 1);
      newData.splice(newIndex, 0, removed);

      setData(newData);
      await AsyncStorage.setItem('reorderedItems', JSON.stringify(newData));

      flatListRef.current.scrollToIndex({ index: newIndex });

      setDraggingIndex(null);
      pan.setValue({ x: 0, y: 0 });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: () => {
        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  const measureItemHeight = (event) => {
    const { height } = event.nativeEvent.layout;
    if (itemHeight === 0) {
      setItemHeight(height);
    }
  };

  const handleReorderPress = () => {
    if (selectedItem) {
      navigation.navigate('PRODUCT_DETAILS', { item: selectedItem });
    }
  };

  const renderItem = React.useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          index === draggingIndex && { zIndex: 1 },
        ]}
        onLayout={index === draggingIndex ? measureItemHeight : null}
        {...(index === draggingIndex ? panResponder.panHandlers : {})}
        onLongPress={() => {
          setDraggingIndex(index);
        }}
        onPress={() => setSelectedItem(item)}
      >
        <LinearGradient
          colors={['#fefefe', '#e0e0e0']}
          style={styles.itemGradient}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setSelectedItem(item);
              navigation.navigate('PRODUCT_DETAILS', { item });
            }}
          >
            <View style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </View>
          </TouchableWithoutFeedback>
          {index === draggingIndex && (
            <Ionicons
              name="md-reorder"
              size={24}
              color="#4F8EF7"
              style={styles.reorderIcon}
            />
          )}
          {index === draggingIndex && (
            <Animated.View
              style={[
                styles.draggedItem,
                {
                  transform: pan.getTranslateTransform(),
                  elevation: 10,
                },
              ]}
            >
              <LinearGradient
                colors={['#fefefe', '#e0e0e0']}
                style={styles.itemGradient}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
              </LinearGradient>
            </Animated.View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    ),
    [draggingIndex, data]
  );

  return (
    <LinearGradient
      colors={['#e0e0e0', '#ffffff']}
      style={styles.container}
    >
      <Text style={styles.title}>Reorder Screen</Text>
      <TouchableOpacity
        style={[
          styles.primaryButton,
          !selectedItem && styles.disabledButton,
        ]}
        onPress={handleReorderPress}
        disabled={!selectedItem}
      >
        <Text style={styles.primaryButtonText}>View Selected Product Details</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  itemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4F8EF7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#4F8EF7',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4F8EF7',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  reorderIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  draggedItem: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default ReorderScreen;
