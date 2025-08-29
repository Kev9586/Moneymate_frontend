import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6C5CE7"
          translucent={Platform.OS === 'android'}
        />
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
