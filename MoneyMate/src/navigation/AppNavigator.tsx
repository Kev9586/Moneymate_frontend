import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../theme';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import AppUnlockScreen from '../screens/AppUnlockScreen';

const AppNavigator = () => {
  const { theme } = useThemeStore();
  const { isAuthenticated, isUnlocked } = useAuthStore();
  const navigationTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer theme={{ colors: navigationTheme.colors, dark: theme === 'dark' }}>
      {isAuthenticated ? (
        isUnlocked ? (
          <MainNavigator />
        ) : (
          <AppUnlockScreen />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
