import {CommonActions} from '@react-navigation/native';

export const resetAndGo = (route: string) =>
  CommonActions.reset({
    index: 1,
    routes: [{name: route}],
  });
