# Missing API Endpoints

Based on the frontend implementation and the comprehensive feature set outlined in the master prompt, the following API endpoints may be missing or need to be implemented to fully support the MoneyMate application functionality.

## Authentication Endpoints

### ✅ Existing (Assumed)

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### 🚨 Missing

- `POST /auth/logout` - Logout user and invalidate token
- `POST /auth/forgot-password` - Send password reset email
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/verify-email` - Verify email address
- `GET /auth/profile` - Get current user profile
- `PUT /auth/profile` - Update user profile

**Request/Response Schemas:**

```typescript
// POST /auth/logout
interface LogoutRequest {
  // Usually just requires Authorization header
}
interface LogoutResponse {
  message: string;
}

// POST /auth/forgot-password
interface ForgotPasswordRequest {
  email: string;
}
interface ForgotPasswordResponse {
  message: string;
}

// POST /auth/reset-password
interface ResetPasswordRequest {
  token: string;
  password: string;
}
interface ResetPasswordResponse {
  message: string;
}

// POST /auth/refresh-token
interface RefreshTokenRequest {
  refreshToken: string;
}
interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}
```

## Account Management Endpoints

### ✅ Existing (Assumed)

- `GET /accounts` - Get user accounts
- `POST /accounts` - Create new account
- `GET /accounts/:id` - Get specific account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

### 🚨 Missing

- `POST /accounts/:id/sync` - Sync account with bank
- `GET /accounts/:id/balance-history` - Get balance history
- `PUT /accounts/:id/status` - Enable/disable account
- `GET /accounts/types` - Get available account types

**Request/Response Schemas:**

```typescript
// POST /accounts/:id/sync
interface SyncAccountResponse {
  account: Account;
  transactionsAdded: number;
  lastSync: string;
}

// GET /accounts/:id/balance-history
interface BalanceHistoryRequest {
  dateFrom?: string;
  dateTo?: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}
interface BalanceHistoryResponse {
  history: Array<{
    date: string;
    balance: number;
  }>;
}
```

## Transaction Endpoints

### ✅ Existing (Assumed)

- `GET /transactions` - Get transactions with filters
- `POST /transactions` - Create transaction
- `GET /transactions/:id` - Get specific transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### 🚨 Missing

- `GET /transactions/summary` - Get transaction summary/analytics
- `GET /transactions/categories` - Get transaction categories
- `POST /transactions/categories` - Create custom category
- `GET /accounts/:id/transactions` - Get transactions for specific account
- `POST /transactions/bulk` - Bulk import transactions
- `GET /transactions/recurring` - Get recurring transactions
- `POST /transactions/recurring` - Create recurring transaction
- `GET /transactions/export` - Export transactions (CSV/PDF)

**Request/Response Schemas:**

```typescript
// GET /transactions/summary
interface TransactionSummaryRequest {
  dateFrom?: string;
  dateTo?: string;
  accountId?: string;
  category?: string;
}
interface TransactionSummaryResponse {
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  transactionCount: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expense: number;
  }>;
}

// GET /transactions/categories
interface CategoryResponse {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    type: 'income' | 'expense';
    isCustom: boolean;
  }>;
}

// POST /transactions/bulk
interface BulkImportRequest {
  transactions: Array<{
    amount: number;
    description: string;
    category: string;
    date: string;
    accountId: string;
    type: 'income' | 'expense';
  }>;
}
interface BulkImportResponse {
  imported: number;
  failed: number;
  errors?: Array<{
    row: number;
    error: string;
  }>;
}
```

## Budget Management Endpoints

### ✅ Existing (Assumed)

- `GET /budgets` - Get user budgets
- `POST /budgets` - Create budget
- `PUT /budgets/:id` - Update budget
- `DELETE /budgets/:id` - Delete budget

### 🚨 Missing

- `GET /budgets/:id/progress` - Get budget progress details
- `GET /budgets/alerts` - Get budget alerts/notifications
- `POST /budgets/:id/reset` - Reset budget period
- `GET /budgets/templates` - Get budget templates

**Request/Response Schemas:**

```typescript
// GET /budgets/:id/progress
interface BudgetProgressResponse {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
  daysRemaining: number;
  averageDailySpend: number;
  projectedTotal: number;
  transactions: Transaction[];
}

