import axios from 'axios';
import API_BASE_URL from '../config/api';
import { loadingManager } from './loadingManager';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add token to requests and start loading
axiosInstance.interceptors.request.use(
  (config) => {
    // Start loading
    loadingManager.startLoading();
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Stop loading on error
    loadingManager.stopLoading();
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and stop loading
axiosInstance.interceptors.response.use(
  (response) => {
    // Stop loading on success
    loadingManager.stopLoading();
    return response;
  },
  async (error) => {
    // Stop loading on error
    loadingManager.stopLoading();
    
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { token } = response.data.data;
          localStorage.setItem('auth_token', token);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
