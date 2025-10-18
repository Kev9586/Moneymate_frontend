import { useState, useEffect, useCallback } from 'react';
import { getTransactionsByAccount } from '../services/transactions';
import { Transaction } from '../types';

export const useTransactionsByAccount = (accountId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTransactionsByAccount(accountId);
      setTransactions(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId, fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
};
