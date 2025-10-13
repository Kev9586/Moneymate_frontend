export type User = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type Account = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  number?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  note?: string;
  date: string;
  linkedAccountId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  type: 'income' | 'expense' | 'transfer';
  isCustom: boolean;
};