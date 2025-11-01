import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';
import ScreenWrapper from '../components/ScreenWrapper';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setToken, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<'green' | 'red'>('green');

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const showSnackbar = (message: string, color: 'green' | 'red') => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (token) navigation.navigate('Dashboard');
  }, [token]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', data);
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      showSnackbar('Login Successful', 'green');
      navigation.navigate('Dashboard');
    } catch (error: any) {
      if (error.response?.status === 401) {
        showSnackbar('Invalid email or password.', 'red');
      } else {
        showSnackbar('An unexpected error occurred.', 'red');
      }
    }
    setLoading(false);
  };

  return (
    <ScreenWrapper
      snackbar={
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={{
            backgroundColor: snackbarColor === 'green' ? '#4CAF50' : '#F44336',
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
        className="items-center"
      >
        <Text
          style={{
            fontSize: responsiveFontSize(3.2),
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          MoneyMate
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            color: 'rgba(255,255,255,0.7)',
            marginTop: 8,
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          Securely Log In
        </Text>
      </MotiView>

      {/* --- Email Field --- */}
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required.',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address.' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 4,
                marginBottom: 8,
              }}
            >
              <MaterialCommunityIcons
                name="account"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email or Username"
                placeholderTextColor="rgba(255,255,255,0.5)"
                error={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  height: responsiveFontSize(5.2),
                  color: 'white',
                }}
              />
            </View>
          )}
        />
        {errors.email && (
          <Text style={{ color: '#ff6b6b', marginLeft: 6, marginBottom: 6 }}>
            {errors.email.message}
          </Text>
        )}
      </MotiView>

      {/* --- Password Field --- */}
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
      >
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 4,
                marginBottom: 8,
              }}
            >
              <MaterialCommunityIcons
                name="lock"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.5)"
                error={!!errors.password}
                secureTextEntry={!showPassword}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  height: responsiveFontSize(5.2),
                  color: 'white',
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(3)}
                  color="rgba(255,255,255,0.8)"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <Text style={{ color: '#ff6b6b', marginLeft: 6, marginBottom: 6 }}>
            {errors.password.message}
          </Text>
        )}
      </MotiView>

      {/* Forgot Password */}
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 12 }}>
        <Text style={{ color: 'rgba(255,255,255,0.8)', textDecorationLine: 'underline' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* --- Login Button --- */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
      >
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={loading}
          style={{
            backgroundColor: '#2563eb',
            borderRadius: 16,
            paddingVertical: 8,
            marginTop: 6,
          }}
          labelStyle={{
            color: 'white',
            fontWeight: '600',
            fontSize: responsiveFontSize(2),
          }}
        >
          Login
        </Button>
      </MotiView>

      {/* --- Create Account Link --- */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
