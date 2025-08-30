import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {TransactionService} from '../../services/TransactionService';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  accountId: string;
  type: 'income' | 'expense';
}

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    accountId?: string;
  };
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
  filters: {},
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (filters?: any) => {
    const response = await TransactionService.getTransactions(filters);
    return response;
  },
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData: Omit<Transaction, 'id'>) => {
    const response =
      await TransactionService.createTransaction(transactionData);
    return response;
  },
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (transactionData: Transaction) => {
    const response =
      await TransactionService.updateTransaction(transactionData);
    return response;
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId: string) => {
    await TransactionService.deleteTransaction(transactionId);
    return transactionId;
  },
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          t => t.id === action.payload.id,
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          t => t.id !== action.payload,
        );
      });
  },
});

export const {setFilters, clearError} = transactionSlice.actions;
export default transactionSlice.reducer;
