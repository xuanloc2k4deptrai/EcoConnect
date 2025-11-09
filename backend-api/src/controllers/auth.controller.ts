/**
 * Authentication Controller
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

/**
 * Generate JWT token
 */
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || 'refresh-secret', {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d'
  });
};

/**
 * Register new user
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role, profile, businessInfo } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email đã được sử dụng', 400));
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role,
      profile,
      businessInfo: role === 'business' ? businessInfo : undefined
    });

    // Generate tokens
    const token = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      },
      message: 'Đăng ký thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Email hoặc mật khẩu không đúng', 401));
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new AppError('Email hoặc mật khẩu không đúng', 401));
    }

    // Check if account is active
    if (!user.isActive) {
      return next(new AppError('Tài khoản đã bị vô hiệu hóa', 401));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate tokens
    const token = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Remove password from output
    user.password = undefined as any;

    res.json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      },
      message: 'Đăng nhập thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Add token to blacklist
    res.json({
      success: true,
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh token
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError('Refresh token không được cung cấp', 400));
    }

    // Verify refresh token
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'refresh-secret'
    );

    // Generate new tokens
    const newToken = generateToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    return next(new AppError('Refresh token không hợp lệ', 401));
  }
};

/**
 * Get current user
 */
export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 */
export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return next(new AppError('Người dùng không tồn tại', 404));
    }

    // Verify current password
    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      return next(new AppError('Mật khẩu hiện tại không đúng', 400));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password - TODO: Implement email sending
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: 'Email reset password đã được gửi'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password - TODO: Implement token verification
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify email - TODO: Implement
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: 'Email đã được xác thực'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resend verification email - TODO: Implement
 */
export const resendVerification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: 'Email xác thực đã được gửi lại'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Google OAuth - TODO: Implement
 */
export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ message: 'Google OAuth coming soon' });
  } catch (error) {
    next(error);
  }
};

export const googleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ message: 'Google OAuth callback' });
  } catch (error) {
    next(error);
  }
};

/**
 * Facebook OAuth - TODO: Implement
 */
export const facebookAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ message: 'Facebook OAuth coming soon' });
  } catch (error) {
    next(error);
  }
};

export const facebookAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ message: 'Facebook OAuth callback' });
  } catch (error) {
    next(error);
  }
};
