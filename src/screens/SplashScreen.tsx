import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {RootStackParamList} from '../navigation/AppNavigator';
import {AuthService} from '../services/AuthService';
import EncryptedStorage from 'react-native-encrypted-storage';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: logoScale.value}],
    opacity: logoOpacity.value,
  }));

  useEffect(() => {
    // Start animations
    logoScale.value = withSpring(1, {damping: 15});
    logoOpacity.value = withTiming(1, {duration: 1000});

    // Check authentication status after animation
    const checkAuthStatus = async () => {
      setTimeout(async () => {
        try {
          const token = await AuthService.getStoredToken();
          const isFirstLaunch = await EncryptedStorage.getItem('isFirstLaunch');

          if (isFirstLaunch === null) {
            // First time opening the app
            await EncryptedStorage.setItem('isFirstLaunch', 'false');
            navigation.replace('Onboarding');
          } else if (token) {
            // User is logged in
            navigation.replace('Main');
          } else {
            // User needs to authenticate
            navigation.replace('Auth');
          }
        } catch (error) {
          console.log('Auth check error:', error);
          navigation.replace('Auth');
        }
      }, 2000);
    };

    checkAuthStatus();
  }, [navigation, logoScale, logoOpacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>💰</Text>
        </View>
        <Text style={styles.appName}>MoneyMate</Text>
        <Text style={styles.tagline}>Your Personal Finance Assistant</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default SplashScreen;
