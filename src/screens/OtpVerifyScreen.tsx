import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';
import ScreenWrapper from '../components/ScreenWrapper';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  OtpVerify: { email: string };
};

type OtpVerifyScreenRouteProp = RouteProp<RootStackParamList, 'OtpVerify'>;
type OtpVerifyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OtpVerify'
>;

export default function OtpVerifyScreen() {
  const route = useRoute<OtpVerifyScreenRouteProp>();
  const navigation = useNavigation<OtpVerifyScreenNavigationProp>();
  const { setToken } = useAuthStore();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<'green' | 'red'>('green');

  const email = route.params?.email;

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const showSnackbar = (message: string, color: 'green' | 'red') => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
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
    } catch {
      showSnackbar('Invalid or expired OTP.', 'red');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResendDisabled(true);
    try {
      await apiClient.post('/auth/resend-otp', { email });
      showSnackbar('A new OTP has been sent to your email.', 'green');
    } catch {
      showSnackbar('Could not resend OTP.', 'red');
      setResendDisabled(false);
    }
  };

  return (
    <ScreenWrapper
      snackbar={
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={{
            backgroundColor:
              snackbarColor === 'green' ? '#4CAF50' : '#F44336',
          }}
        >
          {snackbarMessage}
        </Snackbar>
      }
    >
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={{ alignItems: 'center' }}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Verify OTP
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginTop: responsiveHeight(1),
            marginBottom: responsiveHeight(4),
          }}
        >
          An OTP has been sent to {email}
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 4,
          }}
        >
          <MaterialCommunityIcons
            name="lock-check"
            size={responsiveFontSize(3)}
            color="rgba(255,255,255,0.8)"
          />
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter 6-digit OTP"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="number-pad"
            maxLength={6}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              height: responsiveFontSize(5.2),
              color: 'white',
              textAlign: 'center',
            }}
          />
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
      >
        <Button
          mode="contained"
          onPress={handleVerify}
          disabled={loading || otp.length !== 6}
          loading={loading}
          style={{
            backgroundColor: '#2563eb',
            borderRadius: 16,
            paddingVertical: 8,
            marginTop: responsiveHeight(3),
          }}
          labelStyle={{
            color: 'white',
            fontWeight: '600',
            fontSize: responsiveFontSize(2),
          }}
        >
          Verify
        </Button>
      </MotiView>

      <TouchableOpacity
        onPress={handleResend}
        disabled={resendDisabled}
        style={{
          marginTop: responsiveHeight(2),
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            color: resendDisabled
              ? 'rgba(255,255,255,0.5)'
              : 'rgba(255,255,255,0.9)',
            fontSize: responsiveFontSize(1.9),
            textDecorationLine: resendDisabled ? 'none' : 'underline',
          }}
        >
          {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
