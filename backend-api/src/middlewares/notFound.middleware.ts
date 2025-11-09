/**
 * Not Found Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Không tìm thấy route ${req.originalUrl}`, 404));
};
