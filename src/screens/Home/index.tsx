import React from 'react';
import {View, Text} from 'react-native';

import {translate} from '@/locales';
import {useUser} from '@/contexts/user';

const Preload: React.FC = () => {
  const {user} = useUser();
  return (
    <View>
      <Text>{translate('hello')}</Text>
    </View>
  );
};

export default Preload;
