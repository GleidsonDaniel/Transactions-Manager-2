import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {colors} from '@/styles/colors';

const Container = styled.View`
  padding: 0px 10px;
`;

const LeftHeaderIcon: React.FC = () => {
  const {goBack} = useNavigation();
  return (
    <TouchableWithoutFeedback
      hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
      onPress={() => goBack()}>
      <Container>
        <Icon name="chevron-left" size={20} color={colors.primary_light} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LeftHeaderIcon;
