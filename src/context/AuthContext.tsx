import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { loginThunk, logoutThunk } from '../features/authentication/authenticationSlice';
import { User, LoginRequest } from '../types/auth';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = useCallback(async (credentials: LoginRequest): Promise<LoginResult> => {
    const resultAction = await dispatch(loginThunk(credentials));
    if (loginThunk.fulfilled.match(resultAction)) return { success: true };
    return { success: false, error: (resultAction.payload as string) || 'Login failed' };
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
