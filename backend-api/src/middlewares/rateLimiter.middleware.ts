/**
 * Rate Limiter Middleware
 */

import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Quá nhiều requests từ IP này, vui lòng thử lại sau.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Quá nhiều lần đăng nhập, vui lòng thử lại sau 15 phút.',
  skipSuccessfulRequests: true,
});
