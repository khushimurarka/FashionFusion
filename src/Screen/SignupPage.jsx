// src/Screen/SignupPage.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const SignupPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const { signUp } = useContext(AuthContext);

  const handleSignup = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await signUp(username, password); // Update with actual signUp logic
      
      // Store user data or token in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ username, password }));

      navigation.navigate('LoginPage'); // Navigate to LoginPage upon successful signup
    } catch (e) {
      setError(e.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/welcome.jpeg')} // Path to your background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          accessibilityLabel="Username"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          textContentType="password"
          accessibilityLabel="Password"
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          textContentType="password"
          accessibilityLabel="Confirm Password"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignup} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.link} 
          onPress={() => navigation.navigate('LoginPage')} // Navigate to LoginPage
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire background
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background to improve text readability
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 8,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default SignupPage;
