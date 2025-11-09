/**
 * EcoConnect Backend API - Entry Point
 * 
 * Khởi tạo Express server với các middleware và routes
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFound.middleware';
import { rateLimiter } from './middlewares/rateLimiter.middleware';

// Routes
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import esgRoutes from './routes/esg.routes';
import carbonWalletRoutes from './routes/carbonWallet.routes';
import gamificationRoutes from './routes/gamification.routes';
import blockchainRoutes from './routes/blockchain.routes';
import logisticsRoutes from './routes/logistics.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Rate limiting
app.use('/api/', rateLimiter);

// ==========================================
// ROUTES
// ==========================================

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/esg', esgRoutes);
app.use('/api/v1/carbon-wallet', carbonWalletRoutes);
app.use('/api/v1/gamification', gamificationRoutes);
app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/logistics', logisticsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// ==========================================
// SERVER INITIALIZATION
// ==========================================

const startServer = async () => {
  try {
    // Connect to databases
    await connectDatabase();
    await connectRedis();

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 EcoConnect Backend API running on port ${PORT}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🌍 API Base URL: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start the server
startServer();

export default app;
