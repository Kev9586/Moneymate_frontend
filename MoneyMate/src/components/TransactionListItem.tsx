import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Transaction } from '../types';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const { colors } = useTheme();
  const amountColor =
    transaction.type === 'income' ? 'green' : colors.text;

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View>
        <Text style={[styles.description, { color: colors.text }]}>
          {transaction.description}
        </Text>
        <Text style={[styles.date, { color: colors.text }]}>
          {transaction.date}
        </Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        ${transaction.amount.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionListItem;
