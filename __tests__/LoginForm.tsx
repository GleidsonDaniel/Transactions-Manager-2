import React from 'react';

import {render, act, fireEvent} from '@testing-library/react-native';
import {darkColorTheme} from '@/styles/colors';
import {ThemeProvider} from 'styled-components/native';

import {expect, it} from '@jest/globals';
import {translate} from '@/locales';
import LoginForm from '@/screens/Login/LoginForm';

const MockedComponent: React.FC = () => (
  <ThemeProvider theme={darkColorTheme}>
    <LoginForm />
  </ThemeProvider>
);

it('fill all fields until the form is sent, testing errors', async () => {
  const {findByTestId, debug, update} = render(<MockedComponent />);
  const cpfInput = await findByTestId('cpfInput');

  // Error
  fireEvent.changeText(cpfInput, '75799839152');
  const cpfErrorInput = await findByTestId('cpfInputError');
  expect(cpfErrorInput.props.children).toEqual(translate('cpfInvalid'));

  // Success
  fireEvent.changeText(cpfInput, '75799839153');
  expect(cpfInput.props.value).toEqual('757.998.391-53');
  expect(cpfErrorInput === null || undefined);

  const passwordInput = await findByTestId('passwordInput');
  fireEvent.changeText(passwordInput, '123');
  const passwordInputError = await findByTestId('passwordInputError');
  expect(passwordInputError.props.children).toEqual(
    translate('passwordLength'),
  );
  fireEvent.changeText(passwordInput, '123456');

  const confirmButton = await findByTestId('confirmButton');

  await act(async () => {
    fireEvent.press(confirmButton);
  });
});
