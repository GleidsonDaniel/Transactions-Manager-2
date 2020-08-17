import {TextInputMask} from 'react-native-masked-text';
import styled from 'styled-components/native';

export const BasicContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
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

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})<ILogo>`
  width: ${({size}) => (size ? `${size}px` : '200px')};
  height: ${({size}) => (size ? `${size}px` : '200px')};
  align-self: center;
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

interface IMaskedInput {
  isInvalid?: boolean;
  marginBottom?: number;
}

export const MaskedInput = styled(TextInputMask)<IMaskedInput>`
  padding: 0 16px 9px 16px;
  background: transparent;
  font-size: 25px;
  line-height: 27px;
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.primary_light};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? `${marginBottom}px` : '40px'};
  width: 100%;
  text-align: center;
`;

export const BasicInput = styled.TextInput<IMaskedInput>`
  padding: 0 16px 9px 16px;
  background: transparent;
  font-size: 25px;
  line-height: 27px;
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.primary_light};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? `${marginBottom}px` : '40px'};
  width: 100%;
  text-align: center;
`;

export const ErrorText = styled.Text`
  font-family: 'SourceSansPro-Regular';
  font-size: 12px;
  margin-top: -8px;
  font-weight: bold;
  color: ${({theme}) => theme.red};
  margin-bottom: 8px;
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
})`
  flex: 1;
`;
