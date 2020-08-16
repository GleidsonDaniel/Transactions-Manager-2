import React from 'react';

import {logo} from '@/assets';
import {translate} from '@/locales';
import {typeRoutes} from '@/routes/types';
import {BasicContainer, Button, ButtonText, Logo} from '@/styles/baseStyles';

import {AlreadyHaveButton, AlreadyHaveText, Presentation} from './styles';

const Starter: React.FC = ({navigation}) => {
  return (
    <BasicContainer>
      <Logo source={logo} size={200} />
      <Presentation>{translate('presentationText')}</Presentation>
      <Button
        testID="initialButton"
        onPress={() => navigation.navigate(typeRoutes.register)}>
        <ButtonText testID="initialText">{translate('initial')}</ButtonText>
      </Button>
      <AlreadyHaveButton onPress={() => navigation.navigate(typeRoutes.login)}>
        <AlreadyHaveText>{translate('haveAccount')}</AlreadyHaveText>
      </AlreadyHaveButton>
    </BasicContainer>
  );
};

export default Starter;
