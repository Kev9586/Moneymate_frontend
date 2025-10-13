MoneyMate Backend API 1.0.0 OAS 3.1
[/api/v1/openapi.json](https://bank-expense-tracker.onrender.com/api/v1/openapi.json)

Personal ﬁnance management API with comprehensive expense tracking,
budgeting, and ﬁnancial analytics

> Authorize
>
> Health
>
> Monitoring
>
> GET /metrics Metrics Endpoint
>
> Users
>
> GET /api/v1/me
>
> PUT /api/v1/me
>
> DELETE /api/v1/me

Get Proﬁle

Update Proﬁle

Delete Proﬁle

> Authentication
>
> POST /api/v1/auth/reset-password Reset Password
>
> POST /api/v1/auth/forgot-password Forgot Password
>
> POST /api/v1/auth/signup Signup
>
> POST /api/v1/auth/login Login
>
> POST /api/v1/auth/logout Logout
>
> POST /api/v1/auth/refresh-token Refresh Token
>
> POST /api/v1/auth/verify-email Verify Email
>
> GET /api/v1/auth/profile
>
> PUT /api/v1/auth/profile

Get Proﬁle

Update Proﬁle

> POST /api/v1/auth/resend-email-verification Resend Email Veriﬁcation

Accounts

> POST /api/v1/accounts
>
> GET /api/v1/accounts

Create a New Account

List User Accounts

> GET /api/v1/accounts/{account_id}/transactions Get Transactions for an
> Account
>
> PUT /api/v1/accounts/{account_id}
>
> DELETE /api/v1/accounts/{account_id}

Update an Account

Delete or Archive an Account

Transactions

> GET /api/v1/transactions/summary Get Detailed Transaction Summary
>
> POST /api/v1/transactions Create a New Transaction
>
> PUT /api/v1/transactions/{transaction_id}
>
> DELETE /api/v1/transactions/{transaction_id}

Update a Transaction

Delete a Transaction

> POST /api/v1/transactions/auto Auto Transaction From Sms
>
> POST /api/v1/transactions/import
>
> POST /api/v1/transactions/export

Import Transactions from CSV

Export Transactions to CSV

Reports

> GET /api/v1/reports/cashflow Get Monthly Cashﬂow Report
>
> GET /api/v1/reports/trends Get Spending Trends
>
> GET /api/v1/reports/category-breakdown Get Spending Breakdown by
> Category
>
> GET /api/v1/reports/budgets
>
> POST /api/v1/reports/budgets

List Budgets

Create Budget

> PUT /api/v1/reports/budgets/{budget_id}
>
> DELETE /api/v1/reports/budgets/{budget_id}

Update Budget

Delete Budget

Categories

> GET /api/v1/categories
>
> POST /api/v1/categories

List Categories

Create Category

> PUT /api/v1/categories/{category_id}
>
> DELETE /api/v1/categories/{category_id}

Update Category

Delete Category

Goals

> GET /api/v1/goals
>
> POST /api/v1/goals

List Goals

Create Goal

> PUT /api/v1/goals/{goal_id}
>
> DELETE /api/v1/goals/{goal_id}

Update Goal

Delete Goal

Notiﬁcations

> POST /api/v1/notifications
>
> GET /api/v1/notifications

Create Notiﬁcation

List Notiﬁcations

> POST /api/v1/notifications/mark-read Mark Notiﬁcations As Read
>
> DELETE /api/v1/notifications/{notification_id} Delete Notiﬁcation

Attachments

> GET /api/v1/attachments Attachments Coming Soon
>
> Schemas
>
> APIResponse Collapse all object Standard API response wrapper.
>
> data\* Collapse all any
>
> Response data
>
> meta Collapse all object
>
> Response metadata
>
> Additional properties allowed
>
> AccountType Collapse all string Account type enumeration.
>
> Enum Collapse all array
>
> \#0="checking"
>
> \#1="savings"
>
> \#2="credit"
>
> \#3="investment"

Body_import_transactions_api_v1_transactions_import_post Collapse all
object

> file\* Collapse all string binary
>
> A CSV ﬁle containing transactions to import.

BudgetRequest Collapse all object Request model for budget
creation/update.

> name\* string ≤ 100 characters
>
> amount\* Collapse all integer
>
> Budget amount in minor units
>
> category\* Collapse all string
>
> Budget category
>
> period\* Collapse all string
>
> Budget period (monthly, weekly, etc.)

CategoryBreakdown Collapse all object

> category\* string
>
> amount\* integer
>
> percentage\* number

CategoryInListResponse Collapse all object

> id\* string
>
> name\* string
>
> icon\* Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> color\* Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> type\* Collapse all string
>
> Transaction type enumeration.
>
> Enum Collapse all array
>
> \#0="income"
>
> \#1="expense"
>
> \#2="transfer"
>
> isCustom\* boolean

CategoryListResponse Collapse all object

> categories\* Collapse all array\<object\>
>
> Items Collapse all object
>
> id\* string
>
> name\* string
>
> icon\* Expand all (string \| null)
>
> color\* Expand all (string \| null)
>
> type\* Expand all string
>
> isCustom\* boolean

CreateAccountRequest Collapse all object Request model for creating a
new account.

> name\* string \[1, 100\] characters
>
> type\* Collapse all string
>
> Account type enumeration.
>
> Enum Collapse all array
>
> \#0="checking"
>
> \#1="savings"
>
> \#2="credit"
>
> \#3="investment"
>
> number Collapse all (string \| null)
>
> Account number (last4)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> currency Collapse all string
>
> Default="INR"
>
> initial_balance Collapse all (integer \| null)
>
> Initial balance in minor units
>
> Any of Collapse all (integer \| null)
>
> \#0 integer
>
> \#1 null
>
> Default=0

CreateCategoryRequest Collapse all object

> Request model for creating a new category.
>
> name\* string \[1, 50\] characters
>
> transaction_type\* Collapse all string
>
> Transaction type enumeration.
>
> Enum Collapse all array
>
> \#0="income"
>
> \#1="expense"
>
> \#2="transfer"
>
> icon Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 50 characters
>
> \#1 null
>
> color Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 7 characters
>
> \#1 null
>
> parent_id Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

CreateGoalRequest Collapse all object

> name\* string \[1, 100\] characters
>
> target_amount\* Collapse all integer \> 0
>
> Amount in minor units
>
> due_date\* string date-time
>
> category_id\* string

CreateNotiﬁcationRequest Collapse all object

> user_id\* string
>
> message\* string \[1, 500\] characters
>
> title\* string \[1, 100\] characters
>
> target_url Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

CreateTransactionRequest Collapse all object Request model for creating
a new transaction.

> accountId\* string
>
> amount\* Collapse all integer
>
> Amount in minor units
>
> type\* Collapse all string
>
> Transaction type enumeration.
>
> Enum Collapse all array
>
> \#0="income"
>
> \#1="expense"
>
> \#2="transfer"
>
> category\* string
>
> note Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 500 characters
>
> \#1 null
>
> date\* string date-time
>
> linkedAccountId Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

ErrorResponse Collapse all object Standard error response.

> code\* Collapse all string
>
> Error code
>
> message\* Collapse all string
>
> Error message
>
> details Collapse all (object \| null)
>
> Additional error details
>
> Any of Collapse all (object \| null)
>
> \#0 Collapse all object
>
> Additional properties allowed
>
> \#1 null
>
> request_id Collapse all (string \| null)
>
> Request ID for tracking
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> timestamp Collapse all (string \| null)
>
> Error timestamp
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

ExportTransactionsRequest Collapse all object Request model for
exporting transactions to CSV.

> dateFrom Collapse all (string \| null)
>
> The start date for the export range.
>
> Any of Collapse all (string \| null)
>
> \#0 string date-time
>
> \#1 null
>
> dateTo Collapse all (string \| null)
>
> The end date for the export range.
>
> Any of Collapse all (string \| null)
>
> \#0 string date-time
>
> \#1 null
>
> accountId Collapse all (string \| null)
>
> The ID of the account to export transactions from.
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> transactionType Collapse all (string \| null)
>
> The type of transactions to export.
>
> Any of Collapse all (string \| null)
>
> \#0 TransactionType Collapse all string
>
> Transaction type enumeration.
>
> Enum Collapse all array
>
> \#0="income"
>
> \#1="expense"
>
> \#2="transfer"
>
> \#1 null

ForgotPasswordRequest Collapse all object

> email\* string email

ForgotPasswordResponse Collapse all object

> message\*

GoalStatus

string

> Collapse all string
>
> Goal status enumeration.
>
> Enum Collapse all array
>
> \#0="active"
>
> \#1="completed"
>
> \#2="paused"

HTTPValidationError Collapse all object

> detail Collapse all array\<object\>
>
> Items Collapse all object
>
> loc\* Collapse all array\<(string \| integer)\>
>
> Items Collapse all (string \| integer)
>
> Any of Collapse all (string \| integer)
>
> \#0 string
>
> \#1 integer
>
> msg\* string
>
> type\*

LoginRequest

string

> Collapse all object
>
> Request model for user login.
>
> identifier\* Collapse all string
>
> Email, username, or phone
>
> password\* string ≥ 8 characters

LogoutResponse Collapse all object

> message\* string

MarkReadRequest Collapse all object

> ids\* Collapse all array\<string\> ≥ 1 items
>
> Items string

MonthlyTrend Collapse all object

> month\* string
>
> income\* integer
>
> expense\* integer

RefreshTokenRequest Collapse all object

> refreshToken\* string

RefreshTokenResponse Collapse all object

> token\* string
>
> refreshToken\*

ReportPeriod

string

> Collapse all string
>
> Enum Collapse all array
>
> \#0="monthly"
>
> \#1="weekly"
>
> \#2="yearly"
>
> \#3="all"

ResendEmailVeriﬁcationRequest Collapse all object Request model for
resending email veriﬁcation.

> email\* string email

ResetPasswordRequest Collapse all object

> token\* string
>
> new_password\* string ≥ 8 characters

ResetPasswordResponse Collapse all object

> message\* string

SMSIngestionRequest Collapse all object

> Request model for Android SMS ingestion.
>
> sender\* Collapse all string
>
> SMS sender (e.g., HDFCBK)
>
> body\* Collapse all string
>
> SMS body text
>
> timestamp\* Collapse all string date-time
>
> SMS timestamp
>
> phone\* Collapse all string
>
> Phone number receiving SMS
>
> raw Collapse all (object \| null)
>
> Optional raw SMS data (encrypted if stored)
>
> Any of Collapse all (object \| null)
>
> \#0 Collapse all object
>
> Additional properties allowed
>
> \#1 null

SignupRequest Collapse all object Request model for user signup.

> full_name\* string ≤ 100 characters
>
> username\* string \[3, 50\] characters
>
> email\* string email
>
> password\* string ≥ 8 characters
>
> phone Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

TransactionSummaryResponse Collapse all object

> totalIncome\* integer
>
> totalExpense\* integer
>
> netAmount\* integer
>
> transactionCount\* integer
>
> categoryBreakdown\* Collapse all array\<object\>
>
> Items Collapse all object
>
> category\* string
>
> amount\* integer
>
> percentage\* number
>
> monthlyTrend\* Collapse all array\<object\>
>
> Items Collapse all object
>
> month\* string
>
> income\* integer
>
> expense\*

TransactionType

integer

> Collapse all string
>
> Transaction type enumeration.
>
> Enum Collapse all array
>
> \#0="income"
>
> \#1="expense"
>
> \#2="transfer"

UpdateAccountRequest Collapse all object Request model for updating
account.

> name Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string \[1, 100\] characters
>
> \#1 null
>
> type Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 AccountType Expand all string
>
> \#1 null
>
> number Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

UpdateCategoryRequest Collapse all object Request model for updating
category.

> name Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string \[1, 50\] characters
>
> \#1 null
>
> icon Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 50 characters
>
> \#1 null
>
> color Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 7 characters
>
> \#1 null

UpdateGoalRequest Collapse all object

> name Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string \[1, 100\] characters
>
> \#1 null
>
> target_amount Collapse all (integer \| null)
>
> Any of Collapse all (integer \| null)
>
> \#0 integer \> 0
>
> \#1 null
>
> due_date Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string date-time
>
> \#1 null
>
> status Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 GoalStatus Expand all string
>
> \#1 null

UpdateTransactionRequest Collapse all object Request model for updating
transaction.

> amount Collapse all (integer \| null)
>
> Any of Collapse all (integer \| null)
>
> \#0 integer
>
> \#1 null
>
> type Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 TransactionType Expand all string
>
> \#1 null
>
> category Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> note Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 500 characters
>
> \#1 null
>
> date Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string date-time
>
> \#1 null
>
> linkedAccountId Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null

UpdateUserRequest Collapse all object Request model for updating user
proﬁle.

> full_name Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string ≤ 100 characters
>
> \#1 null
>
> phone Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> preferences Collapse all (object \| null)
>
> Any of Collapse all (object \| null)
>
> \#0 UserPreferences Expand all object
>
> \#1 null

UserPreferences Collapse all object User preferences model matching
Firestore spec.

> currency Collapse all string
>
> Default currency (ISO 4217)
>
> Default="INR"
>
> timezone Collapse all string
>
> User timezone
>
> Default="Asia/Kolkata"
>
> notifications Collapse all object
>
> Notiﬁcation preferences
>
> Additional properties boolean
>
> theme Collapse all string
>
> UI theme preference
>
> Default="light"
>
> sms_auto_parse Collapse all boolean
>
> Auto-parse SMS for transactions
>
> Default=false

UserResponse Collapse all object Response model for user data.

> uid\* string
>
> username\* string
>
> email\* string
>
> full_name\* string
>
> phone Collapse all (string \| null)
>
> Any of Collapse all (string \| null)
>
> \#0 string
>
> \#1 null
>
> emailVerified\*
>
> preferences\*

boolean

> Collapse all object
>
> User preferences model matching Firestore spec.
>
> currency Collapse all string
>
> Default currency (ISO 4217)
>
> Default="INR"
>
> timezone Collapse all string
>
> User timezone
>
> Default="Asia/Kolkata"
>
> notifications Collapse all object
>
> Notiﬁcation preferences
>
> Additional properties boolean
>
> theme Collapse all string
>
> UI theme preference
>
> Default="light"
>
> sms_auto_parse Collapse all boolean
>
> Auto-parse SMS for transactions
>
> Default=false
>
> createdAt Expand all (string \| null)
>
> deleted Collapse all boolean
>
> Default=false

ValidationError Collapse all object

> loc\* Collapse all array\<(string \| integer)\>
>
> Items Collapse all (string \| integer)
>
> Any of Collapse all (string \| integer)
>
> \#0 string
>
> \#1 integer
>
> msg\* string
>
> type\* string

VerifyEmailRequest Collapse all object

> token\* string

VerifyEmailResponse Collapse all object

> message\* string
