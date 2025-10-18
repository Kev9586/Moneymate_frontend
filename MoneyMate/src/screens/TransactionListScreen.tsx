import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTransactionsByAccount } from '../hooks/useTransactionsByAccount';
import TransactionListItem from '../components/TransactionListItem';
import { useTheme } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AddEditTransactionModal from '../components/AddEditTransactionModal';
import { addTransaction } from '../services/transactions';
import { Transaction } from '../types';

const TransactionListScreen = () => {
  const route = useRoute();
  const { accountId } = route.params;
  const {
    transactions,
    loading,
    error,
    refetch,
  } = useTransactionsByAccount(accountId);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const handleAddTransaction = async (data: Omit<Transaction, 'id'>) => {
    try {
      await addTransaction({ ...data, accountId });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setModalVisible(false);
    }
  };

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
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionListItem transaction={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <AddEditTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});

export default TransactionListScreen;
