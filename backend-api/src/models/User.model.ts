/**
 * User Model
 * 
 * Schema cho người dùng (consumer và business)
 */

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'consumer' | 'business' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: Date;
  };
  
  // Business specific
  businessInfo?: {
    companyName: string;
    taxId: string;
    businessType: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    greenCertifications: string[];
  };
  
  // Carbon Wallet
  carbonWallet: {
    totalSaved: number;
    currentPoints: number;
    level: number;
    badges: string[];
  };
  
  // Gamification
  gamification: {
    greenScore: number;
    streakDays: number;
    lastCheckIn: Date;
    completedChallenges: mongoose.Types.ObjectId[];
  };
  
  address: Array<{
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  
  preferences: {
    language: 'vi' | 'en';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    sustainabilityGoals: string[];
  };
  
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
    },
    
    password: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      minlength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'],
      select: false
    },
    
    role: {
      type: String,
      enum: ['consumer', 'business', 'admin'],
      default: 'consumer'
    },
    
    profile: {
      firstName: {
        type: String,
        required: [true, 'Tên là bắt buộc']
      },
      lastName: {
        type: String,
        required: [true, 'Họ là bắt buộc']
      },
      avatar: String,
      phone: String,
      dateOfBirth: Date
    },
    
    businessInfo: {
      companyName: String,
      taxId: String,
      businessType: String,
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      },
      greenCertifications: [String]
    },
    
    carbonWallet: {
      totalSaved: {
        type: Number,
        default: 0
      },
      currentPoints: {
        type: Number,
        default: 0
      },
      level: {
        type: Number,
        default: 1
      },
      badges: [String]
    },
    
    gamification: {
      greenScore: {
        type: Number,
        default: 0
      },
      streakDays: {
        type: Number,
        default: 0
      },
      lastCheckIn: Date,
      completedChallenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge'
      }]
    },
    
    address: [{
      label: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'Vietnam'
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    
    preferences: {
      language: {
        type: String,
        enum: ['vi', 'en'],
        default: 'vi'
      },
      notifications: {
        email: {
          type: Boolean,
          default: true
        },
        push: {
          type: Boolean,
          default: true
        },
        sms: {
          type: Boolean,
          default: false
        }
      },
      sustainabilityGoals: [String]
    },
    
    isActive: {
      type: Boolean,
      default: true
    },
    
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    
    lastLogin: Date
  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'carbonWallet.greenScore': -1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
UserSchema.virtual('profile.fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

export default mongoose.model<IUser>('User', UserSchema);
