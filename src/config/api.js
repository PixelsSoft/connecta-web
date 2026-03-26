// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    LIST: '/users',
    SHOW: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },

  // Professionals
  PROFESSIONALS: {
    LIST: '/professionals',
    SHOW: (id) => `/professionals/${id}`,
    UPDATE: (id) => `/professionals/${id}`,
    DELETE: (id) => `/professionals/${id}`,
  },

  // Jobs
  JOBS: {
    LIST: '/jobs',
    CREATE: '/jobs',
    SHOW: (id) => `/jobs/${id}`,
    UPDATE: (id) => `/jobs/${id}`,
    DELETE: (id) => `/jobs/${id}`,
    INTERESTED: (id) => `/jobs/${id}/interested`,
    SHORTLIST: (id) => `/jobs/${id}/shortlist`,
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    SHOW: (id) => `/categories/${id}`,
    SUBCATEGORIES: (id) => `/categories/${id}/subcategories`,
  },

  // Transactions
  TRANSACTIONS: {
    LIST: '/transactions',
    SHOW: (id) => `/transactions/${id}`,
  },

  // Messages
  MESSAGES: {
    LIST: '/messages',
    SEND: '/messages',
    CONVERSATION: (userId) => `/messages/conversation/${userId}`,
  },

  // Newsletter
  NEWSLETTER: {
    SUBSCRIBE: '/newsletter/subscribe',
    UNSUBSCRIBE: '/newsletter/unsubscribe',
  },
};

export default API_BASE_URL;
