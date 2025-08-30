import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import accountSlice from './slices/accountSlice';
import transactionSlice from './slices/transactionSlice';
import budgetSlice from './slices/budgetSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    accounts: accountSlice,
    transactions: transactionSlice,
    budgets: budgetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
