import apiClient from '../../../api/apiClient';
import { AuthResponse, LoginRequest } from '../../../types/auth';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

export const authApi = {
  login: (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  logout: async (refreshToken: string) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } catch (e) {
      console.error("Logout API failed", e);
    }
  },

  getProfile: (): Promise<AuthResponse['User']> => {
    return apiClient.get<AuthResponse['User']>(API_ENDPOINTS.USERS.PROFILE);
  }
};