// GET /budgets/alerts
interface BudgetAlertsResponse {
  alerts: Array<{
    budgetId: string;
    budgetName: string;
    type: 'warning' | 'exceeded' | 'approaching';
    percentage: number;
    message: string;
    createdAt: string;
  }>;
}
```

## Goals Management Endpoints

### ✅ Existing (Assumed)

- `GET /goals` - Get user goals
- `POST /goals` - Create goal
- `PUT /goals/:id` - Update goal
- `DELETE /goals/:id` - Delete goal

### 🚨 Missing

- `POST /goals/:id/progress` - Update goal progress
- `GET /goals/:id/progress-history` - Get progress history
- `POST /goals/:id/auto-save` - Set up automatic savings
- `GET /goals/templates` - Get goal templates

**Request/Response Schemas:**

```typescript
// POST /goals/:id/progress
interface GoalProgressRequest {
  amount: number;
  note?: string;
}
interface GoalProgressResponse {
  goal: Goal;
  progressEntry: {
    id: string;
    amount: number;
    date: string;
    note?: string;
  };
}

// GET /goals/:id/progress-history
interface ProgressHistoryResponse {
  entries: Array<{
    id: string;
    amount: number;
    date: string;
    note?: string;
    runningTotal: number;
  }>;
}
```

## Reports and Analytics Endpoints

### 🚨 Missing (Completely New)

- `GET /reports/overview` - Dashboard overview data
- `GET /reports/spending-trends` - Spending trend analysis
- `GET /reports/income-analysis` - Income analysis
- `GET /reports/category-breakdown` - Category-wise breakdown
- `GET /reports/monthly-comparison` - Month-over-month comparison
- `GET /reports/net-worth` - Net worth calculation
- `GET /reports/cash-flow` - Cash flow analysis
- `POST /reports/custom` - Generate custom report
- `GET /reports/export/:reportId` - Export generated report

**Request/Response Schemas:**

```typescript
// GET /reports/overview
interface OverviewReportResponse {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  topCategories: Array<{
    category: string;
    amount: number;
    change: number; // percentage change from previous period
  }>;
  recentTransactions: Transaction[];
  budgetAlerts: number;
  goalProgress: Array<{
    goalName: string;
    percentage: number;
  }>;
}

// GET /reports/spending-trends
interface SpendingTrendsRequest {
  period: 'weekly' | 'monthly' | 'yearly';
  dateFrom?: string;
  dateTo?: string;
}
interface SpendingTrendsResponse {
  trends: Array<{
    period: string;
    totalSpent: number;
    categoryBreakdown: Record<string, number>;
    change: number;
  }>;
  insights: Array<{
    type: 'increase' | 'decrease' | 'pattern';
    message: string;
    category?: string;
  }>;
}
```

## Notification Endpoints

### 🚨 Missing (Completely New)

- `GET /notifications` - Get user notifications
- `POST /notifications/mark-read` - Mark notifications as read
- `PUT /notifications/preferences` - Update notification preferences
- `POST /notifications/test` - Send test notification
- `GET /notifications/types` - Get available notification types

**Request/Response Schemas:**

```typescript
// GET /notifications
interface NotificationsResponse {
  notifications: Array<{
    id: string;
    type: 'budget_alert' | 'goal_progress' | 'transaction' | 'sync_complete';
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    data?: Record<string, any>; // Additional data for deep linking
  }>;
  unreadCount: number;
}

// PUT /notifications/preferences
interface NotificationPreferencesRequest {
  budgetAlerts: boolean;
  goalReminders: boolean;
  transactionNotifications: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
}
```

## Settings and Preferences Endpoints

### 🚨 Missing (Completely New)

- `GET /settings/preferences` - Get user preferences
- `PUT /settings/preferences` - Update user preferences
- `GET /settings/security` - Get security settings
- `PUT /settings/security` - Update security settings
- `POST /settings/backup` - Create data backup
- `POST /settings/restore` - Restore from backup
- `DELETE /settings/account` - Delete user account

**Request/Response Schemas:**

```typescript
// GET /settings/preferences
interface UserPreferencesResponse {
  currency: string;
  locale: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationPreferences;
  privacy: {
    shareAnalytics: boolean;
    biometricAuth: boolean;
  };
}

