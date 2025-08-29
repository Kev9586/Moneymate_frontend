import {apiClient} from './ApiClient';
import {Transaction} from '../store/slices/transactionSlice';

export interface TransactionFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  accountId?: string;
  type?: 'income' | 'expense';
  limit?: number;
  offset?: number;
}

export class TransactionService {
  static async getTransactions(
    filters?: TransactionFilters,
  ): Promise<Transaction[]> {
    try {
      const response = await apiClient.get<{transactions: Transaction[]}>(
        '/transactions',
        filters,
      );
      return response.transactions || [];
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch transactions',
      );
    }
  }

  static async getTransaction(id: string): Promise<Transaction> {
    try {
      const response = await apiClient.get<{transaction: Transaction}>(
        `/transactions/${id}`,
      );
      return response.transaction;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch transaction',
      );
    }
  }

  static async createTransaction(
    transactionData: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    try {
      const response = await apiClient.post<{transaction: Transaction}>(
        '/transactions',
        transactionData,
      );
      return response.transaction;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create transaction',
      );
    }
  }

  static async updateTransaction(
    transactionData: Transaction,
  ): Promise<Transaction> {
    try {
      const response = await apiClient.put<{transaction: Transaction}>(
        `/transactions/${transactionData.id}`,
        transactionData,
      );
      return response.transaction;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update transaction',
      );
    }
  }

  static async deleteTransaction(id: string): Promise<void> {
    try {
      await apiClient.delete(`/transactions/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete transaction',
      );
    }
  }

  static async getTransactionsByAccount(
    accountId: string,
    filters?: TransactionFilters,
  ): Promise<Transaction[]> {
    try {
      const response = await apiClient.get<{transactions: Transaction[]}>(
        `/accounts/${accountId}/transactions`,
        filters,
      );
      return response.transactions || [];
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch account transactions',
      );
    }
  }

  static async getTransactionSummary(filters?: TransactionFilters): Promise<{
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    transactionCount: number;
  }> {
    try {
      const response = await apiClient.get<{
        totalIncome: number;
        totalExpense: number;
        netAmount: number;
        transactionCount: number;
      }>('/transactions/summary', filters);
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch transaction summary',
      );
    }
  }
}
