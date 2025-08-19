// screens/MyProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure you have this installed
import { useNavigation } from '@react-navigation/native'; // Make sure you have this installed

const MyProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [userName, setUserName] = useState('Shourjyo Chakraborty');
  const [userEmail, setUserEmail] = useState('shourjyo.chakraborty@example.com');
  const [userPhone, setUserPhone] = useState('987-654-3210');
  const [userBio, setUserBio] = useState('Enthusiastic developer working on MedAI project.');

  const saveProfile = () => {
    // Here you would typically save this data to a database or local storage
    Alert.alert("Profile Saved", "Your profile information has been updated!");
    console.log("Saving profile:", { userName, userEmail, userPhone, userBio });
  };

  // --- New Logout Function ---
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              // You might also want to clear other user-specific data from AsyncStorage
              console.log('User logged out. Token removed.');
              // After logout, navigate back to the Login screen.
              // 'replace' ensures the user can't go back to the app content using the back button.
              navigation.replace('Login'); 
            } catch (e) {
              console.error('Failed to remove token from storage', e);
              Alert.alert("Logout Error", "Could not log out. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.textInput}
          value={userEmail}
          onChangeText={setUserEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.textInput}
          value={userPhone}
          onChangeText={setUserPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={[styles.textInput, styles.bioInput]}
          value={userBio}
          onChangeText={setUserBio}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
        />

        <Button title="Save Profile" onPress={saveProfile} />
        
        {/* --- Logout Button Added Here --- */}
        <View style={{ marginTop: 30, width: '100%' }}>
            <Button title="Logout" onPress={handleLogout} color="#ff6347" />
        </View>
        {/* --- End Logout Button --- */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  profileSection: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#555',
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top', // For multiline input to start text at top
    paddingVertical: 10,
  },
});

export default MyProfileScreen;