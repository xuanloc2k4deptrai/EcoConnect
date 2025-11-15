'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { apiClient } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
  updateUser: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUser: User = {
        _id: '1',
        name: 'Demo User',
        email: email,
        userType: 'consumer',
        carbonBalance: 1250,
        points: 850,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    }
  };

  const logout = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (data: any) => {
    try {
      // Mock registration - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser: User = {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        userType: data.userType || 'consumer',
        carbonBalance: 0,
        points: 100, // Welcome bonus
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    }
  };

  const updateUser = async (data: any) => {
    const response = await apiClient.updateProfile(data);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
