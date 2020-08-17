import React, {useState} from 'react';
import styled from 'styled-components/native';

import {translate} from '@/locales';
import {BasicContainer, Button, ButtonText} from '@/styles/baseStyles';

import {typeRoutes} from '@/routes/types';
import AsyncStorage from '@react-native-community/async-storage';

import FinancialForm from './FinancialForm';
import {Disclaimer} from '../Register/styles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Financial: React.FC = ({navigation}) => {
  const [financialFormVisible, setFinancialFormVisible] = useState(false);
  return (
    <BasicContainer>
      <Container>
        {financialFormVisible ? (
          <>
            <Disclaimer>{translate('transactionDisclaimer')}</Disclaimer>
            <FinancialForm
              cancelTransaction={() => setFinancialFormVisible(false)}
            />
          </>
        ) : (
          <Button
            testID="newTransactionButton"
            onPress={() => setFinancialFormVisible(!financialFormVisible)}>
            <ButtonText testID="newTransactionText">
              {translate('newTransaction')}
            </ButtonText>
          </Button>
        )}
      </Container>
    </BasicContainer>
  );
};

export default Financial;
