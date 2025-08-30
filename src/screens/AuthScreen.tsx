import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button, Card, Title, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../navigation/AppNavigator';
import {login, signup} from '../store/slices/authSlice';
import {RootState, AppDispatch} from '../store';

type AuthNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (emailToValidate: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isLoginMode && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (isLoginMode) {
        const result = await dispatch(login({email, password}));
        if (login.fulfilled.match(result)) {
          navigation.replace('Main');
        }
      } else {
        const result = await dispatch(signup({email, password, name}));
        if (signup.fulfilled.match(result)) {
          navigation.replace('Main');
        }
      }
    } catch (authError) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please enter your email address to receive password reset instructions.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Send',
          onPress: () => {
            // Implement forgot password logic
            Alert.alert('Success', 'Password reset email sent!');
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>💰</Text>
          <Title style={styles.title}>
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </Title>
          <Text style={styles.subtitle}>
            {isLoginMode ? 'Sign in to continue' : 'Join MoneyMate today'}
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Card.Content style={styles.formContent}>
            {!isLoginMode && (
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                autoCapitalize="words"
              />
            )}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!emailError}
            />
            <HelperText type="error" visible={!!emailError}>
              {emailError}
            </HelperText>

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
              error={!!passwordError}
            />
            <HelperText type="error" visible={!!passwordError}>
              {passwordError}
            </HelperText>

            {!isLoginMode && (
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
              />
            )}

            {error && (
              <HelperText type="error" visible={true}>
                {error}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
              contentStyle={styles.buttonContent}>
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>

            {isLoginMode && (
              <Button
                mode="text"
                onPress={handleForgotPassword}
                style={styles.forgotButton}>
                Forgot Password?
              </Button>
            )}

            <View style={styles.switchModeContainer}>
              <Text style={styles.switchModeText}>
                {isLoginMode
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              </Text>
              <Button
                mode="text"
                onPress={() => setIsLoginMode(!isLoginMode)}
                compact>
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C5CE7',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  formCard: {
    elevation: 8,
    borderRadius: 16,
  },
  formContent: {
    padding: 20,
  },
  input: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContent: {
    height: 50,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  switchModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchModeText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AuthScreen;
