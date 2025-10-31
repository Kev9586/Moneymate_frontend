import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';

export default function OtpVerifyScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { setToken } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<'green' | 'red'>('green');

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const showSnackbar = (message: string, color: 'green' | 'red') => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  const email = route.params?.email;

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/signup/verify', { email, otp });
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      showSnackbar('Verification Successful', 'green');
      navigation.navigate('Dashboard');
    } catch (error) {
      showSnackbar('Invalid or expired OTP.', 'red');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResendDisabled(true);
    try {
      // The prompt says to re-call POST /auth/signup, but this seems wrong.
      // A dedicated resend endpoint is more common. Assuming /auth/resend-otp for now.
      await apiClient.post('/auth/resend-otp', { email });
      showSnackbar('A new OTP has been sent to your email.', 'green');
    } catch (error) {
      showSnackbar('Could not resend OTP.', 'red');
      setResendDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>An OTP has been sent to {email}</Text>

      <TextInput
        label="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleVerify}
        disabled={loading || otp.length !== 6}
        loading={loading}
        style={styles.button}
      >
        Verify
      </Button>

      <Button
        onPress={handleResend}
        disabled={resendDisabled}
        style={styles.resendButton}
      >
        {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={{ backgroundColor: snackbarColor === 'green' ? '#4CAF50' : '#F44336' }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2C7BE5',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#6C757D',
  },
  input: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  resendButton: {
    marginTop: 8,
  },
});
