/**
 * Blockchain Routes
 */

import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import * as blockchainController from '../controllers/blockchain.controller';

const router = Router();

// Public routes
router.get('/passport/:productId', blockchainController.getPassport);
router.get('/verify/:tokenId', blockchainController.verifyNFT);

// Protected routes - business only
router.use(protect, restrictTo('business', 'admin'));

router.post('/mint-passport', blockchainController.mintPassport);
router.post('/update-passport/:tokenId', blockchainController.updatePassport);
router.get('/my-nfts', blockchainController.getMyNFTs);
router.post('/upload-metadata', blockchainController.uploadToIPFS);

export default router;
