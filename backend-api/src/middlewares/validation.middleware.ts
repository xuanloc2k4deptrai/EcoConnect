/**
 * Validation Middleware
 */

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './error.middleware';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return next(new AppError(JSON.stringify(errors), 400));
    }

    next();
  };
};

// Common validation schemas
export const schemas = {
  // Product validation
  createProduct: Joi.object({
    name: Joi.string().required().max(200),
    description: Joi.string().required().max(5000),
    category: Joi.string().required().valid(
      'fashion', 'food', 'electronics', 'home', 
      'beauty', 'sports', 'books', 'toys', 'other'
    ),
    price: Joi.number().required().min(0),
    currency: Joi.string().valid('VND', 'USD', 'EUR').default('VND'),
    images: Joi.array().items(Joi.string()).min(1).required(),
    esgScore: Joi.object({
      environmental: Joi.number().min(0).max(100).required(),
      social: Joi.number().min(0).max(100).required(),
      governance: Joi.number().min(0).max(100).required()
    }).required(),
    carbonFootprint: Joi.object({
      production: Joi.number().min(0),
      transportation: Joi.number().min(0)
    }),
    certifications: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      issuer: Joi.string().required(),
      certificateUrl: Joi.string().uri(),
      validUntil: Joi.date()
    })),
    sustainability: Joi.object({
      recyclable: Joi.boolean(),
      biodegradable: Joi.boolean(),
      renewable: Joi.boolean(),
      locallySourced: Joi.boolean(),
      fairTrade: Joi.boolean()
    }),
    inventory: Joi.object({
      quantity: Joi.number().required().min(0),
      unit: Joi.string(),
      lowStockThreshold: Joi.number()
    }).required(),
    tags: Joi.array().items(Joi.string())
  }),

  // User registration
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('consumer', 'business').default('consumer'),
    profile: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string(),
      dateOfBirth: Joi.date()
    }).required(),
    businessInfo: Joi.when('role', {
      is: 'business',
      then: Joi.object({
        companyName: Joi.string().required(),
        taxId: Joi.string().required(),
        businessType: Joi.string().required()
      })
    })
  }),

  // Login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // ESG Metrics
  createESGMetrics: Joi.object({
    reportingPeriod: Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      quarter: Joi.number().min(1).max(4),
      year: Joi.number().required()
    }).required(),
    environmental: Joi.object({
      co2Emissions: Joi.object({
        scope1: Joi.number().min(0),
        scope2: Joi.number().min(0),
        scope3: Joi.number().min(0)
      }),
      energy: Joi.object({
        totalConsumption: Joi.number().min(0),
        renewablePercentage: Joi.number().min(0).max(100)
      }),
      water: Joi.object({
        consumption: Joi.number().min(0),
        recycled: Joi.number().min(0)
      }),
      waste: Joi.object({
        generated: Joi.number().min(0),
        recycled: Joi.number().min(0)
      })
    }),
    social: Joi.object({
      employees: Joi.object({
        total: Joi.number().min(0)
      })
    }),
    governance: Joi.object()
  })
};
