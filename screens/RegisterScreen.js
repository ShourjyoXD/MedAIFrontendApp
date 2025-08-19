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
import axiosInstance from '../api/axiosInstance'; // Adjust path if needed

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emergencyContact1, setEmergencyContact1] = useState('');
    const [emergencyContact2, setEmergencyContact2] = useState('');
    const [emergencyContact3, setEmergencyContact3] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
      setLoading(true);
      setMessage('');
      try {
        const response = await axiosInstance.post('/auth/register', {
          email,
          password,
          phoneNumber,
          emergencyContact1,
          emergencyContact2,
          emergencyContact3: emergencyContact3 || undefined,
          role: 'user',
        });
        setMessage(`Registration successful! Welcome, ${response.data.data.user.email}`);
        Alert.alert('Success', 'User registered successfully! Please log in.');

        navigation.replace('Login'); 

      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        let errorMessage = 'An unexpected error occurred during registration.';
        if (error.response && error.response.data && error.response.data.error) {
          if (typeof error.response.data.error === 'string') {
            errorMessage = error.response.data.error;
          } else if (Array.isArray(error.response.data.error)) {
            errorMessage = error.response.data.error.join('\n');
          }
        } else if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        setMessage(`Error: ${errorMessage}`);
        Alert.alert('Registration Failed', errorMessage);
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
          <Text style={styles.title}>MedAI Register</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., john.doe@example.com"
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
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Your 10-digit phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              maxLength={10}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact 1:</Text>
            <TextInput
              style={styles.input}
              placeholder="Required contact number"
              value={emergencyContact1}
              onChangeText={setEmergencyContact1}
              keyboardType="numeric"
              maxLength={10}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact 2:</Text>
            <TextInput
              style={styles.input}
              placeholder="Optional contact number"
              value={emergencyContact2}
              onChangeText={setEmergencyContact2}
              keyboardType="numeric"
              maxLength={10}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact 3:</Text>
            <TextInput
              style={styles.input}
              placeholder="Optional contact number"
              value={emergencyContact3}
              onChangeText={setEmergencyContact3}
              keyboardType="numeric"
              maxLength={10}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.linkButtonText}>Already have an account? Login here.</Text>
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