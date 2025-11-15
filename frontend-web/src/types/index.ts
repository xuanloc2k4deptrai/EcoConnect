// Common Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'seller' | 'admin';
  avatar?: string;
  carbonWallet: {
    balance: number;
    totalOffset: number;
    totalEarned: number;
  };
  gamification: {
    points: number;
    level: number;
    badges: Badge[];
    streak: number;
  };
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  esgScore: {
    overall: number;
    environmental: number;
    social: number;
    governance: number;
  };
  carbonFootprint: {
    manufacturing: number;
    transportation: number;
    packaging: number;
    total: number;
  };
  certifications: string[];
  blockchainVerified: boolean;
  nftTokenId?: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ESGMetrics {
  _id: string;
  company: string;
  reportingPeriod: {
    startDate: string;
    endDate: string;
  };
  environmental: {
    carbonEmissions: number;
    waterUsage: number;
    wasteGenerated: number;
    renewableEnergyPercent: number;
    recyclingRate: number;
  };
  social: {
    employeeSatisfaction: number;
    diversityScore: number;
    safetyIncidents: number;
    communityInvestment: number;
    trainingHours: number;
  };
  governance: {
    boardDiversity: number;
    ethicsTraining: boolean;
    transparencyScore: number;
    complianceScore: number;
    auditFrequency: number;
  };
  overallScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  carbonCredits: number;
  requirements: {
    type: string;
    target: number;
    unit: string;
  };
  duration: {
    startDate: string;
    endDate: string;
  };
  participants: number;
  maxParticipants?: number;
  status: 'upcoming' | 'active' | 'completed' | 'expired';
  badge?: {
    name: string;
    image: string;
  };
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
}

export interface CarbonTransaction {
  _id: string;
  userId: string;
  type: 'earn' | 'spend' | 'offset';
  amount: number;
  source: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minESG?: number;
  maxCarbonFootprint?: number;
  certifications?: string[];
  blockchainVerified?: boolean;
  sortBy?: 'price' | 'esg' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}
