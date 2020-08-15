import React from 'react';

import {logo} from '@/assets';
import {translate} from '@/locales';
import {BasicContainer, Button, ButtonText, Logo} from '@/styles/baseStyles';

import {AlreadyHaveButton, AlreadyHaveText, Presentation} from './styles';
import {useNavigation} from '@react-navigation/native';
import {typeRoutes} from '@/routes/types';

const Starter: React.FC = () => {
  const {navigate} = useNavigation();
  return (
    <BasicContainer>
      <Logo source={logo} size={200} resizeMode="contain" />
      <Presentation>{translate('presentationText')}</Presentation>
      <Button onPress={() => navigate(typeRoutes.register)}>
        <ButtonText>{translate('initial')}</ButtonText>
      </Button>
      <AlreadyHaveButton onPress={() => navigate(typeRoutes.login)}>
        <AlreadyHaveText>{translate('haveAccount')}</AlreadyHaveText>
      </AlreadyHaveButton>
    </BasicContainer>
  );
};

export default Starter;
