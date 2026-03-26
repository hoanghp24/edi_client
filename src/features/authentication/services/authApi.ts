import apiClient from '../../../api/apiClient';
import { AuthResponse, LoginRequest } from '../../../types/auth';
import { API_ENDPOINTS } from '../../../constant/apiEndpoints';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  logout: async (refreshToken: string) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } catch (e) {
      console.error("Logout API failed", e);
    }
  },

  getProfile: async (): Promise<AuthResponse['User']> => {
    const response = await apiClient.get<AuthResponse['User']>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  }
};
