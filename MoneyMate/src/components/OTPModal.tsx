import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import Button from './Button';
import TextInput from './TextInput';

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const OTPModal = ({ visible, onClose, onSubmit }: OTPModalProps) => {
  const [otp, setOtp] = useState('');

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify" onPress={() => onSubmit(otp)} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
});

export default OTPModal;
