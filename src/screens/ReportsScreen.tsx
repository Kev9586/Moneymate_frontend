import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

const ReportsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Title>Reports</Title>
      <Text>Reports and analytics coming soon...</Text>
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

export default ReportsScreen;
