export const PersonSchema = {
  name: 'Person',
  primaryKey: 'cpf',
  properties: {
    name: {type: 'string', required: true},
    cpf: {type: 'int', required: true},
    password: {type: 'int', required: true},
    balance: {type: 'int', default: 1000, required: false},
    id: 'string',
  },
};

export interface IUser {
  name: string;
  cpf: number;
  password: number;
}

export const TransactionSchema = {
  name: 'Transaction',
  primaryKey: 'id',
  properties: {
    senderCpf: {type: 'int', required: true},
    receiverCpf: {type: 'int', required: true},
    value: 'int',
    description: 'string',
    id: 'string',
    //Normally server date
    date: 'date',
  },
};

export interface ITransaction {
  senderCpf: number;
  receiverCpf: number;
  description: string;
  value: number;
}
