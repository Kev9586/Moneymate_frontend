import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Placeholder for AccountDetailScreen — accepts `id` from route params until real implementation is ready.

type AccountDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AccountDetail'
>;

type Props = {
  route: AccountDetailScreenRouteProp;
};

const AccountDetailScreen: React.FC<Props> = ({ route }) => {
  // The 'id' param is expected, but might be undefined if not passed.
  // Using '??' to provide a fallback value for display.
  const { id } = route.params ?? { id: 'Not Provided' };

  return (
    <View style={styles.container}>
      <Title>Account Detail Screen</Title>
      <Text>Details for account ID: {id}</Text>
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

export default AccountDetailScreen;
