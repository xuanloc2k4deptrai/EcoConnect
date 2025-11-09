/**
 * Redis Configuration
 * 
 * Cấu hình Redis client cho caching
 */

import Redis from 'ioredis';
import { logger } from '../utils/logger';

let redisClient: Redis;

export const connectRedis = async (): Promise<Redis> => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully');
    });

    redisClient.on('error', (error) => {
      logger.error('❌ Redis connection error:', error);
    });

    // Test connection
    await redisClient.ping();

    return redisClient;
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return redisClient;
};

/**
 * Cache Helper Functions
 */
export const cacheService = {
  /**
   * Lưu dữ liệu vào cache
   */
  set: async (key: string, value: any, ttl: number = 3600): Promise<void> => {
    try {
      const client = getRedisClient();
      await client.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  },

  /**
   * Lấy dữ liệu từ cache
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const client = getRedisClient();
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  },

  /**
   * Xóa dữ liệu khỏi cache
   */
  del: async (key: string): Promise<void> => {
    try {
      const client = getRedisClient();
      await client.del(key);
    } catch (error) {
      logger.error('Cache delete error:', error);
    }
  },

  /**
   * Xóa nhiều keys theo pattern
   */
  delPattern: async (pattern: string): Promise<void> => {
    try {
      const client = getRedisClient();
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(...keys);
      }
    } catch (error) {
      logger.error('Cache delete pattern error:', error);
    }
  }
};

export default redisClient;
