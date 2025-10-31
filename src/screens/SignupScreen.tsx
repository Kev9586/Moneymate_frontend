import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import apiClient from '../api/apiClient';

const { height } = Dimensions.get('window');
const isSmallScreen = height < 700;

export default function SignupScreen() {
  const navigation = useNavigation();
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
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await apiClient.post('/auth/signup', data);
      showSnackbar('Please verify your OTP.', 'green');
      navigation.navigate('OtpVerify', { email: data.email });
    } catch (error) {
      if (error.response?.status === 409) {
        showSnackbar('Account already exists.', 'red');
      } else {
        showSnackbar('An unexpected error occurred.', 'red');
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-purple-800 to-indigo-900">
      <LinearGradient colors={['#4c1d95', '#1e3a8a']} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: isSmallScreen ? responsiveHeight(2) : responsiveHeight(5),
              }}
            >
              <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                className="items-center mb-6"
              >
                <Text
                  style={{ fontSize: responsiveFontSize(4) }}
                  className="font-display text-white tracking-light font-bold text-center"
                >
                  Create Account
                </Text>
              </MotiView>

              <View className="gap-y-4">
                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: 'Username is required.',
                    minLength: { value: 3, message: 'Username must be at least 3 characters.' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                      <MaterialCommunityIcons name="account" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Username"
                        error={!!errors.username}
                        className="flex-1 bg-transparent h-12 text-white"
                        textColor="white"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                      />
                    </View>
                  )}
                />
                {errors.username && <Text className="text-red-400 mt-1 ml-2">{errors.username.message}</Text>}

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email is required.',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address.' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                      <MaterialCommunityIcons name="email" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Email ID"
                        error={!!errors.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="flex-1 bg-transparent h-12 text-white"
                        textColor="white"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                      />
                    </View>
                  )}
                />
                {errors.email && <Text className="text-red-400 mt-1 ml-2">{errors.email.message}</Text>}

                <Controller
                  control={control}
                  name="phone_number"
                  rules={{
                    required: 'Phone number is required.',
                    pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number.' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                      <MaterialCommunityIcons name="phone" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Phone Number"
                        error={!!errors.phone_number}
                        keyboardType="phone-pad"
                        className="flex-1 bg-transparent h-12 text-white"
                        textColor="white"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                      />
                    </View>
                  )}
                />
                {errors.phone_number && <Text className="text-red-400 mt-1 ml-2">{errors.phone_number.message}</Text>}

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Password is required.',
                    minLength: { value: 8, message: 'Password must be at least 8 characters.' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                      <MaterialCommunityIcons name="lock" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Password"
                        error={!!errors.password}
                        secureTextEntry={!showPassword}
                        className="flex-1 bg-transparent h-12 text-white"
                        textColor="white"
                        placeholderTextColor="rgba(255,255,255,0.7)"
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
                {errors.password && <Text className="text-red-400 mt-1 ml-2">{errors.password.message}</Text>}

                <Controller
                  control={control}
                  name="confirm_password"
                  rules={{
                    required: 'Please confirm your password.',
                    validate: (value) => value === password || 'Passwords do not match.',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                      <MaterialCommunityIcons name="lock-check" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Confirm Password"
                        error={!!errors.confirm_password}
                        secureTextEntry={!showConfirmPassword}
                        className="flex-1 bg-transparent h-12 text-white"
                        textColor="white"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                      />
                      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
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
                  <Text className="text-red-400 mt-1 ml-2">{errors.confirm_password.message}</Text>
                )}
              </View>

              <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 500, delay: 100 }}
              >
                <Button
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                  loading={loading}
                  className="bg-blue-600 rounded-2xl py-2 mt-8 shadow-md"
                  labelStyle={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  Sign Up
                </Button>
              </MotiView>

              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-300 text-base">Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text className="font-bold text-white text-base">Sign In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={{ backgroundColor: snackbarColor === 'green' ? '#4CAF50' : '#F44336' }}
        >
          {snackbarMessage}
        </Snackbar>
      </LinearGradient>
    </SafeAreaView>
  );
}