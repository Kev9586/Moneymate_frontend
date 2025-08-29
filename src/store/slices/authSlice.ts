import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AuthService} from '../../services/AuthService';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isFirstLaunch: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isFirstLaunch: true,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}) => {
    const response = await AuthService.login(email, password);
    return response;
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await AuthService.signup(email, password, name);
    return response;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signup.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Signup failed';
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const {setFirstLaunch, clearError} = authSlice.actions;
export default authSlice.reducer;
