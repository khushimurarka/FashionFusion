import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const GetStartedPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/welcome.jpeg')} 
      style={styles.background}
    >
      <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']} style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to the App!</Text>
          <Text style={styles.subtitle}>Start your journey with us</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LOGIN')}>
            <Text style={styles.buttonText}>Get Started</Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#FF6F61',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
});

export default GetStartedPage;
