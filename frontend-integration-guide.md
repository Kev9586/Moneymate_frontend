# Frontend Integration Guide

## Overview

This document provides comprehensive information on how the MoneyMate React Native frontend integrates with the backend API and how to extend the application.

## API Integration

### Base Configuration

The frontend connects to the MoneyMate backend API:

```typescript
const API_CONFIG = {
  BASE_URL: 'https://bank-expense-tracker.onrender.com/api/v1',
  TIMEOUT: 10000,
};
```

### Authentication Flow

#### Login Process

1. User enters credentials in `AuthScreen`
2. Credentials are validated locally using `validators.ts`
3. API call made to `POST /auth/login`
4. JWT token received and stored in encrypted storage
5. User redirected to main app

#### Token Management

- Tokens stored using `react-native-encrypted-storage`
- Automatic token attachment via Axios interceptors
- Automatic logout on 401 responses
- Token refresh handled automatically

```typescript
// Axios request interceptor
axios.interceptors.request.use(async config => {
  const token = await EncryptedStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Services

Each domain has its own service class that handles API communication:

#### AuthService

```typescript
// Login
const response = await AuthService.login(email, password);

// Signup
const response = await AuthService.signup(email, password, name);

// Logout
await AuthService.logout();
```

#### AccountService

```typescript
// Get all accounts
const accounts = await AccountService.getAccounts();

// Create account
const account = await AccountService.createAccount({
  name: 'My Checking',
  type: 'checking',
  balance: 1000,
});

// Update account
const updatedAccount = await AccountService.updateAccount(account);

// Delete account
await AccountService.deleteAccount(accountId);
```

#### TransactionService

```typescript
// Get transactions with filters
const transactions = await TransactionService.getTransactions({
  category: 'food',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
});

// Create transaction
const transaction = await TransactionService.createTransaction({
  amount: 50.0,
  description: 'Grocery shopping',
  category: 'food',
  type: 'expense',
  accountId: 'account123',
  date: new Date().toISOString(),
});
```

#### BudgetService

```typescript
// Get budgets
const budgets = await BudgetService.getBudgets();

// Create budget
const budget = await BudgetService.createBudget({
  name: 'Monthly Food Budget',
  amount: 500,
  category: 'food',
  period: 'monthly',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
});

// Get goals
const goals = await BudgetService.getGoals();
```

## State Management

### Redux Store Structure

The app uses Redux Toolkit for state management with the following structure:

```typescript
interface RootState {
  auth: AuthState;
  accounts: AccountState;
  transactions: TransactionState;
  budgets: BudgetState;
}
```

### Using Redux in Components

```typescript
import {useSelector, useDispatch} from 'react-redux';
import {fetchAccounts} from '../store/slices/accountSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const {accounts, isLoading} = useSelector(state => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <View>
      {isLoading ? <LoadingSpinner /> : <AccountsList accounts={accounts} />}
    </View>
  );
};
```

### Async Actions

All API calls are handled through Redux Toolkit's `createAsyncThunk`:

```typescript
export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AccountService.getAccounts();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
```

## Navigation

### Navigation Structure

```
AppNavigator (Stack)
├── SplashScreen
├── OnboardingScreen
├── AuthScreen
└── MainTabNavigator (BottomTabs)
    ├── Dashboard
    ├── Accounts
    ├── Transactions
    ├── Reports
    └── Settings
