// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './api/axiosInstance'; // Make sure this path is correct and axiosInstance is properly configured

// --- React Navigation Imports ---
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import for Tab Navigator
import { Ionicons } from '@expo/vector-icons'; // For icons in the tab bar

// --- Screen Imports ---
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// Import your new main screens
import HealthRecordsScreen from './screens/HealthRecordsScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import ReminderScreen from './screens/ReminderScreen';
import MyProfileScreen from './screens/MyProfileScreen';
// If you still have a 'HomeScreen.js' and want to use it for something else, keep it.
// Otherwise, the TabNavigator effectively replaces the main 'Home' content.


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Initialize Tab Navigator

// --- Main Tab Navigator Component ---
// This component will contain your main app screens accessible via tabs
function MainAppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Health" // Set the default tab when the user logs in
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Health') {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          } else if (route.name === 'Emergency') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (route.name === 'Reminders') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        headerShown: true, // Show header for screens within tabs
        tabBarStyle: { paddingVertical: 5, height: 60 } // Style the tab bar
      })}
    >
      <Tab.Screen
        name="Health"
        component={HealthRecordsScreen}
        options={{ title: 'Health Records' }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyContactsScreen}
        options={{ title: 'Emergency Contacts' }}
      />
      <Tab.Screen
        name="Reminders"
        component={ReminderScreen}
        options={{ title: 'Reminders' }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ title: 'My Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Failed to load token from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? "MainApp" : "Login"}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* The 'Home' screen is now replaced by MainAppTabs */}
        <Stack.Screen
          name="MainApp" // This will be the name of your Tab Navigator in the stack
          component={MainAppTabs}
          options={{ headerShown: false }} // Hide header for the tab navigator itself
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  // ... (Your existing styles remain the same)
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0c9fa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#28a745',
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  linkButtonText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});