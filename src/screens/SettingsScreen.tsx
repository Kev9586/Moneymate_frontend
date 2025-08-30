import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/authSlice';
import {AppDispatch, RootState} from '../store';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Title>Settings</Title>
      <Text>Welcome, {user?.name || 'User'}!</Text>
      <Text>Settings and profile management coming soon...</Text>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#E17055',
  },
});

export default SettingsScreen;
