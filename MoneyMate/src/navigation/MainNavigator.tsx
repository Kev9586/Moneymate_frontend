import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import TransactionListScreen from '../screens/TransactionListScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
        options={{ title: 'Transactions' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
