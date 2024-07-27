import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // Import icons from expo-vector-icons

const ButtonComponent = ({ title, onPress, colors, iconName }) => {
  return (
    <LinearGradient colors={colors} style={styles.buttonGradient}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonContent}>
          {iconName && (
            <FontAwesome name={iconName} size={20} color="#fff" style={styles.icon} />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    padding: 2, // added padding to show gradient effect
  },
  button: {
    padding: 13, // reduced padding to fit gradient
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent', // added transparent background
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold', // added bold font
  },
  icon: {
    marginRight: 10, // space between icon and text
  },
});

export default ButtonComponent;
