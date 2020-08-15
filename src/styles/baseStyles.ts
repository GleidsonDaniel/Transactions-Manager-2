import styled from 'styled-components/native';

export const BasicContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const FlexContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AppName = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-SemiBold';
  font-weight: 600;
  font-size: 26px;
`;

export const AppButton = styled.Button`
  color: ${props => props.theme.primary_light};
`;

interface ILogo {
  size?: number;
}

export const Logo = styled.Image<ILogo>`
  width: ${({size}) => (size ? `${size}px` : '200px')};
  height: ${({size}) => (size ? `${size}px` : '200px')};
`;

export const Button = styled.TouchableOpacity`
  border-radius: 4px;
  width: 100%;
  background: ${({theme}) => theme.primary_light};
  padding: 18px 0;
`;

export const ButtonText = styled.Text`
  font-family: 'SourceSansPro-Regular';
  color: ${({theme}) => theme.primary_text};
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;
