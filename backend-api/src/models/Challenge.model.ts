/**
 * Challenge Model
 * 
 * Schema cho Green Challenges (Gamification)
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // days
  
  goals: Array<{
    description: string;
    target: number;
    unit: string;
    carbonImpact: number; // CO2 saved
  }>;
  
  rewards: {
    points: number;
    badges: string[];
    carbonCredits: number;
    partnerDiscounts?: Array<{
      partnerId: mongoose.Types.ObjectId;
      discountPercentage: number;
      description: string;
    }>;
  };
  
  participants: {
    enrolled: number;
    completed: number;
    active: number;
  };
  
  startDate: Date;
  endDate: Date;
  
  isActive: boolean;
  isFeatured: boolean;
  
  checkInRequirements: {
    frequency: 'daily' | 'weekly' | 'custom';
    minCheckIns: number;
    proofRequired: boolean;
  };
  
  tips: string[];
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'pdf';
  }>;
}

const ChallengeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    
    category: {
      type: String,
      required: true,
      enum: [
        'zero_waste',
        'energy_saving',
        'sustainable_transport',
        'water_conservation',
        'sustainable_diet',
        'eco_shopping',
        'recycling',
        'other'
      ]
    },
    
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    
    goals: [{
      description: {
        type: String,
        required: true
      },
      target: {
        type: Number,
        required: true
      },
      unit: String,
      carbonImpact: {
        type: Number,
        default: 0
      }
    }],
    
    rewards: {
      points: {
        type: Number,
        required: true,
        default: 0
      },
      badges: [String],
      carbonCredits: {
        type: Number,
        default: 0
      },
      partnerDiscounts: [{
        partnerId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        discountPercentage: Number,
        description: String
      }]
    },
    
    participants: {
      enrolled: {
        type: Number,
        default: 0
      },
      completed: {
        type: Number,
        default: 0
      },
      active: {
        type: Number,
        default: 0
      }
    },
    
    startDate: {
      type: Date,
      required: true
    },
    
    endDate: {
      type: Date,
      required: true
    },
    
    isActive: {
      type: Boolean,
      default: true
    },
    
    isFeatured: {
      type: Boolean,
      default: false
    },
    
    checkInRequirements: {
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'custom'],
        default: 'daily'
      },
      minCheckIns: {
        type: Number,
        default: 1
      },
      proofRequired: {
        type: Boolean,
        default: false
      }
    },
    
    tips: [String],
    
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['article', 'video', 'pdf']
      }
    }]
  },
  {
    timestamps: true
  }
);

// Indexes
ChallengeSchema.index({ category: 1, isActive: 1 });
ChallengeSchema.index({ startDate: 1, endDate: 1 });
ChallengeSchema.index({ isFeatured: -1, startDate: -1 });

// Virtual for completion rate
ChallengeSchema.virtual('completionRate').get(function() {
  if (this.participants.enrolled === 0) return 0;
  return (this.participants.completed / this.participants.enrolled) * 100;
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
