import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { loginThunk, logoutThunk } from '../features/auth/authSlice';
import { LoginRequest } from '../types/auth';

interface LoginResult {
  success: boolean;
  error?: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResult> => {
    const resultAction = await dispatch(loginThunk(credentials));
    if (loginThunk.fulfilled.match(resultAction)) return { success: true };
    return { success: false, error: (resultAction.payload as string) || 'Login failed' };
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout
  };
};
