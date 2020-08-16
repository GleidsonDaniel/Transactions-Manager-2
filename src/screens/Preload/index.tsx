import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';

import {logo} from '@/assets';

import {typeRoutes} from '@/routes/types';
import {BasicContainer, Logo, AppName} from '@/styles/baseStyles';
import {resetAndGo} from '@/helpers/resetScreen';
import {useUser} from '@/contexts/user';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Preload: React.FC = ({navigation}) => {
  const {setContextUser} = useUser();
  const handleUserStatus = async () => {
    const user = await AsyncStorage.getItem('@user');
    setTimeout(() => {
      if (!!JSON.parse(user)?.id) {
        setContextUser(JSON.parse(user));
        return navigation.dispatch(resetAndGo(typeRoutes.home));
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
        <Logo source={logo} />
        <AppName>Transactions Manager</AppName>
      </Container>
    </BasicContainer>
  );
};

export default Preload;
