import React, { useState, useEffect } from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useAuthStore } from '../store/useAuthStore';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const { height } = Dimensions.get('window');
const isSmallScreen = height < 700;

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
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (token) {
      navigation.navigate('Dashboard');
    }
  }, [token, navigation]);

  const onSubmit = async (data: { email: string, password: string }) => {
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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-purple-800 to-indigo-900">
      <LinearGradient
        colors={['#4c1d95', '#1e3a8a']}
        className="flex-1"
      >
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
              }}
            >
              <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                className="items-center"
              >
                <Text
                  style={{ fontSize: responsiveFontSize(4.5) }}
                  className="font-display text-white tracking-light font-bold text-center"
                >
                  MoneyMate
                </Text>
                <Text
                  style={{ fontSize: responsiveFontSize(2) }}
                  className="text-gray-300 font-normal text-center mt-2 mb-8"
                >
                  Securely Log In
                </Text>
              </MotiView>

              <View className="gap-y-5">
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
                      <View className="flex-row items-center gap-x-2 bg-white/15 rounded-xl px-4 py-1 shadow-md shadow-black/30">
                        <MaterialCommunityIcons name="account" size={responsiveFontSize(3)} color="rgba(255,255,255,0.7)" />
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Email or Username"
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
                </MotiView>

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
                </MotiView>

                <TouchableOpacity className="self-end mt-1">
                  <Text className="text-gray-300 text-sm underline">Forgot Password?</Text>
                </TouchableOpacity>

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
                    className="bg-blue-600 rounded-2xl py-2 mt-4 shadow-md"
                    labelStyle={{
                      fontSize: responsiveFontSize(2.2),
                      color: 'white',
                      fontWeight: '600',
                    }}
                  >
                    Login
                  </Button>
                </MotiView>

                <View className="flex-row justify-center mt-6">
                  <Text className="text-gray-300 text-base">Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text className="font-bold text-white text-base">Create Account</Text>
                  </TouchableOpacity>
                </View>
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
