// src/screens/ReminderScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications'; // npm install expo-notifications
import DateTimePicker from '@react-native-community/datetimepicker'; // npm install @react-native-community/datetimepicker

// Configure notifications for Expo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ReminderScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminderText, setNewReminderText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Request notification permissions when the component mounts
    registerForPushNotificationsAsync();
    // Listen for notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
      // You can do something here when a notification comes in
    });
    return () => Notifications.removeNotificationSubscription(subscription);
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable notification permissions in your phone settings to receive reminders.');
      return false;
    }
    return true;
  };

  const scheduleLocalNotification = async (reminderId, title, body, date) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: date, // Directly use the Date object for scheduling
    });
    Alert.alert("Reminder Set", `"${title}" scheduled for ${date.toLocaleString()}`);
  };

  const addReminder = async () => {
    if (newReminderText && selectedDate) {
      const reminderId = Date.now().toString();
      const newReminder = {
        id: reminderId,
        text: newReminderText,
        time: selectedDate,
        status: 'pending' // You could add logic for 'completed' later
      };
      setReminders([...reminders, newReminder]);
      setNewReminderText('');
      setSelectedDate(new Date()); // Reset date picker

      await scheduleLocalNotification(reminderId, "MedAI Reminder", newReminderText, selectedDate);

    } else {
      Alert.alert("Error", "Please enter reminder text and set a time.");
    }
  };

  const deleteReminder = (id) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
            setReminders(reminders.filter(reminder => reminder.id !== id));
            Notifications.cancelScheduledNotificationAsync(id); // Cancel scheduled notification
        }}
      ]
    );
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios'); // Hide picker on Android after selection
    setSelectedDate(currentDate);
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <View>
        <Text style={styles.reminderText}>{item.text}</Text>
        <Text style={styles.reminderTime}>{item.time.toLocaleString()}</Text>
      </View>
      <Button title="Delete" onPress={() => deleteReminder(item.id)} color="#ff6347" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminders</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="New Reminder Text"
          value={newReminderText}
          onChangeText={setNewReminderText}
        />
        <Button onPress={() => setShowDatePicker(true)} title="Set Date & Time" />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()} // Can't set reminders in the past
          />
        )}
        <Text style={{ marginTop: 10 }}>Selected Time: {selectedDate.toLocaleString()}</Text>
        <Button title="Add Reminder" onPress={addReminder} style={{ marginTop: 10 }} />
      </View>

      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.reminderList}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No reminders set yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  reminderList: {
    flex: 1,
    width: '100%',
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reminderTime: {
    fontSize: 16,
    color: '#555',
  },
});

export default ReminderScreen;