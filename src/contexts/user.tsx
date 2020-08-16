import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface User {
  name: string;
  cpf: number;
  password: number;
  balance: number;
  id: string;
}

export interface Transactions {
  senderCpf: number;
  receiverCpf: number;
  value: number;
  description: string;
  id: string;
  date: Date;
}

interface UserContext {
  transactions: Transactions[] | null;
  user: User | null;
  setContextTransactions(transactions: Transactions[]): void;
  setContextUser(user: User): void;
}

const UserContext = createContext<UserContext>({} as UserContext);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transactions[] | null>(null);
  async function setContextTransactions(t: Transactions[]) {
    setTransactions(t);
  }

  async function setContextUser(u: User) {
    await AsyncStorage.setItem('@user', JSON.stringify(u));
    setUser(u);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        transactions,
        setContextUser,
        setContextTransactions,
      }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider.');
  }

  return context;
}

export {UserProvider, useUser};
