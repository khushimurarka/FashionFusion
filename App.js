// App.js
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetStartedPage from './src/Screen/GetStartedPage';
import LoginPage from './src/Screen/LoginPage';
import SignupPage from './src/Screen/SignupPage';
import HomeScreen from './src/Screen/HomeScreen';
import ProductDetailsScreen from './src/Screen/ProductDetailsScreen';
import CartScreen from './src/Screen/CartScreen';
import ReorderScreen from './src/Screen/ReorderScreen';
import AccountScreen from './src/Screen/AccountScreen';
import { CartProvider, CartContext } from './src/context/CartContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// HomeStack for main application screens
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

// Main tabs for logged-in users
const MainTabs = () => {
  const { cartItems } = useContext(CartContext); // Access cart items from context

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name={focused ? 'home' : 'home'}
              size={size}
              color={focused ? '#E96E6E' : '#C0C0C0'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reorder"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Entypo
              name={focused ? 'repeat' : 'repeat'}
              size={size}
              color={focused ? '#E96E6E' : '#C0C0C0'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <View style={{ position: 'relative' }}>
              <MaterialCommunityIcons
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={focused ? '#E96E6E' : '#C0C0C0'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: -3,
                  bottom: 22,
                  height: 14,
                  width: 14,
                  backgroundColor: focused ? '#E96E6E' : '#C0C0C0',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>
                  {cartItems.length}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={size}
              color={focused ? '#E96E6E' : '#C0C0C0'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  // Show a loading screen while determining auth status
  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userToken ? (
            <>
              <Stack.Screen name="GetStarted" component={GetStartedPage} />
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="SignUp" component={SignupPage} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
