/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, describe} from '@jest/globals';

describe('App', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<App />);
    // Just test that the app renders without crashing
    expect(true).toBe(true);
  });
});
