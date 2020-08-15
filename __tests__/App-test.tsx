import React from 'react';
import App from '../src';

import {render, act} from '@testing-library/react-native';

it('renders app correctly', async () => {
  const {debug} = render(<App />);
  await act(async () => {});
  debug();
});
