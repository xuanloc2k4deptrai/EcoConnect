/**
 * Authentication Routes
 */

import { Router } from 'express';
import { authRateLimiter } from '../middlewares/rateLimiter.middleware';
import { validate, schemas } from '../middlewares/validation.middleware';
import * as authController from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Authentication
router.post(
  '/register',
  authRateLimiter,
  validate(schemas.register),
  authController.register
);

router.post(
  '/login',
  authRateLimiter,
  validate(schemas.login),
  authController.login
);

router.post('/logout', protect, authController.logout);

router.post('/refresh-token', authController.refreshToken);

router.post('/forgot-password', authRateLimiter, authController.forgotPassword);

router.patch('/reset-password/:token', authController.resetPassword);

router.post('/verify-email/:token', authController.verifyEmail);

router.post('/resend-verification', protect, authController.resendVerification);

// OAuth
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookAuthCallback);

// Protected routes
router.use(protect);

router.patch('/change-password', authController.changePassword);
router.get('/me', authController.getMe);

export default router;
