import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import useAuthStore from '../store/authStore';

const AppUnlockScreen = () => {
  const [pin, setPin] = useState('');
  const { setUnlocked } = useAuthStore();

  const handleUnlock = () => {
    // In a real app, you would use the PIN to decrypt the stored credentials
    if (pin === '1234') {
      setUnlocked(true);
    } else {
      Alert.alert('Error', 'Invalid PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <TextInput
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
      />
      <Button title="Unlock" onPress={handleUnlock} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AppUnlockScreen;
