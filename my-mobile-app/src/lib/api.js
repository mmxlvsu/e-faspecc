// API configuration and utility functions
const API_BASE_URL = 'https://cafeteria-backend-eight.vercel.app';

// API utility function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Register new student
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Verify email
  verifyEmail: async (email, code) => {
    return apiCall('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  // Resend verification code
  resendCode: async (email) => {
    return apiCall('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiCall('/auth/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return apiCall(`/auth/reset/${token}`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
  },
};

// Storage utilities
export const storage = {
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('user');
  },
  
  clear: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// Logout utility function
export const logout = (navigate) => {
  // Clear all authentication data
  storage.clear();
  
  // Navigate to splash page
  navigate("/");
};
