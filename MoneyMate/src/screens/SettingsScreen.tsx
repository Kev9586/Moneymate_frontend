import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Button from '../components/Button';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import { useTheme } from '@react-navigation/native';
import { useUser } from '../hooks/useUser';

const SettingsScreen = () => {
  const { logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { colors } = useTheme();
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        <Text style={[styles.email, { color: colors.text }]}>{user?.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profile: {
    marginBottom: 32,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;
