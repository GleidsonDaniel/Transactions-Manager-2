import React from 'react';

import {KeyboardAvoidingView, LeftHeaderIcon} from '@/components';
import {translate} from '@/locales';
import {BasicContainer, ScrollViewContainer} from '@/styles/baseStyles';

import RegistrationForm from './RegistrationForm';
import {Disclaimer, HeaderContainer} from './styles';

const Register: React.FC = () => {
  return (
    <BasicContainer>
      <HeaderContainer>
        <LeftHeaderIcon />
      </HeaderContainer>
      <KeyboardAvoidingView>
        <ScrollViewContainer>
          <Disclaimer>{translate('disclaimer')}</Disclaimer>
          <RegistrationForm />
        </ScrollViewContainer>
      </KeyboardAvoidingView>
    </BasicContainer>
  );
};

export default Register;
