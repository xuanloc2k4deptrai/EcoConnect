/**
 * Product Controller
 * 
 * Xử lý logic cho Green Marketplace
 */

import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.model';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';
import { cacheService } from '../config/redis';

/**
 * Get all products with filtering, sorting, and pagination
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      minESG,
      maxCarbon,
      certifications,
      recyclable,
      biodegradable,
      fairTrade,
      sort = '-createdAt',
      page = 1,
      limit = 20,
      search
    } = req.query;

    // Build filter object
    const filter: any = { status: 'active' };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minESG) filter['esgScore.overall'] = { $gte: Number(minESG) };
    if (maxCarbon) filter['carbonFootprint.total'] = { $lte: Number(maxCarbon) };
    if (certifications) filter['certifications.name'] = { $in: (certifications as string).split(',') };
    
    // Sustainability filters
    if (recyclable === 'true') filter['sustainability.recyclable'] = true;
    if (biodegradable === 'true') filter['sustainability.biodegradable'] = true;
    if (fairTrade === 'true') filter['sustainability.fairTrade'] = true;

    // Text search
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Check cache
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Query
    const products = await Product.find(filter)
      .populate('seller', 'profile.companyName profile.avatar')
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    const result = {
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    };

    // Cache result for 5 minutes
    await cacheService.set(cacheKey, result, 300);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({ featured: true, status: 'active' })
      .populate('seller', 'profile.companyName')
      .limit(10)
      .sort('-esgScore.overall');

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search products
 */
export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return next(new AppError('Vui lòng nhập từ khóa tìm kiếm', 400));
    }

    const products = await Product.find(
      { $text: { $search: q as string }, status: 'active' },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(Number(limit));

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product
 */
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'profile businessInfo')
      .populate('reviews');

    if (!product) {
      return next(new AppError('Không tìm thấy sản phẩm', 404));
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new product
 */
export const createProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user._id
    };

    const product = await Product.create(productData);

    // Clear products cache
    await cacheService.delPattern('products:*');

    res.status(201).json({
      success: true,
      data: product,
      message: 'Tạo sản phẩm thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product
 */
export const updateProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Không tìm thấy sản phẩm', 404));
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('Bạn không có quyền chỉnh sửa sản phẩm này', 403));
    }

    Object.assign(product, req.body);
    await product.save();

    // Clear cache
    await cacheService.delPattern('products:*');

    res.json({
      success: true,
      data: product,
      message: 'Cập nhật sản phẩm thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Không tìm thấy sản phẩm', 404));
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('Bạn không có quyền xóa sản phẩm này', 403));
    }

    await product.deleteOne();

    // Clear cache
    await cacheService.delPattern('products:*');

    res.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add review
 */
export const addReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Implement review functionality
    res.json({
      success: true,
      message: 'Add review functionality coming soon'
    });
  } catch (error) {
    next(error);
  }
};
