import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Account } from '../types';
import { useNavigation } from '@react-navigation/native';

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() =>
        navigation.navigate('TransactionList', { accountId: account.id })
      }
    >
      <Text style={[styles.name, { color: colors.text }]}>{account.name}</Text>
      <Text style={[styles.balance, { color: colors.text }]}>
        ${account.balance.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 150,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 18,
  },
});

export default AccountCard;
