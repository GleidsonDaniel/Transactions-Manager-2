import React from 'react';

import {KeyboardAvoidingView, LeftHeaderIcon} from '@/components';
import {BasicContainer, ScrollViewContainer, Logo} from '@/styles/baseStyles';

import {HeaderContainer, LogoContainer} from './styles';
import {logo} from '@/assets';

import LoginForm from './LoginForm';

const Register: React.FC = ({navigation}) => {
  return (
    <BasicContainer>
      <HeaderContainer>
        <LeftHeaderIcon navigation={navigation} />
      </HeaderContainer>
      <KeyboardAvoidingView>
        <ScrollViewContainer>
          <LogoContainer>
            <Logo source={logo} size={150} />
          </LogoContainer>
          <LoginForm navigation={navigation} />
        </ScrollViewContainer>
      </KeyboardAvoidingView>
    </BasicContainer>
  );
};

export default Register;
