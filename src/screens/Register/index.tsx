import React from 'react';

import {KeyboardAvoidingView, LeftHeaderIcon} from '@/components';
import {translate} from '@/locales';
import {BasicContainer} from '@/styles/baseStyles';

import RegistrationForm from './RegistrationForm';
import {Container, Disclaimer, HeaderContainer} from './styles';

const Register: React.FC = () => {
  return (
    <BasicContainer>
      <HeaderContainer>
        <LeftHeaderIcon />
      </HeaderContainer>
      <KeyboardAvoidingView>
        <Container>
          <Disclaimer>{translate('disclaimer')}</Disclaimer>
          <RegistrationForm />
        </Container>
      </KeyboardAvoidingView>
    </BasicContainer>
  );
};

export default Register;
