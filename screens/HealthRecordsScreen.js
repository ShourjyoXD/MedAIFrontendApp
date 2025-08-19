// screens/HealthRecordsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Make sure you have axios installed: npm install axios

// >>> IMPORTANT: REPLACE 'YOUR_COMPUTER_LOCAL_IP_ADDRESS' WITH YOUR ACTUAL LOCAL IP ADDRESS <<<
// Example: 'http://192.168.1.10:5000'
const SERVER_URL = 'http://192.168.0.114:5000'; 

const HealthRecordsScreen = ({ navigation }) => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bluetoothStatus, setBluetoothStatus] = useState("Disconnected");

  // --- Simulated Bluetooth Connection ---
  const connectBluetooth = async () => {
    setBluetoothStatus("Connecting...");
    try {
      // In a real project with a specific band, this is where you'd use
      // a Bluetooth LE library (like react-native-ble-plx) to scan, connect,
      // and discover services for a particular smart band.
      // For this project, we're simulating success.

      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate connection delay
      setBluetoothStatus("Connected to Simulated Band");
      Alert.alert("Bluetooth", "Successfully connected to a simulated smart band.");

      // After a simulated connection, automatically try to fetch/send data
      fetchAndSendAssumptionData();

    } catch (error) {
      console.error("Simulated Bluetooth connection error:", error);
      setBluetoothStatus("Connection Failed");
      Alert.alert("Bluetooth Error", "Could not connect to simulated smart band.");
    }
  };

  // --- Method to get "Assumption Data" and send to your server ---
  const fetchAndSendAssumptionData = async () => {
    setLoading(true);
    try {
      // Generate some random "assumption data"
      const simulatedData = {
        steps: Math.floor(Math.random() * 10000) + 2000, // 2000-11999 steps
        heartRate: Math.floor(Math.random() * 40) + 60,  // 60-100 bpm
        caloriesBurned: Math.floor(Math.random() * 500) + 100, // 100-599 calories
        timestamp: new Date().toISOString() // Current time in ISO format
      };

      console.log("Simulated Data to send:", simulatedData);

      // Send this data to your backend server
      const response = await axios.post(`${SERVER_URL}/api/healthdata`, simulatedData);
      
      console.log("Data sent to server. Server response:", response.data);

      // Assuming your server sends back the processed data or confirmation
      setHealthData(response.data.processedData || simulatedData); // Display what the server returns, or the raw sent data

    } catch (error) {
      console.error("Error fetching or sending data to server:", error);
      Alert.alert("Data Error", "Could not send health data to server. Make sure your server is running and accessible from your device.");
      setHealthData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  // You can decide if you want to automatically connect/fetch on screen load
  // useEffect(() => {
  //   // Uncomment below if you want to try connecting automatically
  //   // connectBluetooth();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Records (Simulated)</Text>

      <Text style={styles.statusText}>Bluetooth Status: {bluetoothStatus}</Text>
      <Button title="Connect Smart Band (Simulated)" onPress={connectBluetooth} />

      <View style={{ marginVertical: 15 }} /> {/* Spacer */}

      <Button
        title="Get & Send Health Data to Server"
        onPress={fetchAndSendAssumptionData}
        disabled={loading || bluetoothStatus !== "Connected to Simulated Band"} // Disable if not connected or loading
      />

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

      {healthData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Latest Health Data (from Server):</Text>
          <Text style={styles.dataText}>Steps: {healthData.steps}</Text>
          <Text style={styles.dataText}>Heart Rate: {healthData.heartRate} bpm</Text>
          <Text style={styles.dataText}>Calories Burned: {healthData.caloriesBurned}</Text>
          <Text style={styles.dataText}>Last Updated: {new Date(healthData.timestamp).toLocaleTimeString()}</Text>
        </View>
      )}

      <Text style={styles.explanation}>
        *This version simulates smart band connection and sends "assumption data" to your server.
        Direct, universal smart band integration is highly complex and typically done via Google Fit/Apple HealthKit.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  explanation: {
    marginTop: 30,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  }
});

export default HealthRecordsScreen;