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
      
      // Check if this is a business account
      const isBusiness = email === 'business@ecoconnect.vn';
      
      const mockUser: User = {
        _id: isBusiness ? '999' : '1',
        name: isBusiness ? 'Green Shop Vietnam' : 'Demo User',
        email: email,
        userType: isBusiness ? 'business' : 'consumer',
        carbonBalance: isBusiness ? 5000 : 1250,
        points: isBusiness ? 2500 : 850,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add business-specific fields
      if (isBusiness) {
        mockUser.companyName = 'Green Shop Vietnam';
        mockUser.taxCode = '0123456789';
        mockUser.businessAddress = '123 Nguyễn Huệ, Quận 1, TP.HCM';
        mockUser.businessType = 'Sản xuất & Phân phối sản phẩm xanh';
        mockUser.website = 'https://greenshop.vn';
      }
      
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
        phone: data.phone,
        carbonBalance: 0,
        points: data.userType === 'business' ? 500 : 100, // Higher welcome bonus for business
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add business fields if applicable
      if (data.userType === 'business') {
        mockUser.companyName = data.companyName;
        mockUser.taxCode = data.taxCode;
        mockUser.businessAddress = data.businessAddress;
        mockUser.businessType = data.businessType;
        mockUser.website = data.website;
      }
      
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
