import React from 'react';

import {KeyboardAvoidingView, LeftHeaderIcon} from '@/components';
import {translate} from '@/locales';
import {BasicContainer, ScrollViewContainer} from '@/styles/baseStyles';

import RegistrationForm from './RegistrationForm';
import {Disclaimer, HeaderContainer} from './styles';

const Register: React.FC = ({navigation}) => {
  return (
    <BasicContainer>
      <HeaderContainer>
        <LeftHeaderIcon navigation={navigation} />
      </HeaderContainer>
      <KeyboardAvoidingView>
        <ScrollViewContainer>
          <Disclaimer>{translate('disclaimer')}</Disclaimer>
          <RegistrationForm navigation={navigation} />
        </ScrollViewContainer>
      </KeyboardAvoidingView>
    </BasicContainer>
  );
};

export default Register;
