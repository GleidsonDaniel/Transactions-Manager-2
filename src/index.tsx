import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import FlashMessage from 'react-native-flash-message';

import {ThemeProvider} from 'styled-components/native';
import {UserProvider} from './contexts/user';
import Routes from './routes';
import {darkColorTheme} from './styles/colors';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={darkColorTheme}>
        <Routes />
        <FlashMessage position="top" />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
