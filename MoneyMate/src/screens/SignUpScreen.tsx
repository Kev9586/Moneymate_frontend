import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { sendOtp, signup } from '../services/auth';
import useAuthStore from '../store/authStore';
import OTPModal from '../components/OTPModal';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { login } = useAuthStore();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      await sendOtp(getValues('email'));
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (otp: string) => {
    setLoading(true);
    try {
      const response = await signup({ ...getValues(), otp });
      login(response.data.token);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      <Button
        title={loading ? 'Loading...' : 'Sign Up'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      <OTPModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onOtpSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default SignUpScreen;
