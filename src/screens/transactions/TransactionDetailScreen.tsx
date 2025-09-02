import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Placeholder for TransactionDetailScreen — accepts `id` from route params until real implementation is ready.

type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetail'
>;

type Props = {
  route: TransactionDetailScreenRouteProp;
};

const TransactionDetailScreen: React.FC<Props> = ({ route }) => {
  // The 'id' param is expected, but might be undefined if not passed.
  const { id } = route.params ?? { id: 'Not Provided' };

  return (
    <View style={styles.container}>
      <Title>Transaction Detail Screen</Title>
      <Text>Details for transaction ID: {id}</Text>
      <Text>Full implementation coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default TransactionDetailScreen;
