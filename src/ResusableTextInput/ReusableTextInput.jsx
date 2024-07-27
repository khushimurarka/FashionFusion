import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.roundedInput}
        placeholder="Enter to tap..."
      />
      <View style={styles.iconInputContainer}>
        <MaterialIcons name="person" size={24} color="black" />
        <TextInput
          style={styles.iconInput}
          placeholder="Enter to tap..."
        />
      </View>
      <TextInput
        style={styles.borderedInput}
        placeholder="Enter to tap..."
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.blueBorderedInput}
        placeholder="Enter to tap..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    width:"80%",
  },
  roundedInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
    
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  iconInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  borderedInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blueBorderedInput: {
    height: 40,
    borderColor: '#00f',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
});