import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AccountService} from '../../services/AccountService';

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  bankName?: string;
  lastSync?: string;
}

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async () => {
    const response = await AccountService.getAccounts();
    return response;
  },
);

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async (accountData: Omit<Account, 'id'>) => {
    const response = await AccountService.createAccount(accountData);
    return response;
  },
);

export const updateAccount = createAsyncThunk(
  'accounts/updateAccount',
  async (accountData: Account) => {
    const response = await AccountService.updateAccount(accountData);
    return response;
  },
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (accountId: string) => {
    await AccountService.deleteAccount(accountId);
    return accountId;
  },
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<Account | null>) => {
      state.selectedAccount = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAccounts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const index = state.accounts.findIndex(
          acc => acc.id === action.payload.id,
        );
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(
          acc => acc.id !== action.payload,
        );
      });
  },
});

export const {setSelectedAccount, clearError} = accountSlice.actions;
export default accountSlice.reducer;
