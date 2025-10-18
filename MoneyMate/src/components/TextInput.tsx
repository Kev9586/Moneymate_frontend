import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: TextInputProps) => {
  const { colors } = useTheme();

  return (
    <RNTextInput
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.border,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
});

export default TextInput;
