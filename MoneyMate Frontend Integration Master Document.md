Of course. Here is the updated Frontend Integration Master Document with
a more detailed section on UI Actions and Functional Flow.

# MoneyMate Frontend Integration Master Document

This document provides a comprehensive guide for frontend developers to
integrate with the MoneyMate backend API. It covers all necessary
configurations, API endpoints, interaction flows, and best practices to
build a fully functional and responsive personal finance web
application.

## 1. Overview

The goal of this integration is to connect a frontend web application to
the MoneyMate backend, a robust system built with FastAPI and Firebase.
The backend provides a comprehensive suite of APIs for managing personal
finances, including accounts, transactions, budgets, goals, and
financial reports.

The frontend application will be responsible for user authentication,
data visualization, and user interaction, communicating with the backend
via a RESTful API. This guide details the entire process to ensure a
seamless and successful integration.

## 2. Firebase Configuration

Firebase is central to the authentication flow. The frontend application
must be configured with a Firebase project to handle user sign-in,
sign-up, and ID token management.

### Firebase SDK Setup

You must initialize the Firebase Web SDK in your frontend application
using the configuration keys from your project\'s Firebase console.

### Environment Variables

Store your Firebase project configuration in environment variables.

**Example .env file:**

\# The base URL for the MoneyMate Backend API\
API_BASE_URL=http://localhost:8000\
\
\# Firebase Web SDK Configuration\
FIREBASE_API_KEY=AIzaSyA\...\
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com\
FIREBASE_PROJECT_ID=your-project-id\
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com\
FIREBASE_MESSAGING_SENDER_ID=1234567890\
FIREBASE_APP_ID=1:1234567890:web:abcdef123456

## 3. API Integration

This section details all available API endpoints. All protected
endpoints require a Firebase ID token.

### General Notes

-   **Amounts**: All monetary values are integers in **minor units**
    > (e.g., for INR, 10050 represents ₹100.50).

-   **Dates**: All dates and timestamps are **UTC ISO 8601 strings**.

-   **Base URL**: http://localhost:8000 (for local development).

-   **API Version**: All endpoints are prefixed with /api/v1.

### Health & Monitoring

Endpoints to check the status of the backend services.

  -----------------------------------------------------------------------
  Method            Endpoint          Description       Auth Required
  ----------------- ----------------- ----------------- -----------------
  GET               /metrics          Get Prometheus    No
                                      metrics.          

  -----------------------------------------------------------------------

### Authentication

  ---------------------------------------------------------------------------------------
  Method            Endpoint                          Description       Auth Required
  ----------------- --------------------------------- ----------------- -----------------
  POST              /auth/signup                      Register a new    No
                                                      user.             

  POST              /auth/login                       Log in an         No
                                                      existing user.    

  POST              /auth/logout                      Log out an        Yes
                                                      existing user.    

  POST              /auth/forgot-password             Initiate the      No
                                                      password reset    
                                                      process.          

  POST              /auth/reset-password              Complete the      No
                                                      password reset    
                                                      process.          

  POST              /auth/verify-email                Verify a user\'s  No
                                                      email address     
                                                      with a token.     

  POST              /auth/resend-email-verification   Resend the email  No
                                                      verification      
                                                      link.             

  POST              /auth/refresh-token               Refresh the       Yes
                                                      authentication    
                                                      token.            
  ---------------------------------------------------------------------------------------

**POST /api/v1/auth/signup**