// POST /settings/backup
interface BackupResponse {
  backupId: string;
  url: string;
  createdAt: string;
  size: number;
}
```

## File and Media Endpoints

### 🚨 Missing (Completely New)

- `POST /uploads/receipt` - Upload receipt image
- `GET /uploads/:id` - Get uploaded file
- `DELETE /uploads/:id` - Delete uploaded file
- `POST /uploads/profile-picture` - Upload profile picture

**Request/Response Schemas:**

```typescript
// POST /uploads/receipt
interface ReceiptUploadRequest {
  file: File; // multipart/form-data
  transactionId?: string;
}
interface ReceiptUploadResponse {
  id: string;
  url: string;
  extractedData?: {
    amount?: number;
    merchant?: string;
    date?: string;
    category?: string;
  };
}
```

## Search and Filter Endpoints

### 🚨 Missing (Completely New)

- `GET /search/transactions` - Advanced transaction search
- `GET /search/global` - Global search across all entities
- `GET /filters/saved` - Get saved search filters
- `POST /filters/saved` - Save search filter

**Request/Response Schemas:**

```typescript
// GET /search/transactions
interface TransactionSearchRequest {
  query?: string;
  filters: {
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
    categories?: string[];
    accounts?: string[];
    type?: 'income' | 'expense';
  };
  sort?: {
    field: 'date' | 'amount' | 'description';
    order: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    limit: number;
  };
}
interface TransactionSearchResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
  facets: {
    categories: Array<{name: string; count: number}>;
    accounts: Array<{name: string; count: number}>;
    dateRanges: Array<{range: string; count: number}>;
  };
}
```

## Integration Endpoints

### 🚨 Missing (Completely New)

- `GET /integrations/banks` - Get available bank integrations
- `POST /integrations/banks/connect` - Connect bank account
- `GET /integrations/banks/status` - Get integration status
- `POST /integrations/banks/disconnect` - Disconnect bank
- `POST /integrations/import/csv` - Import from CSV file
- `GET /integrations/export/formats` - Get available export formats

**Request/Response Schemas:**

```typescript
// GET /integrations/banks
interface BankIntegrationsResponse {
  banks: Array<{
    id: string;
    name: string;
    logo: string;
    isSupported: boolean;
    requirements: string[];
  }>;
}

// POST /integrations/banks/connect
interface BankConnectionRequest {
  bankId: string;
  credentials: Record<string, string>;
}
interface BankConnectionResponse {
  connectionId: string;
  status: 'pending' | 'connected' | 'failed';
  accounts: Account[];
}
```

## Admin/System Endpoints

### 🚨 Missing (Completely New)

- `GET /system/health` - System health check
- `GET /system/version` - Get API version info
- `GET /system/features` - Get enabled features
- `POST /system/feedback` - Submit user feedback
- `GET /system/maintenance` - Get maintenance status

## Summary

**Total Missing Endpoints: ~60**

### Priority Levels:

**High Priority (Core Functionality):**

1. Authentication (logout, password reset)
2. Transaction summary and analytics
3. Budget progress and alerts
4. Basic reports and dashboard data
5. Notification system

**Medium Priority (Enhanced Features):**

1. Advanced search and filtering
2. File uploads and receipt management
3. Bank integrations
4. Goal progress tracking
5. User preferences and settings

**Low Priority (Nice to Have):**

1. Custom report generation
2. Advanced analytics
3. Data backup and restore
4. Admin and system endpoints
5. Feedback and support systems

These endpoints should be implemented based on the priority and the specific requirements of the MoneyMate application. The schemas provided serve as a starting point and can be adjusted based on the actual implementation needs.
