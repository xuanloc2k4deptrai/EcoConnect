/**
 * Product Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate, schemas } from '../middlewares/validation.middleware';
import * as productController from '../controllers/product.controller';

const router = Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProduct);

// Protected routes - require authentication
router.use(protect);

// Business routes
router.post(
  '/',
  restrictTo('business', 'admin'),
  validate(schemas.createProduct),
  productController.createProduct
);

router.patch(
  '/:id',
  restrictTo('business', 'admin'),
  productController.updateProduct
);

router.delete(
  '/:id',
  restrictTo('business', 'admin'),
  productController.deleteProduct
);

// Reviews
router.post('/:id/reviews', productController.addReview);

export default router;