```

### Navigation Usage

```typescript
import {useNavigation} from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Accounts', {accountId: '123'});
  };

  return <Button onPress={handleNavigate}>Go to Accounts</Button>;
};
```

### Deep Linking

The app supports deep linking for important screens:

```typescript
const linking = {
  prefixes: ['moneymate://'],
  config: {
    screens: {
      Main: {
        screens: {
          Transactions: 'transactions/:id?',
          Accounts: 'accounts/:id?',
        },
      },
    },
  },
};
```

## UI Components

### Design System

The app uses React Native Paper with a custom theme:

```typescript
const theme = {
  colors: {
    primary: '#6C5CE7',
    secondary: '#00B894',
    error: '#E17055',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
```

### Common Components

#### Reusable Components Pattern

```typescript
// src/components/common/CustomButton.tsx
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      style={[styles.button, styles[variant]]}>
      {title}
    </Button>
  );
};
```

#### Form Components

```typescript
// src/components/forms/TransactionForm.tsx
const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const validation = validateAmount(amount);
    if (!validation.isValid) {
      showError(validation.error);
      return;
    }

    await dispatch(
      createTransaction({
        amount: parseFloat(amount),
        description,
        // ... other fields
      }),
    );
  };

  return (
    <Card>
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button onPress={handleSubmit}>Save Transaction</Button>
    </Card>
  );
};
```

## Error Handling

### Global Error Handling

```typescript
// API Client error interceptor
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AuthService.logout();
      // Redirect to login
    }

    if (!error.response) {
      showError('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  },
);
```

### Component Error Handling

```typescript
const MyComponent = () => {
  const [error, setError] = useState(null);

  const handleOperation = async () => {
    try {
      setError(null);
      await someAPICall();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      {error && <ErrorMessage message={error} />}
      <Button onPress={handleOperation}>Perform Operation</Button>
    </View>
  );
};
```

## Data Validation

### Form Validation

```typescript
import {validateEmail, validateAmount} from '../utils/validators';

const validateForm = data => {
  const errors = {};

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  const amountValidation = validateAmount(data.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
```

### Real-time Validation

```typescript
const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const handleAmountChange = (value: string) => {
    setAmount(value);

    const validation = validateAmount(value);
    setAmountError(validation.isValid ? '' : validation.error);
  };

  return (
    <TextInput
      value={amount}
      onChangeText={handleAmountChange}
      error={!!amountError}
      helperText={amountError}
    />
  );
};
```

## Testing

### Component Testing

```typescript
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../store';

const renderWithProvider = component => {
  return render(<Provider store={store}>{component}</Provider>);
};

test('should handle transaction creation', async () => {
  const {getByText, getByPlaceholderText} = renderWithProvider(
    <TransactionForm />,
  );

  fireEvent.changeText(getByPlaceholderText('Amount'), '100');
  fireEvent.changeText(getByPlaceholderText('Description'), 'Test transaction');
  fireEvent.press(getByText('Save'));

  // Assert expected behavior
});
```

### Service Testing

```typescript
import {AccountService} from '../services/AccountService';

jest.mock('../services/ApiClient');

test('should fetch accounts successfully', async () => {
  const mockAccounts = [{id: '1', name: 'Test Account'}];
  apiClient.get.mockResolvedValue({accounts: mockAccounts});

  const result = await AccountService.getAccounts();

  expect(result).toEqual(mockAccounts);
  expect(apiClient.get).toHaveBeenCalledWith('/accounts');
});
```

## Performance Optimization

### List Optimization

```typescript
const TransactionsList = ({transactions}) => {
  const renderTransaction = useCallback(
    ({item}) => <TransactionItem transaction={item} />,
    [],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};
```

### Memoization

```typescript
const ExpensiveComponent = React.memo(({data}) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  const handlePress = useCallback(() => {
    // Handle press
  }, []);

  return (
    <View>
      <Text>{expensiveValue}</Text>
      <Button onPress={handlePress}>Press me</Button>
    </View>
  );
});
```

## Extending the Application

### Adding New Features

1. **Create Service Layer**

   ```typescript
   // src/services/NewFeatureService.ts
   export class NewFeatureService {
     static async getFeatureData() {
       return await apiClient.get('/feature');
     }
   }
   ```

2. **Create Redux Slice**

   ```typescript
   // src/store/slices/newFeatureSlice.ts
   const newFeatureSlice = createSlice({
     name: 'newFeature',
     initialState,
     reducers: {
       // reducers
     },
     extraReducers: builder => {
       // async actions
     },
   });
   ```

3. **Create Screen Component**

   ```typescript
   // src/screens/NewFeatureScreen.tsx
   const NewFeatureScreen = () => {
     // Component logic
   };
   ```

4. **Add to Navigation**
   ```typescript
   // Update navigation configuration
   ```

### Adding New API Endpoints

1. **Update Service**

   ```typescript
   static async newEndpoint(params) {
     return await apiClient.post('/new-endpoint', params);
   }
   ```

2. **Update Redux Actions**

   ```typescript
   export const newAction = createAsyncThunk(
     'feature/newAction',
     async params => {
       return await NewFeatureService.newEndpoint(params);
     },
   );
   ```

3. **Update Types**
   ```typescript
   // src/types/index.ts
   export interface NewFeatureType {
     id: string;
     // other properties
   }
   ```

## Best Practices

### Code Organization

- Keep components small and focused
- Use TypeScript for type safety
- Follow consistent naming conventions
- Separate business logic from UI components

### State Management

- Use Redux for global state
- Keep component state for UI-specific state
- Normalize state structure
- Use selectors for computed values

### Error Handling

- Always handle API errors gracefully
- Provide meaningful error messages to users
- Log errors for debugging
- Implement retry mechanisms where appropriate

### Performance

- Use FlatList for large lists
- Implement proper memoization
- Avoid inline functions in render
- Use image optimization

### Security

- Never store sensitive data in plain text
- Validate all user inputs
- Use HTTPS for all API calls
- Implement proper authentication

## Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build issues**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**

   ```bash
   cd android && ./gradlew clean && cd ..
   ```

4. **Navigation issues**
   - Check navigation structure
   - Verify screen names match navigation config
   - Ensure proper type definitions

5. **Redux issues**
   - Check action creators
   - Verify reducer logic
   - Use Redux DevTools for debugging

### Debugging

1. **React Native Debugger**
2. **Console logging**
3. **Redux DevTools**
4. **Network inspection**
5. **Crash reporting tools**

## Deployment

### Build Process

1. **Android**

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **iOS**
   ```bash
   npx react-native run-ios --configuration Release
   ```

### Environment Configuration

Use different configurations for development, staging, and production environments through environment variables and build configurations.

---

This integration guide provides the foundation for understanding and extending the MoneyMate React Native application. For specific implementation details, refer to the codebase and individual component documentation.
