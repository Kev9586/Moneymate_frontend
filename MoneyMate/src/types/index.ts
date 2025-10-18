export interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  account: Account;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
