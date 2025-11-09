/**
 * Order Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import * as orderController from '../controllers/order.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// Order management
router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/cancel', orderController.cancelOrder);

// Payment
router.post('/:id/payment', orderController.processPayment);
router.get('/:id/payment-status', orderController.getPaymentStatus);

// Business routes
router.get(
  '/business/all',
  restrictTo('business', 'admin'),
  orderController.getBusinessOrders
);

router.patch(
  '/:id/status',
  restrictTo('business', 'admin'),
  orderController.updateOrderStatus
);

// Tracking
router.get('/:id/tracking', orderController.getTracking);

export default router;
