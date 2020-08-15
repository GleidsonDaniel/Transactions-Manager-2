import React, {useEffect} from 'react';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {logo} from '@/assets';

import {typeRoutes} from '@/routes/types';
import {BasicContainer, Logo, AppName} from '@/styles/baseStyles';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

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
      return navigation.navigate(typeRoutes.starter);
    }, 1000);
  };

  useEffect(() => {
    handleUserStatus();
  }, []);

  return (
    <BasicContainer>
      <Container>
        <Logo source={logo} resizeMode="contain" />
        <AppName>Transactions Manager</AppName>
      </Container>
    </BasicContainer>
  );
};

export default Preload;
