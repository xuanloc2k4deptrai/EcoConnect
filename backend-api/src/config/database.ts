/**
 * Database Configuration
 * 
 * Kết nối MongoDB và PostgreSQL
 */

import mongoose from 'mongoose';
import { Pool } from 'pg';
import { logger } from '../utils/logger';

/**
 * Kết nối MongoDB
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoconnect';
    
    await mongoose.connect(mongoUri);
    
    logger.info('✅ MongoDB connected successfully');
    
    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

/**
 * PostgreSQL Pool cho Analytics
 */
export const pgPool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pgPool.on('connect', () => {
  logger.info('✅ PostgreSQL connected');
});

pgPool.on('error', (err) => {
  logger.error('PostgreSQL error:', err);
});

export const connectPostgres = async (): Promise<void> => {
  try {
    await pgPool.query('SELECT NOW()');
    logger.info('✅ PostgreSQL pool initialized');
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};
