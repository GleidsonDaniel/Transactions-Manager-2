import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {typeRoutes} from './types';

import Preload from '@/screens/Preload';
import Starter from '@/screens/Starter';
import Home from '@/screens/Home';
import Register from '@/screens/Register';
import Login from '@/screens/Login';
import {colors} from '@/styles/colors';

const headerStyle = {
  headerStyle: {
    backgroundColor: colors.background,
    height: 70,
    borderBottomWidth: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
  },
  headerTitleStyle: {
    color: colors.primary_light,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'SourceSansPro-Bold',
  },
};

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
        <Stack.Screen
          name={typeRoutes.register}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={typeRoutes.login}
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
