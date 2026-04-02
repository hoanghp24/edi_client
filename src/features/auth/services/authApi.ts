import apiClient from '../../../api/apiClient';
import { AuthResponse, LoginRequest } from '../../../types/auth';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';
import { AuthResponseSchema } from '../schemas/authSchema';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const data = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Runtime data validation with Zod
    return AuthResponseSchema.parse(data);
  },

  logout: async (refreshToken: string) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } catch (e) {
      console.error("Logout API failed", e);
    }
  },

  getProfile: async (): Promise<AuthResponse['User']> => {
    const data = await apiClient.get<AuthResponse['User']>(API_ENDPOINTS.USERS.PROFILE);
    return data;
  }
};
