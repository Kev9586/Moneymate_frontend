import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const {width} = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to MoneyMate',
    description:
      'Your personal finance assistant that helps you track expenses, manage budgets, and achieve your financial goals.',
    emoji: '💰',
    color: '#6C5CE7',
  },
  {
    id: 2,
    title: 'Track Your Expenses',
    description:
      'Easily categorize and monitor your spending habits with intuitive charts and insights.',
    emoji: '📊',
    color: '#00B894',
  },
  {
    id: 3,
    title: 'Secure & Private',
    description:
      'Your financial data is encrypted and protected with bank-level security standards.',
    emoji: '🔒',
    color: '#E17055',
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleGetStarted = () => {
    navigation.replace('Auth');
  };

  const renderSlide = (slide: OnboardingSlide) => (
    <View key={slide.id} style={[styles.slide, {backgroundColor: slide.color}]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                currentSlide === index ? 'white' : 'rgba(255,255,255,0.3)',
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {slides.map(renderSlide)}
      </ScrollView>

      {renderDots()}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleGetStarted}
          style={styles.getStartedButton}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}>
          Get Started
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 40,
  },
  getStartedButton: {
    backgroundColor: 'white',
    elevation: 4,
  },
  buttonLabel: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContent: {
    height: 50,
  },
});

export default OnboardingScreen;
