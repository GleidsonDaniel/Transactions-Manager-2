import React, {useEffect} from 'react';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {logo} from '@/assets';

import {Container, AppName, Logo} from './styles';
import {typeRoutes} from '@/routes/types';

const Preload: React.FC = () => {
  const navigation = useNavigation();
  const {getItem} = useAsyncStorage('@logged');

  const handleUserStatus = async () => {
    const logged = await getItem();
    // simulating loading the API to verify user data
    setTimeout(() => {
      if (!!logged) {
        return navigation.navigate(typeRoutes.home);
      }
      return navigation.navigate(typeRoutes.initial);
    }, 1000);
  };

  useEffect(() => {
    handleUserStatus();
  }, []);

  return (
    <Container>
      <Logo source={logo} resizeMode="contain" />
      <AppName>Transactions Manager</AppName>
    </Container>
  );
};

export default Preload;
