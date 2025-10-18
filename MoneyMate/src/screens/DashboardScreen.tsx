import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useAccounts } from '../hooks/useAccounts';
import { useTransactions } from '../hooks/useTransactions';
import { useUser } from '../hooks/useUser';
import { useTheme } from '@react-navigation/native';
import AccountCard from '../components/AccountCard';
import TransactionListItem from '../components/TransactionListItem';
import AnimatedBalance from '../components/AnimatedBalance';

const DashboardScreen = () => {
  const { accounts, loading: accountsLoading, error: accountsError } = useAccounts();
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useTransactions();
  const { user, loading: userLoading, error: userError } = useUser();
  const { colors } = useTheme();

  const totalBalance = accounts.reduce(
    (acc, account) => acc + account.balance,
    0
  );

  if (accountsLoading || transactionsLoading || userLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (accountsError || transactionsError || userError) {
    return (
      <View style={styles.container}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          Good Morning, {user?.name}
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Total Balance
        </Text>
        <AnimatedBalance balance={totalBalance} />
      </View>
      <View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Accounts
        </Text>
        <FlatList
          data={accounts}
          renderItem={({ item }) => <AccountCard account={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />
      </View>
      <View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recent Transactions
        </Text>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  cardTitle: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  carousel: {
    paddingLeft: 16,
  },
});

export default DashboardScreen;
