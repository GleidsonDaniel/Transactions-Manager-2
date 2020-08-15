import styled from 'styled-components/native';

import {colors} from '@/styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: center;
`;

export const AppName = styled.Text`
  color: ${colors.primary_light};
  font-family: 'SourceSansPro-SemiBold';
  font-weight: 600;
  font-size: 26px;
`;

export const Logo = styled.Image`
  width: 200px;
`;
