import React from 'react';
import {
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  ColorValue,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface MoneyMateThemeWrapperProps {
  children: React.ReactNode;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  scrollEnabled?: boolean;
  snackbar?: React.ReactNode;
}

const MoneyMateThemeWrapper: React.FC<MoneyMateThemeWrapperProps> = ({
  children,
  gradientColors = ['#4c1d95', '#1e3a8a'],
  scrollEnabled = true,
  snackbar,
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {scrollEnabled ? (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  paddingHorizontal: responsiveWidth(7),
                  paddingVertical: responsiveHeight(4),
                }}
              >
                {children}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: responsiveWidth(7),
                  paddingVertical: responsiveHeight(4),
                }}
              >
                {children}
              </View>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {snackbar}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MoneyMateThemeWrapper;
