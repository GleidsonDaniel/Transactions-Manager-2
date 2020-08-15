import React from 'react';
import {View, Text} from 'react-native';

import {translate} from '../locales';

const Preload: React.FC = () => {
  return (
    <View>
      <Text>{translate('hello')}</Text>
      <Text>Olá</Text>
    </View>
  );
};

export default Preload;
