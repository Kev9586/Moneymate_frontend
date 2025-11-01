import './global.css';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';
import { NativeWindStyleSheet } from "nativewind";

//NativeWindStyleSheet.setOutput({ default: "native" });

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}