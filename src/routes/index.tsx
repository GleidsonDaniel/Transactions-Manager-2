import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Config from '@/screens/Config';
import Financial from '@/screens/Financial';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Preload from '@/screens/Preload';
import Register from '@/screens/Register';
import Starter from '@/screens/Starter';
import {colors} from '@/styles/colors';

import {typeRoutes} from './types';

function MyTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary_light,
        inactiveTintColor: colors.primary_dark,
        tabStyle: {
          backgroundColor: colors.primary_text,
          borderRadius: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={35} />,
        }}
      />
      <Tab.Screen
        name="Financial"
        component={Financial}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="money" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={35} />,
        }}
      />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen
          name={typeRoutes.home}
          component={MyTabs}
          options={{headerShown: false}}
        />
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
