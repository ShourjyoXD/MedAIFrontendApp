import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // You'll need to install this if you haven't

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove the stored token
      // You might also want to clear any user-specific state or global contexts here
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.replace('Login'); // Go back to login screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Could not log out. Please try again.');
    }
  };

  // Placeholder functions for navigating to other features
  const navigateToHealthRecords = () => {
    Alert.alert('Feature', 'Navigating to Health Records (Screen not yet built)!');
    // In a real app: navigation.navigate('HealthRecords');
  };

  const navigateToEmergencyContacts = () => {
    Alert.alert('Feature', 'Navigating to Emergency Contacts (Screen not yet built)!');
    // In a real app: navigation.navigate('EmergencyContacts');
  };

  const navigateToReminders = () => {
    Alert.alert('Feature', 'Navigating to Medical Reminders (Screen not yet built)!');
    // In a real app: navigation.navigate('MedicalReminders');
  };

  const navigateToProfile = () => {
    Alert.alert('Feature', 'Navigating to User Profile (Screen not yet built)!');
    // In a real app: navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to MedAI!</Text>
      <Text style={styles.subtitleText}>Your Personal Health Assistant</Text>

      <View style={styles.featuresGrid}>
        <TouchableOpacity style={styles.featureCard} onPress={navigateToHealthRecords}>
          <Ionicons name="document-text-outline" size={40} color="#007bff" />
          <Text style={styles.featureCardText}>Health Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={navigateToEmergencyContacts}>
          <Ionicons name="people-outline" size={40} color="#28a745" />
          <Text style={styles.featureCardText}>Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={navigateToReminders}>
          <Ionicons name="notifications-outline" size={40} color="#ffc107" />
          <Text style={styles.featureCardText}>Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={navigateToProfile}>
          <Ionicons name="person-circle-outline" size={40} color="#6f42c1" />
          <Text style={styles.featureCardText}>My Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    width: '45%', // Roughly half width for two columns
    aspectRatio: 1, // Makes the card square
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    margin: '2.5%', // Spacing between cards
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  featureCardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Red color for logout
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});