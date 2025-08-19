// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      // --- THE CRITICAL FIX IS ON THIS LINE ---
      // Changed from 'response.data.data' to 'response.data'
      const { token, user } = response.data; 
      // --- END OF CRITICAL FIX ---

      // Store the token securely using AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      
      // Optionally, store user data as well
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      console.log('Login successful! Token:', token);
      console.log('Logged in user data:', user);

      setMessage(`Login successful! Welcome back, ${user.email}`);
      Alert.alert('Success', 'Logged in successfully!');

      // Navigate to the Home screen on successful login
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      let errorMessage = 'An unexpected error occurred during login.';
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          if (typeof error.response.data.error === 'string') {
            errorMessage = error.response.data.error;
          } else if (Array.isArray(error.response.data.error)) {
            errorMessage = error.response.data.error.join('\n');
          }
        } else if (error.response.data.message) {
          // Fallback for general error messages from backend
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setMessage(`Error: ${errorMessage}`);
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>MedAI Login</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your registered email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register')}
          disabled={loading}
        >
          <Text style={styles.linkButtonText}>Don't have an account? Register here.</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
        backgroundColor: '#a0c9fa', // Lighter blue when disabled
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
        color: '#28a745', // Green for success
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