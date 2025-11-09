/**
 * User Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import * as userController from '../controllers/user.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// User profile
router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.delete('/profile', userController.deleteAccount);

// Address management
router.get('/addresses', userController.getAddresses);
router.post('/addresses', userController.addAddress);
router.patch('/addresses/:id', userController.updateAddress);
router.delete('/addresses/:id', userController.deleteAddress);

// Preferences
router.get('/preferences', userController.getPreferences);
router.patch('/preferences', userController.updatePreferences);

// Business verification
router.post(
  '/verify-business',
  restrictTo('business'),
  userController.requestBusinessVerification
);

// Admin routes
router.get('/admin/all', restrictTo('admin'), userController.getAllUsers);
router.get('/admin/:id', restrictTo('admin'), userController.getUserById);
router.patch('/admin/:id/status', restrictTo('admin'), userController.updateUserStatus);
router.patch(
  '/admin/:id/verify-business',
  restrictTo('admin'),
  userController.verifyBusiness
);

export default router;
