import styled from 'styled-components/native';

export const HeaderContainer = styled.View``;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  flex: 1;
`;

export const Disclaimer = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  padding: 80px 30px;
`;

export const PaddingContainer = styled.View`
  padding: 20px 0px;
  width: 100%;
`;
