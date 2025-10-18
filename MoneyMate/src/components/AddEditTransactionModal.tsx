import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from './Button';
import TextInput from './TextInput';
import { Transaction } from '../types';

const schema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
});

type FormData = z.infer<typeof schema>;

interface AddEditTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  transaction?: Transaction;
}

const AddEditTransactionModal = ({
  visible,
  onClose,
  onSubmit,
  transaction,
}: AddEditTransactionModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: transaction?.description || '',
      amount: transaction?.amount || 0,
    },
  });

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>
          {transaction ? 'Edit Transaction' : 'Add Transaction'}
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Amount"
              onBlur={onBlur}
              onChangeText={(text) => onChange(parseFloat(text))}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
        />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default AddEditTransactionModal;
