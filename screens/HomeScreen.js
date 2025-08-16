// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // You'll need to install this

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove the stored token
      // You might also want to clear any user state in a global context if you have one
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.replace('Login'); // Go back to login screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Could not log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MedAI!</Text>
      <Text style={styles.subtitle}>You are successfully logged in.</Text>
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#dc3545" // Red for logout
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
});