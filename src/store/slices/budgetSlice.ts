import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BudgetService} from '../../services/BudgetService';

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: string;
  endDate: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  description?: string;
}

interface BudgetState {
  budgets: Budget[];
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  goals: [],
  isLoading: false,
  error: null,
};

export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async () => {
    const response = await BudgetService.getBudgets();
    return response;
  },
);

export const createBudget = createAsyncThunk(
  'budgets/createBudget',
  async (budgetData: Omit<Budget, 'id' | 'spent'>) => {
    const response = await BudgetService.createBudget(budgetData);
    return response;
  },
);

export const fetchGoals = createAsyncThunk('budgets/fetchGoals', async () => {
  const response = await BudgetService.getGoals();
  return response;
});

export const createGoal = createAsyncThunk(
  'budgets/createGoal',
  async (goalData: Omit<Goal, 'id' | 'currentAmount'>) => {
    const response = await BudgetService.createGoal(goalData);
    return response;
  },
);

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBudgets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch budgets';
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.budgets.push(action.payload);
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      });
  },
});

export const {clearError} = budgetSlice.actions;
export default budgetSlice.reducer;
