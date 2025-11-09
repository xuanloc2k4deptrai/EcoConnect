/**
 * Gamification Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import * as gamificationController from '../controllers/gamification.controller';

const router = Router();

// Public routes
router.get('/challenges', gamificationController.getAllChallenges);
router.get('/challenges/:id', gamificationController.getChallengeById);

// Protected routes
router.use(protect);

// User challenge routes
router.post('/challenges/:id/enroll', gamificationController.enrollChallenge);
router.post('/challenges/:id/checkin', gamificationController.checkIn);
router.get('/my-challenges', gamificationController.getMyChallenges);
router.get('/challenges/:id/progress', gamificationController.getProgress);
router.post('/challenges/:id/complete', gamificationController.completeChallenge);

// Community
router.get('/leaderboard', gamificationController.getLeaderboard);
router.get('/community-feed', gamificationController.getCommunityFeed);
router.post('/share-achievement', gamificationController.shareAchievement);

// Admin routes
router.post(
  '/challenges',
  restrictTo('admin'),
  gamificationController.createChallenge
);

router.patch(
  '/challenges/:id',
  restrictTo('admin'),
  gamificationController.updateChallenge
);

router.delete(
  '/challenges/:id',
  restrictTo('admin'),
  gamificationController.deleteChallenge
);

export default router;
