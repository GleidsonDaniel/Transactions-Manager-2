import React from 'react';
import App from '../src';

import {render, act, waitFor, fireEvent} from '@testing-library/react-native';

it('preload flow', async () => {
  const app = render(<App />);

  await act(async () => {
    await waitFor(() => app.getByTestId('initialText'));
  });

  const initialButton = await app.findByTestId('initialButton');
  fireEvent.press(initialButton);

  await act(async () => {
    await waitFor(() => app.getByTestId('leftHeaderIcon'));
  });

  const leftHeaderIcon = await app.findByTestId('leftHeaderIcon');
  fireEvent.press(leftHeaderIcon);

  await act(async () => {
    await waitFor(() => app.getByTestId('initialText'));
  });
});
