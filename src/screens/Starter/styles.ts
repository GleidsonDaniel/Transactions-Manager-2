import styled from 'styled-components/native';

export const Presentation = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  padding: 40px 30px;
`;

export const AlreadyHaveButton = styled.TouchableOpacity`
  padding: 0px 20px;
`;

export const AlreadyHaveText = styled.Text`
  font-family: 'SourceSansPro-Regular';
  color: ${({theme}) => theme.primary_light};
  font-size: 15px;
  line-height: 20px;
  margin-top: 30px;
  text-align: center;
`;
