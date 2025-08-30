/* global jest */
jest.mock('react-native-reanimated', () => ({
  default: {
    createAnimatedComponent: (component) => component,
    useSharedValue: () => ({value: 0}),
    useAnimatedStyle: () => ({}),
    withSpring: (value) => value,
    withTiming: (value) => value,
    call: () => {},
  },
  useSharedValue: () => ({value: 0}),
  useAnimatedStyle: () => ({}),
  withSpring: (value) => value,
  withTiming: (value) => value,
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  }),
}));

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
