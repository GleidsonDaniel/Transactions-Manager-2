import React from 'react';
import styled from 'styled-components/native';

import {translate} from '@/locales';
import {BasicContainer, Button, ButtonText, Logo} from '@/styles/baseStyles';

import {typeRoutes} from '@/routes/types';
import AsyncStorage from '@react-native-community/async-storage';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Config: React.FC = ({navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate(typeRoutes.preload);
  };
  return (
    <BasicContainer>
      <Container>
        <Button testID="logoutButton" onPress={handleLogout}>
          <ButtonText testID="logoutText">{translate('logout')}</ButtonText>
        </Button>
      </Container>
    </BasicContainer>
  );
};

export default Config;
