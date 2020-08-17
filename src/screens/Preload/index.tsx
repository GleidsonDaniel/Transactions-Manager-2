import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';

import {logo} from '@/assets';
import {useUser} from '@/contexts/user';
import {resetAndGo} from '@/helpers/resetScreen';
import {typeRoutes} from '@/routes/types';
import {AppName, BasicContainer, Logo} from '@/styles/baseStyles';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Preload: React.FC = ({navigation}) => {
  const {setContextUser, setContextTransactions} = useUser();
  const handleUserStatus = async () => {
    const user = await AsyncStorage.getItem('@user');
    const transactions = await AsyncStorage.getItem('@transactions');
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
