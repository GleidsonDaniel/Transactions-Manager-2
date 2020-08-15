import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {typeRoutes} from './types';

import Preload from '@/screens/Preload';
import Starter from '@/screens/Starter';
import Home from '@/screens/Home';
import Register from '@/screens/Register';
import Login from '@/screens/Login';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={typeRoutes.preload}>
        <Stack.Screen
          name={typeRoutes.preload}
          component={Preload}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={typeRoutes.starter}
          component={Starter}
          options={{headerShown: false}}
        />
        <Stack.Screen name={typeRoutes.home} component={Home} />
        <Stack.Screen name={typeRoutes.register} component={Register} />
        <Stack.Screen name={typeRoutes.login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
