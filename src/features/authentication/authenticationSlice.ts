import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, AuthResponse, LoginRequest } from '../../types/auth';
import { authApi } from './services/authApi';
import { storage } from '../../utils/storage';
import { HTTP_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from '../../constant/errorMessages';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: storage.getUserData(),
  accessToken: storage.getAccessToken(),
  refreshToken: storage.getRefreshToken(),
  loading: false,
  error: null,
  isAuthenticated: !!storage.getAccessToken(),
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      storage.setAccessToken(response.accessToken);
      storage.setRefreshToken(response.refreshToken);
      storage.setUserData(response.User);
      return response;
    } catch (error: any) {
      const data = error.response?.data;
      const status = error.response?.status;
      const errorMessage = data?.message || data?.Message || (status ? HTTP_ERROR_MESSAGES[status] : null) || data?.title || DEFAULT_ERROR_MESSAGE;
      return rejectWithValue(errorMessage);
    }
  }
);

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

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogout: (state) => {
      storage.clear();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
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
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.User;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { forceLogout, clearError, updateUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
