import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';

import {useUser} from '@/contexts/user';
import {getAllTransactions} from '@/services/realm';

import {
  BalanceText,
  CardDescription,
  Container,
  DescriptionText,
  FlexContainer,
  RowContainer,
  StyledCard,
  TransactionsDisclaimer,
  ValueContainer,
} from './styles';

const Home: React.FC = () => {
  const {user, transactions, setContextTransactions} = useUser();
  useFocusEffect(
    useCallback(() => {
      if (!!user?.cpf) {
        getAllTransactions(parseInt(user.cpf), t => setContextTransactions(t));
      }
      return () => {};
    }, [transactions]),
  );

  return (
    <FlexContainer>
      <Container>
        <FlatList
          data={transactions?.sort((a, b) => a.valueOf() - b.valueOf()) || []}
          renderItem={({item}) => {
            return (
              <StyledCard receiver={item.receiverCpf === user?.cpf}>
                <RowContainer>
                  <Container>
                    <RowContainer>
                      <CardDescription>
                        {item.receiverCpf === user?.cpf
                          ? 'Recebido  -  '
                          : 'Enviado  -  '}
                      </CardDescription>
                      <CardDescription>
                        {moment(item.date).format('DD/MM/YYYY')}
                      </CardDescription>
                    </RowContainer>

                    <CardDescription>{item.senderCpf}</CardDescription>
                    <CardDescription>{`Mensagem: ${item.description}`}</CardDescription>
                  </Container>
                  <ValueContainer>
                    <CardDescription>{`R$ ${
                      item.value * 0.01
                    }`}</CardDescription>
                  </ValueContainer>
                </RowContainer>
              </StyledCard>
            );
          }}
          ListEmptyComponent={() => null}
          ListHeaderComponent={() => (
            <>
              <DescriptionText>Saldo Disponível</DescriptionText>
              <BalanceText>{`R$ ${
                !!user?.balance ? user.balance * 0.01 : '00.00'
              }`}</BalanceText>

              <TransactionsDisclaimer>Transações</TransactionsDisclaimer>
            </>
          )}
          key={item => item.id}
        />
      </Container>
    </FlexContainer>
  );
};

export default Home;
