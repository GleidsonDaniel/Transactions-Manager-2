import styled from 'styled-components/native';

export const CancelButton = styled.TouchableOpacity`
  padding: 0px 20px;
`;

export const CancelText = styled.Text`
  font-family: 'SourceSansPro-Regular';
  color: ${({theme}) => theme.primary_light};
  font-size: 15px;
  line-height: 20px;
  margin-top: 30px;
  text-align: center;
`;

export const PaddingContainer = styled.View`
  padding: 20px 0px;
  width: 100%;
`;
