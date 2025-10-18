import { useState, useEffect } from 'react';
import { getRecentTransactions } from '../services/transactions';
import { Transaction } from '../types';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getRecentTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};
