import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated when the app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // Sign up method
  const signUp = async (username, password) => {
    try {
      // Simulate a signup request
      // Replace with actual signup logic, e.g., API request
      const userData = { username, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error('Failed to sign up. Please try again.');
    }
  };

  // Sign in method
  const signIn = async (username, password) => {
    try {
      // Simulate a sign-in request
      // Replace with actual sign-in logic, e.g., API request
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.username === username && parsedUser.password === password) {
          setUser(parsedUser);
        } else {
          throw new Error('Invalid username or password');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Failed to sign in. Please try again.');
    }
  };

  // Sign out method
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  // Provide context values
  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
