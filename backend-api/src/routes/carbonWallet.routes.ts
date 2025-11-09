/**
 * Carbon Wallet Routes
 */

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import * as carbonWalletController from '../controllers/carbonWallet.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// Get wallet
router.get('/', carbonWalletController.getWallet);

// Get transactions
router.get('/transactions', carbonWalletController.getTransactions);

// Get leaderboard
router.get('/leaderboard', carbonWalletController.getLeaderboard);

// Add carbon savings
router.post('/add-savings', carbonWalletController.addSavings);

// Redeem points
router.post('/redeem', carbonWalletController.redeemPoints);

// Get available rewards
router.get('/rewards', carbonWalletController.getAvailableRewards);

// Get impact statistics
router.get('/impact', carbonWalletController.getImpactStats);

// Get badges
router.get('/badges', carbonWalletController.getBadges);

export default router;
