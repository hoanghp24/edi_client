import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storage } from '../utils/storage';
import { AuthResponse } from '../types/auth';
import { API_ENDPOINTS } from '../constant/apiEndpoints';

let store: any;

/**
 * Inject store to break circular dependency (store -> slice -> api -> apiClient -> store)
 */
export const injectStore = (_store: any) => {
  store = _store;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getAccessToken();
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        if (store) store.dispatch({ type: 'auth/forceLogout' });
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post<AuthResponse>(
          `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.AUTH.REFRESH}`, 
          { refreshToken },
          { headers: { Authorization: `Bearer ${storage.getAccessToken()}` } }
        );

        storage.setAccessToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        processQueue(null, data.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (store) store.dispatch({ type: 'auth/forceLogout' });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
