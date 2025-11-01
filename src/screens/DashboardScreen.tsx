import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/useAuthStore';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ScreenWrapper from '../components/ScreenWrapper';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    logout();
    navigation.replace('Login');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: responsiveHeight(3),
    color: '#2C7BE5',
  },
  button: {
    marginTop: responsiveHeight(2),
  },
});