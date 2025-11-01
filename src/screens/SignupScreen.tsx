import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { AxiosError } from 'axios';
import apiClient from '../api/apiClient';
import ScreenWrapper from '../components/ScreenWrapper';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  OtpVerify: { email: string };
};

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface SignupFormData {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    watch,
  } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      await apiClient.post('/auth/signup', data);
      showSnackbar('Please verify your OTP.', 'green');
      navigation.navigate('OtpVerify', { email: data.email });
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status === 409) {
        showSnackbar('Account already exists.', 'red');
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
        style={{ marginBottom: responsiveHeight(3), alignItems: 'center' }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: responsiveFontSize(3),
            textAlign: 'center',
          }}
        >
          Create Account
        </Text>
      </MotiView>

      <View style={{ marginBottom: responsiveHeight(2) }}>
        {/* Username */}
        <Controller
          control={control}
          name="username"
          rules={{
            required: 'Username is required.',
            minLength: { value: 3, message: 'At least 3 characters.' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: responsiveWidth(3),
                marginTop: responsiveHeight(1),
              }}
            >
              <MaterialCommunityIcons
                name="account"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.username}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: responsiveHeight(6),
                  fontSize: responsiveFontSize(1.8),
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
            </View>
          )}
        />
        {errors.username && (
          <Text style={{ color: '#F87171', marginLeft: responsiveWidth(2) }}>
            {errors.username.message}
          </Text>
        )}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required.',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email.' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: responsiveWidth(3),
                marginTop: responsiveHeight(2),
              }}
            >
              <MaterialCommunityIcons
                name="email"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                placeholder="Email ID"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: responsiveHeight(6),
                  fontSize: responsiveFontSize(1.8),
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
            </View>
          )}
        />
        {errors.email && (
          <Text style={{ color: '#F87171', marginLeft: responsiveWidth(2) }}>
            {errors.email.message}
          </Text>
        )}

        {/* Phone */}
        <Controller
          control={control}
          name="phone_number"
          rules={{
            required: 'Phone number is required.',
            pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid number.' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: responsiveWidth(3),
                marginTop: responsiveHeight(2),
              }}
            >
              <MaterialCommunityIcons
                name="phone"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.phone_number}
                keyboardType="phone-pad"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: responsiveHeight(6),
                  fontSize: responsiveFontSize(1.8),
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
            </View>
          )}
        />
        {errors.phone_number && (
          <Text style={{ color: '#F87171', marginLeft: responsiveWidth(2) }}>
            {errors.phone_number.message}
          </Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required.',
            minLength: { value: 8, message: 'At least 8 characters.' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: responsiveWidth(3),
                marginTop: responsiveHeight(2),
              }}
            >
              <MaterialCommunityIcons
                name="lock"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
                secureTextEntry={!showPassword}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.password}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: responsiveHeight(6),
                  fontSize: responsiveFontSize(1.8),
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(3)}
                  color="rgba(255,255,255,0.7)"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <Text style={{ color: '#F87171', marginLeft: responsiveWidth(2) }}>
            {errors.password.message}
          </Text>
        )}

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirm_password"
          rules={{
            required: 'Confirm your password.',
            validate: (value) => value === password || 'Passwords do not match.',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: responsiveWidth(3),
                marginTop: responsiveHeight(2),
              }}
            >
              <MaterialCommunityIcons
                name="lock-check"
                size={responsiveFontSize(3)}
                color="rgba(255,255,255,0.8)"
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
                secureTextEntry={!showConfirmPassword}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.confirm_password}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: responsiveHeight(6),
                  fontSize: responsiveFontSize(1.8),
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(3)}
                  color="rgba(255,255,255,0.7)"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.confirm_password && (
          <Text style={{ color: '#F87171', marginLeft: responsiveWidth(2) }}>
            {errors.confirm_password.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        style={{ marginTop: responsiveHeight(3) }}
      >
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={loading}
          style={{
            borderRadius: responsiveWidth(5),
            paddingVertical: responsiveHeight(1.5),
            backgroundColor: '#2563EB',
          }}
          labelStyle={{
            color: 'white',
            fontWeight: '600',
            fontSize: responsiveFontSize(2),
          }}
        >
          Sign Up
        </Button>
      </MotiView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: responsiveHeight(3),
        }}
      >
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
