import axios, { AxiosError, AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Methods
export const apiClient = {
  // Products
  getProducts: (params?: any) => api.get('/products', { params }),
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  
  // Auth
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  
  // ESG
  getESGMetrics: (params?: any) => api.get('/esg', { params }),
  createESGReport: (data: any) => api.post('/esg', data),
  getESGReport: (id: string) => api.get(`/esg/${id}`),
  
  // Carbon Wallet
  getCarbonBalance: () => api.get('/carbon-wallet/balance'),
  getCarbonTransactions: (params?: any) => api.get('/carbon-wallet/transactions', { params }),
  offsetCarbon: (data: any) => api.post('/carbon-wallet/offset', data),
  
  // Gamification
  getChallenges: (params?: any) => api.get('/gamification/challenges', { params }),
  getChallenge: (id: string) => api.get(`/gamification/challenges/${id}`),
  enrollChallenge: (id: string) => api.post(`/gamification/challenges/${id}/enroll`),
  checkInChallenge: (id: string, data: any) => api.post(`/gamification/challenges/${id}/checkin`, data),
  getLeaderboard: (params?: any) => api.get('/gamification/leaderboard', { params }),
  getUserBadges: () => api.get('/gamification/badges'),
  
  // Blockchain
  verifyProduct: (productId: string) => api.get(`/blockchain/verify/${productId}`),
  mintNFT: (data: any) => api.post('/blockchain/mint', data),
  
  // Orders
  createOrder: (data: any) => api.post('/orders', data),
  getOrders: (params?: any) => api.get('/orders', { params }),
  getOrder: (id: string) => api.get(`/orders/${id}`),
};

export default api;
