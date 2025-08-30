module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs/toolkit|react-native-paper|react-native-vector-icons|react-native-reanimated|react-native-encrypted-storage|react-native-svg|react-native-svg-charts|react-native-worklets|react-native-screens|react-native-safe-area-context|@react-navigation)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/types/**/*',
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
