import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {typeRoutes} from './types';

import Preload from './Preload';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen name={typeRoutes.preload} component={Preload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
