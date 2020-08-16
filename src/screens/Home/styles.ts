import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const BalanceText = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Bold';
  font-size: 40px;
  text-align: center;
  padding: 15px 0px;
`;

export const TransactionsDisclaimer = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  font-size: 20px;
  text-align: center;
  padding: 15px 0px;
`;

export const DescriptionText = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  font-size: 20px;
  text-align: center;
`;

export const CardDescription = styled.Text`
  color: ${({theme}) => theme.primary_light};
  font-family: 'SourceSansPro-Regular';
  font-size: 15px;
`;

export const StyledCard = styled.View<{receiver: boolean}>`
  background-color: ${({theme, receiver}) =>
    receiver ? theme.green : theme.red};
  width: 97%;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  min-height: 35px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const FlexContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  padding: 16px 16px 0px 16px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;

export const ValueContainer = styled.View`
  justify-content: center;
  padding: 20px 0px;
`;