-   \[cite_start\]**Request Body (SignupRequest)**:\
    > {\
    > \"full_name\": \"Jane Doe\",\
    > \"username\": \"janedoe\",\
    > \"email\": \"jane.doe@example.com\",\
    > \"password\": \"aVeryStrongPassword123\",\
    > \"phone\": \"+919876543210\"\
    > }

-   \[cite_start\]**Success Response (201)**: UserResponse object with
    > user details.

-   **Common Errors**: 409 (Email or username already exists), 422
    > (Validation error).

### Users

Endpoints for managing the currently authenticated user\'s profile.

  -----------------------------------------------------------------------
  Method            Endpoint          Description       Auth Required
  ----------------- ----------------- ----------------- -----------------
  GET               /me               Get the current   Yes
                                      user\'s profile.  

  PUT               /me               Update the        Yes
                                      current user\'s   
                                      profile.          

  DELETE            /me               Delete the        Yes
                                      current user\'s   
                                      account.          
  -----------------------------------------------------------------------

**PUT /api/v1/me**

-   \[cite_start\]**Request Body (UpdateUserRequest)**:\
    > {\
    > \"full_name\": \"Jane A. Doe\",\
    > \"phone\": \"+919876543211\",\
    > \"preferences\": {\
    > \"currency\": \"USD\",\
    > \"timezone\": \"America/New_York\",\
    > \"theme\": \"dark\",\
    > \"sms_auto_parse\": true\
    > }\
    > }

-   \[cite_start\]**Success Response (200)**: Updated UserResponse
    > object.

-   **Common Errors**: 401/403 (Unauthorized), 422 (Validation error).

### Accounts

Endpoints for managing user bank accounts.

  -------------------------------------------------------------------------------------------
  Method            Endpoint                              Description       Auth Required
  ----------------- ------------------------------------- ----------------- -----------------
  POST              /accounts                             Create a new      Yes
                                                          account.          

  GET               /accounts                             List all of the   Yes
                                                          user\'s accounts. 

  PUT               /accounts/{account_id}                Update an         Yes
                                                          existing account. 

  DELETE            /accounts/{account_id}                Delete or archive Yes
                                                          an account.       

  GET               /accounts/{account_id}/transactions   Get all           Yes
                                                          transactions for  
                                                          a specific        
                                                          account.          
  -------------------------------------------------------------------------------------------

**POST /api/v1/accounts**

-   \[cite_start\]**Request Body (CreateAccountRequest)**:\
    > {\
    > \"name\": \"Savings Account\",\
    > \"type\": \"savings\",\
    > \"number\": \"1234\",\
    > \"currency\": \"INR\",\
    > \"initial_balance\": 5000000\
    > }

-   **Success Response (201)**: The newly created account object.

-   **Common Errors**: 401/403 (Unauthorized), 409 (Account number
    > already exists), 422 (Validation error).

### Transactions

Endpoints for managing financial transactions.

  --------------------------------------------------------------------------------------
  Method            Endpoint                         Description       Auth Required
  ----------------- -------------------------------- ----------------- -----------------
  POST              /transactions                    Create a new      Yes
                                                     transaction.      

  GET               /transactions/summary            Get a detailed    Yes
                                                     summary of        
                                                     transactions.     

  PUT               /transactions/{transaction_id}   Update an         Yes
                                                     existing          
                                                     transaction.      

  DELETE            /transactions/{transaction_id}   Delete a          Yes
                                                     transaction.      

  POST              /transactions/auto               Create a          Yes
                                                     transaction from  
                                                     an SMS.           

  POST              /transactions/import             Import            Yes
                                                     transactions from 
                                                     a CSV file.       

  POST              /transactions/export             Export            Yes
                                                     transactions to a 
                                                     CSV file.         
  --------------------------------------------------------------------------------------

**POST /api/v1/transactions**

-   \[cite_start\]**Request Body (CreateTransactionRequest)**:\
    > {\
    > \"accountId\": \"your-account-id\",\
    > \"amount\": 1500,\
    > \"type\": \"expense\",\
    > \"category\": \"Groceries\",\
    > \"note\": \"Weekly groceries\",\
    > \"date\": \"2025-10-13T10:00:00Z\",\
    > \"linkedAccountId\": null\
    > }

-   **Success Response (201)**: The newly created transaction object,
    > including updated account balances.

-   **Common Errors**: 401/403 (Unauthorized), 404 (Account not found),
    > 409 (Insufficient funds), 422 (Validation error).

### Categories, Budgets, and Goals

  ------------------------------------------------------------------------------------
  Method            Endpoint                       Description       Auth Required
  ----------------- ------------------------------ ----------------- -----------------
  GET               /categories                    List all          Yes
                                                   categories.       

  POST              /categories                    Create a new      Yes
                                                   category.         

  PUT               /categories/{category_id}      Update a          Yes
                                                   category.         

  DELETE            /categories/{category_id}      Delete a          Yes
                                                   category.         

  GET               /reports/budgets               List all budgets. Yes

  POST              /reports/budgets               Create a new      Yes
                                                   budget.           

  PUT               /reports/budgets/{budget_id}   Update a budget.  Yes

  DELETE            /reports/budgets/{budget_id}   Delete a budget.  Yes

  GET               /goals                         List all goals.   Yes

  POST              /goals                         Create a new      Yes
                                                   goal.             

  PUT               /goals/{goal_id}               Update a goal.    Yes

  DELETE            /goals/{goal_id}               Delete a goal.    Yes
  ------------------------------------------------------------------------------------

## 4. Backend Interaction Flow

### Authentication and Session Flow

The backend is **stateless**. Authentication is handled via JWTs (JSON
Web Tokens) provided by Firebase.

1.  **User Sign-In**: The user signs in or signs up using the **Firebase
    > Web SDK** on the frontend.

2.  **Obtain ID Token**: Upon successful authentication, the frontend
    > obtains a Firebase ID Token using
    > firebase.auth().currentUser.getIdToken().

3.  **API Requests**: For every request to a protected backend endpoint,
    > the frontend must include the ID token in the Authorization
    > header.

    -   **Header**: Authorization: Bearer \<FIREBASE_ID_TOKEN\>

4.  **Token Verification**: The backend verifies this token with
    > Firebase Admin on every request to authenticate and authorize the
    > user.

5.  **Token Refresh**: The Firebase Web SDK automatically handles the
    > refreshing of ID tokens. It is recommended to use the
    > onAuthStateChanged listener to get the current user and refresh
    > tokens when necessary.

### Standard API Responses

-   \[cite_start\]**Success**: Successful responses are wrapped in a
    > standard structure:\
    > {\
    > \"data\": { \... },\
    > \"meta\": { \... }\
    > }

-   \[cite_start\]**Error**: Failed responses return a standardized
    > error object, which should be used to display user-friendly
    > messages:\
    > {\
    > \"code\": \"HTTP_422_UNPROCESSABLE_ENTITY\",\
    > \"message\": \"Validation failed.\",\
    > \"details\": {\
    > \"validation_errors\": \[\
    > { \"loc\": \[\"body\", \"email\"\], \"msg\": \"Invalid email
    > format\", \"type\": \"value_error\" }\
    > \]\
    > },\
    > \"request_id\": \"req_12345\",\
    > \"timestamp\": \"2025-10-13T12:34:56Z\"\
    > }

## 5. UI Actions and Functional Flow

This section maps user interface actions to their corresponding backend
API calls and frontend logic.

  -----------------------------------------------------------------------------------------------------
  Screen / Feature     User Action           Trigger           API Endpoint(s) and Logic
  -------------------- --------------------- ----------------- ----------------------------------------
  **Splash Screen**    App Cold Start        App Mount         \[cite_start\]Call auth.bootstrap() to
                                                               read firstRun and token from local
                                                               storage\[cite_start\]. • If firstRun ===
                                                               true, navigate to
                                                               Onboarding\[cite_start\]. • Else if a
                                                               token exists, navigate to
                                                               MainTabs\[cite_start\]. • Otherwise,
                                                               navigate to Auth.

  **Onboarding**       Completes or skips    \"Get Started\"   \[cite_start\]Persist firstRun: false in
                       onboarding            or \"Skip\"       local storage and navigate to the Auth
                                             Button            screen.

  **Authentication**   Submits Login Form    Form Submit       \[cite_start\]Validate form inputs.
                                                               \[cite_start\]Call POST
                                                               /api/v1/auth/login. \[cite_start\]On
                                                               success, store the token/user data and
                                                               navigate to MainTabs. \[cite_start\]On
                                                               failure, show an error toast and an
                                                               input shake animation.

  **Authentication**   Submits Signup Form   Form Submit       \[cite_start\]Validate form inputs. Call
                                                               POST /api/v1/auth/signup.
                                                               \[cite_start\]The flow may involve an
                                                               OTP verification step. \[cite_start\]On
                                                               success, store the token and navigate to
                                                               MainTabs.

  **Authentication**   Initiates Password    \"Forgot          \[cite_start\]Open an OTP modal bound to
                       Reset                 Password\" Link   the user\'s email. \[cite_start\]After
                                             -\> Form Submit   successful OTP verification, call POST
                                                               /api/v1/auth/reset-password with the new
                                                               password.

  **Dashboard**        Views Dashboard       Screen Mount      \[cite_start\]Fetch data using GET
                                                               /api/v1/accounts and GET
                                                               /api/v1/transactions/summary to populate
                                                               the screen. \[cite_start\]Display a
                                                               \"Good morning, {firstName}\" greeting.
                                                               \[cite_start\]If no accounts exist, show
                                                               an empty state with an \"Add Account\"
                                                               CTA.

  **Dashboard**        Taps an account or    Card / List Item  \[cite_start\]Navigate to AccountDetail
                       transaction           Press             or TransactionDetail screen with the
                                                               corresponding ID.

  **Accounts**         Adds a New Account    FAB Press -\>     \[cite_start\]Call POST
                                             Sheet Form Submit /api/v1/accounts. \[cite_start\]Use an
                                                               optimistic UI update by adding the
                                                               account to the list immediately, then
                                                               rolling back on API error.

  **Accounts**         Edits an Existing     Edit Action -\>   \[cite_start\]Call PUT
                       Account               Sheet Form Submit /api/v1/accounts/{account_id} with the
                                                               updated data.

  **Accounts**         Deletes an Account    Delete Action -\> \[cite_start\]After user confirmation in
                                             Confirmation      a native alert dialog\[cite_start\],
                                             Dialog            call DELETE
                                                               /api/v1/accounts/{account_id}.

  **Transactions**     Adds/Edits a          FAB or Edit       \[cite_start\]Call POST
                       Transaction           Action -\> Sheet  /api/v1/transactions for new
                                             Form Submit       transactions or PUT
                                                               /api/v1/transactions/{transaction_id}
                                                               for updates.

  **Transactions**     Deletes a Transaction Swipe Action or   \[cite_start\]Call DELETE
                                             Multi-Select      /api/v1/transactions/{transaction_id}.
                                                               \[cite_start\]Show a snackbar with an
                                                               \"Undo\" action for 5 seconds to allow
                                                               reversal.

  **Budgets & Goals**  Views Budgets and     Screen Mount      \[cite_start\]Fetch all data by calling
                       Goals                                   GET /api/v1/reports/budgets and GET
                                                               /api/v1/goals.

  **Budgets & Goals**  Budget Threshold      Spending reaches  Logic is client-side.
                       Reached               80%               \[cite_start\]Trigger an in-app alert
                                                               and an optional local push notification
                                                               after requesting permission.

  **Reports**          Exports Data to CSV   Export Button     \[cite_start\]Call POST
                                             Press             /api/v1/transactions/export to generate
                                                               and trigger a download of the CSV file.

  **Notifications**    Marks Notifications   Button Press      \[cite_start\]Call POST
                       as Read                                 /api/v1/notifications/mark-read with an
                                                               array of notification IDs to update
                                                               their status on the server.

  **Settings**         Updates User          Form Submit or    \[cite_start\]Call PUT /api/v1/me to
                       Profile/Preferences   Toggle Change     persist changes to the user\'s profile
                                                               and preferences (like theme, currency,
                                                               etc.).

  **Settings**         Logs Out              Logout Button     \[cite_start\]Clear all sensitive user
                                             Press             data and tokens from local storage, then
                                                               navigate to the Auth screen.

  **Global / Offline** Network Status        NetInfo State     \[cite_start\]When offline, display a
                       Changes               Change            global OfflineBanner.
                                                               \[cite_start\]Queue all write operations
                                                               (POST, PUT, DELETE) locally. When
                                                               online, replay the queued actions in
                                                               order. \[cite_start\]Handle conflicts
                                                               (409/422 errors) by showing a resolution
                                                               UI.
  -----------------------------------------------------------------------------------------------------

## 6. Responsive Design and Device Adaptation

The frontend application **must be fully responsive** and provide an
optimal user experience across all major platforms and screen sizes,
including:

-   **Mobile Devices**: (e.g., iPhones, Android phones)

-   **Tablets**: (e.g., iPads, Android tablets)

-   **Desktops & Laptops**: (All common resolutions)

The UI should fluidly adapt its layout and components to fit the
viewport of the device it\'s being viewed on. This should be achieved
using a single codebase employing modern, responsive web design
techniques such as:

-   **CSS Flexbox and Grid** for creating flexible and adaptive layouts.

-   **Media Queries** to apply different styles based on screen size,
    > orientation, and resolution.

-   **Responsive Frameworks** (e.g., Tailwind CSS, Bootstrap) can be
    > used to streamline the development of a responsive UI.

The goal is a seamless experience where content is always readable and
interactive, regardless of the device.

## 7. Integration Best Practices

-   **State Management**: Use a robust state management library (e.g.,
    > Redux, Zustand, React Query) to manage application state,
    > including user authentication status, API data, and UI state.

-   **Asynchronous Handling**: All API calls are asynchronous. Implement
    > proper loading and error states in the UI to give users feedback.
    > Use skeletons during initial data loads for a better user
    > experience.

-   **Idempotency**: For critical operations like creating a
    > transaction, use an Idempotency-Key header with a unique value
    > (e.g., a UUID). This prevents duplicate records if a request is
    > retried due to a network error.

-   **Error Display**: Display API error messages to the user in a
    > non-disruptive way, such as through toast notifications or
    > snackbars.

-   \[cite_start\]**Offline Support**: Implement a queueing mechanism
    > for POST, PUT, and DELETE requests. \[cite_start\]If the user is
    > offline, actions should be stored locally and synced with the
    > server once connectivity is restored.

-   \[cite_start\]**Debouncing**: For inputs that trigger API calls
    > (like search), debounce user input to avoid sending excessive
    > requests to the server.

## 8. Testing & Validation

To ensure a successful integration, perform the following checks:

1.  **Firebase Connectivity**:

    -   Confirm that user registration and login via the Firebase Web
        > SDK are successful.

    -   Verify that a valid Firebase ID token is generated upon login
        > and is accessible to the application for API calls.

2.  **API Endpoint Testing**:

    -   Use a tool like Postman or make direct fetch calls to test key
        > endpoints. Start with GET /api/v1/me using a valid
        > Authorization: Bearer \<TOKEN\> header to confirm
        > authentication with the backend is working.

    -   Test the full CRUD (Create, Read, Update, Delete) lifecycle for
        > major features like Accounts, Transactions, and Categories.

3.  **UI Flow Validation**:

    -   Perform end-to-end tests of all user flows documented in Section
        > 5.

    -   Example Flow: Register a new user -\> Create an account -\> Add
        > an income transaction -\> Add an expense transaction -\>
        > Verify the account balance is updated correctly in the UI.

4.  **Cross-Device and Browser Testing**:

    -   Use browser developer tools to simulate different screen sizes
        > and devices.

    -   Test the application on physical mobile devices and tablets
        > (both iOS and Android) to ensure the responsive design is
        > functioning correctly.

    -   Verify functionality across the latest versions of major web
        > browsers (Chrome, Firefox, Safari, Edge).
