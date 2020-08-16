import Realm from 'realm';
import {v4 as uuidv4} from 'uuid';
import {User, Transactions} from '@/contexts/user';

import {PersonSchema, TransactionSchema, IUser, ITransaction} from './schemas';

export const createUser = async (
  user: IUser,
  onSuccess: (user: User) => void,
) => {
  const data = await Realm.open({schema: [PersonSchema]})
    .then(realm => {
      realm.write(() => {
        realm.create('Person', {
          cpf: user.cpf,
          name: user.name,
          password: user.password,
          id: uuidv4(),
        });
      });
      let users = realm.objects('Person');
      let filteredUser = users.filtered(`cpf = ${user.cpf}`);
      onSuccess(JSON.parse(JSON.stringify(filteredUser[0])));
      realm.close();
      return {success: true, message: 'Cadastro efetuado com sucesso'};
    })
    .catch(error => {
      if (error.message.includes(user.cpf)) {
        return {success: false, message: 'Cpf já cadastrado'};
      }
      return {success: false, message: 'Houve um erro, tente novamente'};
    });
  return data;
};

export const login = async (
  cpf: string,
  password: string,
  onSuccess: (user: User) => void,
) => {
  const data = await Realm.open({schema: [PersonSchema]})
    .then(realm => {
      let users = realm.objects('Person');
      let filteredUser = users.filtered(
        `cpf = ${cpf} && password = ${password}`,
      );
      if (!!filteredUser[0]) {
        onSuccess(JSON.parse(JSON.stringify(filteredUser[0])));
        realm.close();
        return {success: true, message: 'Login efetuado com sucesso'};
      } else {
        realm.close();
        return {success: false, message: 'Cpf ou senha incorretos'};
      }
    })
    .catch(error => {
      return {success: false, message: 'Cpf ou senha incorretos'};
    });
  return data;
};

export const createTransaction = async (
  transaction: ITransaction,
  onSuccess: (user: User, transaction: Transactions[]) => void,
) => {
  const data = await Realm.open({schema: [PersonSchema, TransactionSchema]})
    .then(realm => {
      let person = realm.objects('Person');
      let receiver = person.filtered(`cpf = ${transaction.receiverCpf}`);
      let sender = person.filtered(`cpf = ${transaction.senderCpf}`);
      if (!!receiver[0] && !!sender[0]) {
        realm.write(() => {
          realm.create('Transaction', {
            senderCpf: transaction.senderCpf,
            receiverCpf: transaction.receiverCpf,
            value: transaction.value,
            description: transaction.description,
            id: uuidv4(),
            date: new Date(),
          });
        });
        realm.write(() => {
          realm.create(
            'Person',
            {
              cpf: receiver[0].cpf,
              balance: receiver[0].balance + transaction.value,
            },
            'modified',
          );
        });
        realm.write(() => {
          realm.create(
            'Person',
            {
              cpf: sender[0].cpf,
              balance: sender[0].balance - transaction.value,
            },
            'modified',
          );
        });
        let transactionList = realm.objects('Transaction');
        let filteredTransactionList = transactionList.filtered(
          `senderCpf = ${transaction.senderCpf}`,
        );
        onSuccess(
          JSON.parse(JSON.stringify(sender[0])),
          Array.from(JSON.parse(JSON.stringify(filteredTransactionList))),
        );
        realm.close();
        return {
          success: true,
          message: 'Transação executada com sucesso',
        };
      } else {
        realm.close();
        return {
          success: false,
          message: 'Usuário não encontrado na base de testes',
        };
      }
    })
    .catch(err => {
      return {
        success: false,
        message: 'Houve um erro ao executar a transação, tente novamente',
      };
    });
  return data;
};
