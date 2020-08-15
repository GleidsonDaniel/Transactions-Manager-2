import React from 'react';

import {logo} from '@/assets';

import {Container, AppName, Logo} from './styles';

const Preload: React.FC = () => {
  return (
    <Container>
      <Logo source={logo} resizeMode="contain" />
      <AppName>Transactions Manager</AppName>
    </Container>
  );
};

export default Preload;
