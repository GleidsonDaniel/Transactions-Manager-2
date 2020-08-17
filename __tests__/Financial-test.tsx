import React from 'react';
import Financial from '../src/screens/Financial';

import {darkColorTheme} from '@/styles/colors';
import {ThemeProvider} from 'styled-components/native';

import {expect, it} from '@jest/globals';
import {translate} from '@/locales';

import {render, act, fireEvent} from '@testing-library/react-native';

const MockedComponent: React.FC = () => (
  <ThemeProvider theme={darkColorTheme}>
    <Financial />
  </ThemeProvider>
);

it('init and cancel an transaction', async () => {
  const app = render(<MockedComponent />);
  await act(async () => {});

  const newTransactionText = await app.findByTestId('newTransactionText');
  expect(newTransactionText.props.children).toEqual('Nova transação');

  const newTransactionButton = await app.findByTestId('newTransactionButton');
  expect(newTransactionButton).toBeTruthy();
  await fireEvent.press(newTransactionButton);

  const cancelText = await app.findByTestId('cancelText');
  expect(cancelText.props.children).toEqual(translate('cancel'));

  const cancelButton = await app.findByTestId('cancelButton');
  expect(cancelButton).toBeTruthy();
  await fireEvent.press(cancelButton);

  expect(app).toBeTruthy();
});

it('make an transaction', async () => {
  const app = render(<MockedComponent />);
  await act(async () => {});

  const newTransactionText = await app.findByTestId('newTransactionText');
  expect(newTransactionText.props.children).toEqual('Nova transação');

  const newTransactionButton = await app.findByTestId('newTransactionButton');
  expect(newTransactionButton).toBeTruthy();
  await fireEvent.press(newTransactionButton);

  const cpfInput = await app.findByTestId('cpfInput');

  // Error
  act(() => fireEvent.changeText(cpfInput, '75799839152'));
  const cpfErrorInput = await app.findByTestId('cpfInputError');
  expect(cpfErrorInput.props.children).toEqual(translate('cpfInvalid'));

  // Success
  fireEvent.changeText(cpfInput, '75799839153');
  expect(cpfInput.props.value).toEqual('757.998.391-53');
  expect(cpfErrorInput === null || undefined);

  expect(app).toBeTruthy();

  // ToBe continue...
});
