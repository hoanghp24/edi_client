import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCredentials, logout } from './authSlice';
import { LoginRequest, AuthResponse } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { storage } from '@/shared/lib';

interface LoginResult {
  success: boolean;
  error?: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, error: reduxError } = useAppSelector((state) => state.auth);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: AuthResponse) => {
      storage.setAccessToken(data.accessToken);
      storage.setRefreshToken(data.refreshToken);
      storage.setUserData(data.User);
      dispatch(setCredentials(data));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = storage.getRefreshToken();
      return authApi.logout(refreshToken || '');
    },
    onSettled: () => {
      dispatch(logout());
      storage.clear();
    },
  });

  const login = async (credentials: LoginRequest): Promise<LoginResult> => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error instanceof Error ? loginMutation.error.message : reduxError,
    logoutError: logoutMutation.error instanceof Error ? logoutMutation.error.message : null,
  };
};
