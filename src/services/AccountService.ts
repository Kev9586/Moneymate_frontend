import {apiClient} from './ApiClient';
import {Account} from '../store/slices/accountSlice';

export class AccountService {
  static async getAccounts(): Promise<Account[]> {
    try {
      const response = await apiClient.get<{accounts: Account[]}>('/accounts');
      return response.accounts || [];
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch accounts',
      );
    }
  }

  static async getAccount(id: string): Promise<Account> {
    try {
      const response = await apiClient.get<{account: Account}>(
        `/accounts/${id}`,
      );
      return response.account;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch account',
      );
    }
  }

  static async createAccount(
    accountData: Omit<Account, 'id'>,
  ): Promise<Account> {
    try {
      const response = await apiClient.post<{account: Account}>(
        '/accounts',
        accountData,
      );
      return response.account;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create account',
      );
    }
  }

  static async updateAccount(accountData: Account): Promise<Account> {
    try {
      const response = await apiClient.put<{account: Account}>(
        `/accounts/${accountData.id}`,
        accountData,
      );
      return response.account;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update account',
      );
    }
  }

  static async deleteAccount(id: string): Promise<void> {
    try {
      await apiClient.delete(`/accounts/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete account',
      );
    }
  }

  static async syncAccount(id: string): Promise<Account> {
    try {
      const response = await apiClient.post<{account: Account}>(
        `/accounts/${id}/sync`,
      );
      return response.account;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to sync account',
      );
    }
  }
}
