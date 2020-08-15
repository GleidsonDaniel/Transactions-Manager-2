import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import Routes from './routes';
import {darkColorTheme} from './styles/colors';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkColorTheme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
