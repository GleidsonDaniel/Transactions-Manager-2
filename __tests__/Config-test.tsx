import React from 'react';
import Config from '../src/screens/Config';

import {render, act, fireEvent} from '@testing-library/react-native';

import {darkColorTheme} from '@/styles/colors';
import {ThemeProvider} from 'styled-components/native';

import {expect, it} from '@jest/globals';
import {translate} from '@/locales';

const MockedComponent: React.FC = () => (
  <ThemeProvider theme={darkColorTheme}>
    <Config />
  </ThemeProvider>
);

it('renders app correctly', async () => {
  const app = render(<MockedComponent />);

  const logoutText = await app.findByTestId('logoutText');
  expect(logoutText.props.children).toEqual(translate('logout'));

  const logoutButton = await app.findByTestId('logoutButton');
  expect(logoutButton).toBeTruthy();

  expect(app).toBeTruthy();
});
