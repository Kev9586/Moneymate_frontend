export const API_CONFIG = {
  BASE_URL: 'https://bank-expense-tracker.onrender.com/api/v1',
  TIMEOUT: 10000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  IS_FIRST_LAUNCH: 'isFirstLaunch',
  THEME_PREFERENCE: 'theme_preference',
  BIOMETRIC_ENABLED: 'biometric_enabled',
};

export const TRANSACTION_CATEGORIES = {
  INCOME: [
    {id: 'salary', name: 'Salary', icon: 'work'},
    {id: 'business', name: 'Business', icon: 'business'},
    {id: 'investment', name: 'Investment', icon: 'trending-up'},
    {id: 'bonus', name: 'Bonus', icon: 'card-giftcard'},
    {id: 'freelance', name: 'Freelance', icon: 'laptop'},
    {id: 'other_income', name: 'Other Income', icon: 'add-circle'},
  ],
  EXPENSE: [
    {id: 'food', name: 'Food & Dining', icon: 'restaurant'},
    {id: 'transport', name: 'Transportation', icon: 'directions-car'},
    {id: 'shopping', name: 'Shopping', icon: 'shopping-cart'},
    {id: 'entertainment', name: 'Entertainment', icon: 'movie'},
    {id: 'bills', name: 'Bills & Utilities', icon: 'receipt'},
    {id: 'healthcare', name: 'Healthcare', icon: 'local-hospital'},
    {id: 'education', name: 'Education', icon: 'school'},
    {id: 'travel', name: 'Travel', icon: 'flight'},
    {id: 'other_expense', name: 'Other Expense', icon: 'remove-circle'},
  ],
};

export const ACCOUNT_TYPES = [
  {id: 'checking', name: 'Checking Account'},
  {id: 'savings', name: 'Savings Account'},
  {id: 'credit_card', name: 'Credit Card'},
  {id: 'cash', name: 'Cash'},
  {id: 'investment', name: 'Investment Account'},
  {id: 'loan', name: 'Loan Account'},
];

export const BUDGET_PERIODS = [
  {id: 'weekly', name: 'Weekly'},
  {id: 'monthly', name: 'Monthly'},
  {id: 'yearly', name: 'Yearly'},
];
