/**
 * ESG Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate, schemas } from '../middlewares/validation.middleware';
import * as esgController from '../controllers/esg.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// Business routes
router.post(
  '/metrics',
  restrictTo('business', 'admin'),
  validate(schemas.createESGMetrics),
  esgController.createMetrics
);

router.get(
  '/metrics',
  restrictTo('business', 'admin'),
  esgController.getMyMetrics
);

router.get('/metrics/:id', esgController.getMetricsById);

router.patch(
  '/metrics/:id',
  restrictTo('business', 'admin'),
  esgController.updateMetrics
);

router.delete(
  '/metrics/:id',
  restrictTo('business', 'admin'),
  esgController.deleteMetrics
);

// Submit for verification
router.post(
  '/metrics/:id/submit',
  restrictTo('business'),
  esgController.submitForVerification
);

// Get AI recommendations
router.get(
  '/metrics/:id/recommendations',
  restrictTo('business', 'admin'),
  esgController.getAIRecommendations
);

// Export report
router.get(
  '/metrics/:id/export',
  restrictTo('business', 'admin'),
  esgController.exportReport
);

// Dashboard analytics
router.get(
  '/dashboard',
  restrictTo('business', 'admin'),
  esgController.getDashboard
);

// Comparison with industry average
router.get(
  '/benchmark',
  restrictTo('business', 'admin'),
  esgController.getBenchmark
);

// Admin routes
router.patch(
  '/metrics/:id/verify',
  restrictTo('admin'),
  esgController.verifyMetrics
);

router.get('/admin/pending', restrictTo('admin'), esgController.getPendingMetrics);

export default router;
