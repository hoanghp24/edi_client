import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, AuthResponse } from '@/shared/types';
import { authApi } from '../api/authApi';
import { storage } from '@/shared/lib';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    const refreshToken = state.auth.refreshToken;
    if (refreshToken) await authApi.logout(refreshToken);
    storage.clear();
    return;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogout: (state) => {
      storage.clear();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload.User;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      storage.clear();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.setUserData(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { forceLogout, clearError, updateUser, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
