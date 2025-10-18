import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedBalanceProps {
  balance: number;
}

const AnimatedBalance = ({ balance }: AnimatedBalanceProps) => {
  const animatedBalance = useSharedValue(0);

  useEffect(() => {
    animatedBalance.value = withTiming(balance, { duration: 500 });
  }, [balance]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `$${animatedBalance.value.toFixed(2)}`,
    };
  });

  return <AnimatedTextInput animatedProps={animatedProps} editable={false} />;
};

export default AnimatedBalance;
