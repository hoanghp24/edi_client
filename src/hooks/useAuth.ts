import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setCredentials, logout } from '../features/auth/authSlice';
import { LoginRequest, AuthResponse } from '../types/auth';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../features/auth/services/authApi';
import { storage } from '../utils/storage';

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
    }
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = storage.getRefreshToken();
      return authApi.logout(refreshToken || '');
    },
    onSettled: () => {
      dispatch(logout());
      storage.clear();
    }
  });

  const login = async (credentials: LoginRequest): Promise<LoginResult> => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
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
    loginError: loginMutation.error ? (loginMutation.error as any).message : reduxError,
    logoutError: logoutMutation.error ? (logoutMutation.error as any).message : null,
  };
};
