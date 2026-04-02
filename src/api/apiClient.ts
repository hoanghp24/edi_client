import axios, { AxiosError, InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig } from 'axios';
import { storage } from '../utils/storage';
import { AuthResponse } from '../types/auth';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { forceLogout } from '../features/auth/authSlice';
import { AppStore } from '../state/store';
import { HTTP_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';
import { startProgress, stopProgress } from '../utils/progress';
import { notification } from 'antd';

import { env } from '../config/env';

// Interface to help distinguish handled vs unhandled errors
export interface ApiError extends Error {
  isHandled?: boolean;
}

// Override Axios methods to reflect data unpacking in the response interceptor
interface CustomAxiosInstance extends AxiosInstance {
  <T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  <T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

// Helper: Normalize multiple error formats from different backends
const normalizeError = (error: AxiosError): string => {
  const data = error.response?.data as any;
  const status = error.response?.status;
  return data?.message || data?.Message || (status ? HTTP_ERROR_MESSAGES[status] : null) || data?.title || error.message || DEFAULT_ERROR_MESSAGE;
};

const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
}) as CustomAxiosInstance;

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
    startProgress();
    const token = storage.getAccessToken();
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    stopProgress();
    return response.data;
  },
  async (error: AxiosError) => {
    stopProgress();
    const originalRequest = error.config as any;

    if (originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN)) {
      return Promise.reject(new Error(normalizeError(error)));
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
        if (store) store.dispatch(forceLogout());
        return Promise.reject(new Error(normalizeError(error)));
      }

      try {
        const { data } = await axios.post<AuthResponse>(
          `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.AUTH.REFRESH}`, 
          { refreshToken }
        );

        storage.setAccessToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        processQueue(null, data.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        if (store) store.dispatch(forceLogout());
        return Promise.reject(new Error(normalizeError(refreshError)));
      } finally {
        isRefreshing = false;
      }
    }
    
    const errorMessage = normalizeError(error);

    if (error.response?.status !== 401 && !originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN)) {
      notification.error({
        message: 'System Alert',
        description: errorMessage,
        placement: 'topRight',
      });
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
