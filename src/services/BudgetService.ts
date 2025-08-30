import {apiClient} from './ApiClient';
import {Budget, Goal} from '../store/slices/budgetSlice';

export class BudgetService {
  static async getBudgets(): Promise<Budget[]> {
    try {
      const response = await apiClient.get<{budgets: Budget[]}>('/budgets');
      return response.budgets || [];
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch budgets',
      );
    }
  }

  static async createBudget(
    budgetData: Omit<Budget, 'id' | 'spent'>,
  ): Promise<Budget> {
    try {
      const response = await apiClient.post<{budget: Budget}>(
        '/budgets',
        budgetData,
      );
      return response.budget;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create budget',
      );
    }
  }

  static async updateBudget(budgetData: Budget): Promise<Budget> {
    try {
      const response = await apiClient.put<{budget: Budget}>(
        `/budgets/${budgetData.id}`,
        budgetData,
      );
      return response.budget;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update budget',
      );
    }
  }

  static async deleteBudget(id: string): Promise<void> {
    try {
      await apiClient.delete(`/budgets/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete budget',
      );
    }
  }

  static async getGoals(): Promise<Goal[]> {
    try {
      const response = await apiClient.get<{goals: Goal[]}>('/goals');
      return response.goals || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch goals');
    }
  }

  static async createGoal(
    goalData: Omit<Goal, 'id' | 'currentAmount'>,
  ): Promise<Goal> {
    try {
      const response = await apiClient.post<{goal: Goal}>('/goals', goalData);
      return response.goal;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create goal');
    }
  }

  static async updateGoal(goalData: Goal): Promise<Goal> {
    try {
      const response = await apiClient.put<{goal: Goal}>(
        `/goals/${goalData.id}`,
        goalData,
      );
      return response.goal;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update goal');
    }
  }

  static async deleteGoal(id: string): Promise<void> {
    try {
      await apiClient.delete(`/goals/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete goal');
    }
  }

  static async updateGoalProgress(id: string, amount: number): Promise<Goal> {
    try {
      const response = await apiClient.post<{goal: Goal}>(
        `/goals/${id}/progress`,
        {amount},
      );
      return response.goal;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update goal progress',
      );
    }
  }
}
