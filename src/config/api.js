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
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
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
    MARK_COMPLETE: (id) => `/jobs/${id}/mark-complete`,
    CONFIRM_COMPLETION: (id) => `/jobs/${id}/confirm-completion`,
    QUOTES: (jobId) => `/jobs/${jobId}/quotes`,
    QUOTE_ACCEPT: (jobId, quoteId) => `/jobs/${jobId}/quotes/${quoteId}/accept`,
    QUOTE_REJECT: (jobId, quoteId) => `/jobs/${jobId}/quotes/${quoteId}/reject`,
  },

  PAYMENTS: {
    INTENT: '/payments/intent',
    CONFIRM: '/payments/confirm',
    CHECKOUT: '/payments/checkout',
    VERIFY: '/payments/verify',
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    ALL_WITH_SUBCATEGORIES: '/categories/all-with-subcategories',
    SHOW: (id) => `/categories/${id}`,
    SUBCATEGORIES: (id) => `/categories/${id}/subcategories`,
    BY_SLUG: (slug) => `/categories/slug/${slug}`,
    QUESTIONS: (categoryId, subcategoryId) => `/categories/${categoryId}/subcategories/${subcategoryId}/questions`,
    QUESTIONS_BY_SLUG: (categorySlug, subcategorySlug) => `/categories/${categorySlug}/subcategories/${subcategorySlug}/questions-by-slug`,
  },

  // Transactions
  TRANSACTIONS: {
    LIST: '/transactions',
    SHOW: (id) => `/transactions/${id}`,
  },

  // Newsletter
  NEWSLETTER: {
    SUBSCRIBE: '/newsletter/subscribe',
    UNSUBSCRIBE: '/newsletter/unsubscribe',
  },

  // Settings
  SETTINGS: {
    GET_ALL: '/settings',
  },

  // FAQs
  FAQS: {
    LIST: '/faqs',
    SHOW: (id) => `/faqs/${id}`,
  },

  // Pages
  PAGES: {
    GET: (slug) => `/pages/${slug}`,
  },

  // Support Tickets
  SUPPORT_TICKETS: {
    LIST: '/support-tickets',
    CREATE: '/support-tickets',
    SHOW: (id) => `/support-tickets/${id}`,
  },
};

export default API_BASE_URL;
