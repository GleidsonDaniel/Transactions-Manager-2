import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {typeRoutes} from './types';

import Preload from '@/screens/Preload';
import Initial from '@/screens/Initial';
import Home from '@/screens/Home';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name={typeRoutes.preload}
          component={Preload}
          options={{headerShown: false}}
        />
        <Stack.Screen name={typeRoutes.initial} component={Initial} />
        <Stack.Screen name={typeRoutes.home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
