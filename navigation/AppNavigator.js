// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- ADJUSTED IMPORTS HERE ---
import HealthRecordsScreen from '../screens/HealthRecordsScreen';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';
import ReminderScreen from '../screens/ReminderScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
// -----------------------------

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Health"
      screenOptions={({ route }) => ({
        headerShown: false,
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
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Health" component={HealthRecordsScreen} options={{ title: 'Health Records' }} />
      <Tab.Screen name="Emergency" component={EmergencyContactsScreen} options={{ title: 'Emergency Contacts' }} />
      <Tab.Screen name="Reminders" component={ReminderScreen} options={{ title: 'Reminders' }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ title: 'My Profile' }} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;