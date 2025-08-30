import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {fetchAccounts} from '../store/slices/accountSlice';
import {fetchTransactions} from '../store/slices/transactionSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {accounts} = useSelector((state: RootState) => state.accounts);
  const {transactions} = useSelector((state: RootState) => state.transactions);
  const {user} = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const loadDataFunction = async () => {
      try {
        await Promise.all([
          dispatch(fetchAccounts()),
          dispatch(fetchTransactions({})),
        ]);
      } catch (error) {
        console.log('Error loading dashboard data:', error);
      }
    };

    loadDataFunction();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(fetchAccounts()),
        dispatch(fetchTransactions({})),
      ]);
    } catch (error) {
      console.log('Error refreshing dashboard data:', error);
    }
    setRefreshing(false);
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getRecentTransactions = () => {
    return transactions.slice(0, 5);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    }
    if (hour < 18) {
      return 'Good Afternoon';
    }
    return 'Good Evening';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {getGreeting()}, {user?.name || 'User'} 👋
        </Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Total Balance Card */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            {formatCurrency(getTotalBalance())}
          </Text>
          <View style={styles.balanceActions}>
            <Button
              mode="contained"
              icon="plus"
              onPress={() => {}}
              style={styles.actionButton}>
              Add Money
            </Button>
            <Button
              mode="outlined"
              icon="send"
              onPress={() => {}}
              style={styles.actionButton}>
              Send Money
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Accounts Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Title>Accounts</Title>
          <Button mode="text" onPress={() => {}}>
            View All
          </Button>
        </View>

        {accounts.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accounts.slice(0, 3).map(account => (
              <Card key={account.id} style={styles.accountCard}>
                <Card.Content>
                  <View style={styles.accountHeader}>
                    <Icon name="account-balance" size={24} color="#6C5CE7" />
                    <Text style={styles.accountName}>{account.name}</Text>
                  </View>
                  <Text style={styles.accountBalance}>
                    {formatCurrency(account.balance)}
                  </Text>
                  <Text style={styles.accountType}>{account.type}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Icon name="account-balance" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No accounts linked</Text>
              <Button mode="contained" onPress={() => {}}>
                Add Account
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Title>Recent Transactions</Title>
          <Button mode="text" onPress={() => {}}>
            View All
          </Button>
        </View>

        {getRecentTransactions().length > 0 ? (
          getRecentTransactions().map(transaction => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <Card.Content>
                <View style={styles.transactionRow}>
                  <View style={styles.transactionLeft}>
                    <Icon
                      name={
                        transaction.type === 'income'
                          ? 'arrow-downward'
                          : 'arrow-upward'
                      }
                      size={24}
                      color={
                        transaction.type === 'income' ? '#00B894' : '#E17055'
                      }
                    />
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionCategory}>
                        {transaction.category}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.type === 'income'
                          ? styles.incomeAmount
                          : styles.expenseAmount,
                      ]}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Icon name="receipt" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No transactions yet</Text>
              <Button mode="contained" onPress={() => {}}>
                Add Transaction
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Title>Quick Actions</Title>
        <View style={styles.quickActions}>
          <Button
            mode="outlined"
            icon="receipt"
            onPress={() => {}}
            style={styles.quickActionButton}>
            Add Transaction
          </Button>
          <Button
            mode="outlined"
            icon="account-balance"
            onPress={() => {}}
            style={styles.quickActionButton}>
            Add Account
          </Button>
          <Button
            mode="outlined"
            icon="bar-chart"
            onPress={() => {}}
            style={styles.quickActionButton}>
            View Reports
          </Button>
          <Button
            mode="outlined"
            icon="flag"
            onPress={() => {}}
            style={styles.quickActionButton}>
            Set Goal
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6C5CE7',
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  balanceCard: {
    margin: 20,
    marginTop: -30,
    elevation: 8,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountCard: {
    width: 200,
    marginRight: 12,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  accountBalance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  accountType: {
    fontSize: 14,
    color: '#636e72',
    textTransform: 'capitalize',
  },
  transactionCard: {
    marginBottom: 8,
    elevation: 1,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionDetails: {
    marginLeft: 12,
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  transactionCategory: {
    fontSize: 14,
    color: '#636e72',
    textTransform: 'capitalize',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#00B894',
  },
  expenseAmount: {
    color: '#E17055',
  },
  transactionDate: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 2,
  },
  emptyCard: {
    elevation: 1,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#636e72',
    marginVertical: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '45%',
  },
});

export default DashboardScreen;
