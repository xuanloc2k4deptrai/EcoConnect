/**
 * Logistics Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import * as logisticsController from '../controllers/logistics.controller';

const router = Router();

// Protected routes - business only
router.use(protect, restrictTo('business', 'admin'));

// Route optimization
router.post('/optimize-route', logisticsController.optimizeRoute);

// Batch orders
router.post('/batch-orders', logisticsController.batchOrders);

// Packaging suggestions
router.get('/packaging-suggestions', logisticsController.getPackagingSuggestions);

// Carbon footprint calculation
router.post('/calculate-footprint', logisticsController.calculateFootprint);

// Green delivery options
router.get('/green-options/:orderId', logisticsController.getGreenOptions);

// Logistics analytics
router.get('/analytics', logisticsController.getAnalytics);

export default router;
