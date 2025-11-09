/**
 * Product Model
 * 
 * Schema cho sản phẩm xanh với thông tin ESG và chứng nhận
 */

import mongoose, { Schema, Document } from 'mongoose';

// Interface cho TypeScript
export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  seller: mongoose.Types.ObjectId;
  
  // Green Credentials
  esgScore: {
    environmental: number;
    social: number;
    governance: number;
    overall: number;
  };
  
  carbonFootprint: {
    production: number;
    transportation: number;
    total: number;
    unit: string;
  };
  
  certifications: Array<{
    name: string;
    issuer: string;
    certificateUrl: string;
    validUntil: Date;
    verified: boolean;
  }>;
  
  // Blockchain Integration
  blockchainPassport: {
    nftTokenId: string;
    contractAddress: string;
    ipfsHash: string;
    verified: boolean;
  };
  
  sustainability: {
    recyclable: boolean;
    biodegradable: boolean;
    renewable: boolean;
    locallySourced: boolean;
    fairTrade: boolean;
  };
  
  inventory: {
    quantity: number;
    unit: string;
    lowStockThreshold: number;
  };
  
  ratings: {
    average: number;
    count: number;
  };
  
  tags: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  featured: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true,
      maxlength: [200, 'Tên sản phẩm không được quá 200 ký tự']
    },
    
    description: {
      type: String,
      required: [true, 'Mô tả sản phẩm là bắt buộc'],
      maxlength: [5000, 'Mô tả không được quá 5000 ký tự']
    },
    
    category: {
      type: String,
      required: true,
      enum: [
        'fashion',
        'food',
        'electronics',
        'home',
        'beauty',
        'sports',
        'books',
        'toys',
        'other'
      ]
    },
    
    price: {
      type: Number,
      required: [true, 'Giá sản phẩm là bắt buộc'],
      min: [0, 'Giá không thể âm']
    },
    
    currency: {
      type: String,
      default: 'VND',
      enum: ['VND', 'USD', 'EUR']
    },
    
    images: [{
      type: String,
      required: true
    }],
    
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    esgScore: {
      environmental: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      social: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      governance: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      overall: {
        type: Number,
        min: 0,
        max: 100
      }
    },
    
    carbonFootprint: {
      production: {
        type: Number,
        default: 0
      },
      transportation: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      },
      unit: {
        type: String,
        default: 'kgCO2e'
      }
    },
    
    certifications: [{
      name: String,
      issuer: String,
      certificateUrl: String,
      validUntil: Date,
      verified: {
        type: Boolean,
        default: false
      }
    }],
    
    blockchainPassport: {
      nftTokenId: String,
      contractAddress: String,
      ipfsHash: String,
      verified: {
        type: Boolean,
        default: false
      }
    },
    
    sustainability: {
      recyclable: {
        type: Boolean,
        default: false
      },
      biodegradable: {
        type: Boolean,
        default: false
      },
      renewable: {
        type: Boolean,
        default: false
      },
      locallySourced: {
        type: Boolean,
        default: false
      },
      fairTrade: {
        type: Boolean,
        default: false
      }
    },
    
    inventory: {
      quantity: {
        type: Number,
        required: true,
        min: 0
      },
      unit: {
        type: String,
        default: 'piece'
      },
      lowStockThreshold: {
        type: Number,
        default: 10
      }
    },
    
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },
    
    tags: [String],
    
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock'],
      default: 'active'
    },
    
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ seller: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ 'esgScore.overall': -1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: -1, createdAt: -1 });

// Calculate overall ESG score before saving
ProductSchema.pre('save', function(next) {
  if (this.esgScore) {
    this.esgScore.overall = Math.round(
      (this.esgScore.environmental + this.esgScore.social + this.esgScore.governance) / 3
    );
  }
  
  // Calculate total carbon footprint
  if (this.carbonFootprint) {
    this.carbonFootprint.total = 
      this.carbonFootprint.production + this.carbonFootprint.transportation;
  }
  
  // Update stock status
  if (this.inventory.quantity === 0) {
    this.status = 'out_of_stock';
  }
  
  next();
});

// Virtual for reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});

export default mongoose.model<IProduct>('Product', ProductSchema);
