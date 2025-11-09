/**
 * Authentication Middleware
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import User from '../models/User.model';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Vui lòng đăng nhập để truy cập', 401));
    }

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('Người dùng không tồn tại', 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('Tài khoản đã bị vô hiệu hóa', 401));
    }

    // Grant access
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 401));
  }
};

// Restrict to specific roles
export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Bạn không có quyền thực hiện hành động này', 403)
      );
    }
    next();
  };
};

// Verify email middleware
export const requireEmailVerification = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isEmailVerified) {
    return next(
      new AppError('Vui lòng xác thực email trước khi tiếp tục', 403)
    );
  }
  next();
};
