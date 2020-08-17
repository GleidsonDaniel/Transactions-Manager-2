import React from 'react';
import RegistrationForm from '@/screens/Register/RegistrationForm';

import {render, act, fireEvent} from '@testing-library/react-native';
import {darkColorTheme} from '@/styles/colors';
import {ThemeProvider} from 'styled-components/native';

import {expect, it} from '@jest/globals';
import {translate} from '@/locales';

const MockedComponent: React.FC = () => (
  <ThemeProvider theme={darkColorTheme}>
    <RegistrationForm />
  </ThemeProvider>
);

it('fill all fields until the form is sent, testing errors', async () => {
  const {findByTestId, debug, update} = render(<MockedComponent />);
  const cpfInput = await findByTestId('cpfInput');
  const confirmButton = await findByTestId('confirmButton');

  // Error
  fireEvent.changeText(cpfInput, '75799839152');
  const cpfErrorInput = await findByTestId('cpfInputError');
  expect(cpfErrorInput.props.children).toEqual(translate('cpfInvalid'));

  // Success
  fireEvent.changeText(cpfInput, '75799839153');
  expect(cpfInput.props.value).toEqual('757.998.391-53');
  expect(cpfErrorInput === null || undefined);

  // Change Field
  await act(async () => {
    fireEvent.press(confirmButton);
  });

  const nameInput = await findByTestId('nameInput');

  // Error
  await act(async () => {
    fireEvent.press(confirmButton);
  });
  const nameInputError = await findByTestId('nameInputError');
  expect(nameInputError.props.children).toEqual(translate('mandatory'));

  // Success
  fireEvent.changeText(nameInput, 'Diego');
  expect(nameInput.props.value).toEqual('Diego');

  await act(async () => {
    fireEvent.press(confirmButton);
  });

  const passwordInput = await findByTestId('passwordInput');
  fireEvent.changeText(passwordInput, '123');
  const passwordInputError = await findByTestId('passwordInputError');
  expect(passwordInputError.props.children).toEqual(
    translate('passwordLength'),
  );
  fireEvent.changeText(passwordInput, '123456');

  await act(async () => {
    fireEvent.press(confirmButton);
  });

  const confirmPasswordInput = await findByTestId('confirmPasswordInput');
  fireEvent.changeText(confirmPasswordInput, '123');
  const confirmPasswordInputError = await findByTestId(
    'confirmPasswordInputError',
  );
  expect(confirmPasswordInputError.props.children).toEqual(
    translate('confirmPassword'),
  );
  fireEvent.changeText(confirmPasswordInput, '123456');

  await act(async () => {
    fireEvent.press(confirmButton);
  });
});
