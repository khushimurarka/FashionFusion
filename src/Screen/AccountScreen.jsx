import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import  ButtonComponent from "../components/ButtonComponent"; // Adjust the import path as necessary

const AccountScreen = ({ navigation }) => {

  const handlePress = (screenName) => {
    Alert.alert(`${screenName} pressed!`);
    // navigation.navigate(screenName); // Uncomment this line when the screens are created
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ButtonComponent
        title="Personal Loan"
        onPress={() => handlePress('PersonalLoan')}
        colors={['#4b79a1', '#1d2b64']}
        iconName="money"
      />
      <ButtonComponent
        title="Manage Account"
        onPress={() => handlePress('ManageAccount')}
        colors={['#4b79a1', '#1d2b64']}
        iconName="user"
      />
      <ButtonComponent
        title="Payments"
        onPress={() => handlePress('Payments')}
        colors={['#4b79a1', '#1d2b64']}
        iconName="credit-card"
      />
      <ButtonComponent
        title="Settings"
        onPress={() => handlePress('Settings')}
        colors={['#4b79a1', '#1d2b64']}
        iconName="cogs"
      />
      <ButtonComponent
        title="FashionFusion Suggestion"
        onPress={() => handlePress('FashionSuggestion')}
        colors={['#00C9A7', '#92FE9D']}
        iconName="lightbulb-o"
      />
      <ButtonComponent
        title="Logout"
        onPress={handleLogout}
        colors={['#FF5F6D', '#FF3A3A']}
        iconName="sign-out"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AccountScreen;
