/**
 * ESG Metrics Model
 * 
 * Schema cho dữ liệu ESG của doanh nghiệp
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IESGMetrics extends Document {
  business: mongoose.Types.ObjectId;
  reportingPeriod: {
    startDate: Date;
    endDate: Date;
    quarter?: number;
    year: number;
  };
  
  // Environmental Metrics
  environmental: {
    co2Emissions: {
      scope1: number; // Direct emissions
      scope2: number; // Indirect emissions
      scope3: number; // Value chain emissions
      total: number;
      unit: string;
      reduction: number; // % reduction from previous period
    };
    
    energy: {
      totalConsumption: number;
      renewablePercentage: number;
      unit: string;
    };
    
    water: {
      consumption: number;
      recycled: number;
      unit: string;
    };
    
    waste: {
      generated: number;
      recycled: number;
      recyclingRate: number;
      unit: string;
    };
    
    biodiversity: {
      protectedAreas: number;
      restorationProjects: number;
    };
  };
  
  // Social Metrics
  social: {
    employees: {
      total: number;
      diversity: {
        femalePercentage: number;
        minorityPercentage: number;
      };
      training: {
        hoursPerEmployee: number;
        participants: number;
      };
      safety: {
        incidents: number;
        lostTimeInjuryRate: number;
      };
    };
    
    community: {
      investmentAmount: number;
      volunteersHours: number;
      beneficiaries: number;
    };
    
    supplyChain: {
      auditedSuppliers: number;
      fairTradeSuppliers: number;
      localSourcingPercentage: number;
    };
  };
  
  // Governance Metrics
  governance: {
    boardComposition: {
      totalMembers: number;
      independentMembers: number;
      femaleMembers: number;
    };
    
    ethics: {
      codeOfConduct: boolean;
      whistleblowerPolicy: boolean;
      anticorruptionTraining: boolean;
    };
    
    transparency: {
      esgReportPublished: boolean;
      auditedFinancials: boolean;
      stakeholderEngagement: boolean;
    };
  };
  
  // Overall Scores
  scores: {
    environmentalScore: number;
    socialScore: number;
    governanceScore: number;
    overallScore: number;
  };
  
  // AI Recommendations
  aiRecommendations: Array<{
    category: string;
    recommendation: string;
    impact: 'high' | 'medium' | 'low';
    estimatedImprovement: number;
    implementationCost: string;
  }>;
  
  status: 'draft' | 'submitted' | 'verified' | 'published';
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
}

const ESGMetricsSchema: Schema = new Schema(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    reportingPeriod: {
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      quarter: {
        type: Number,
        min: 1,
        max: 4
      },
      year: {
        type: Number,
        required: true
      }
    },
    
    environmental: {
      co2Emissions: {
        scope1: { type: Number, default: 0 },
        scope2: { type: Number, default: 0 },
        scope3: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        unit: { type: String, default: 'tCO2e' },
        reduction: { type: Number, default: 0 }
      },
      energy: {
        totalConsumption: { type: Number, default: 0 },
        renewablePercentage: { type: Number, default: 0 },
        unit: { type: String, default: 'MWh' }
      },
      water: {
        consumption: { type: Number, default: 0 },
        recycled: { type: Number, default: 0 },
        unit: { type: String, default: 'm³' }
      },
      waste: {
        generated: { type: Number, default: 0 },
        recycled: { type: Number, default: 0 },
        recyclingRate: { type: Number, default: 0 },
        unit: { type: String, default: 'ton' }
      },
      biodiversity: {
        protectedAreas: { type: Number, default: 0 },
        restorationProjects: { type: Number, default: 0 }
      }
    },
    
    social: {
      employees: {
        total: { type: Number, default: 0 },
        diversity: {
          femalePercentage: { type: Number, default: 0 },
          minorityPercentage: { type: Number, default: 0 }
        },
        training: {
          hoursPerEmployee: { type: Number, default: 0 },
          participants: { type: Number, default: 0 }
        },
        safety: {
          incidents: { type: Number, default: 0 },
          lostTimeInjuryRate: { type: Number, default: 0 }
        }
      },
      community: {
        investmentAmount: { type: Number, default: 0 },
        volunteersHours: { type: Number, default: 0 },
        beneficiaries: { type: Number, default: 0 }
      },
      supplyChain: {
        auditedSuppliers: { type: Number, default: 0 },
        fairTradeSuppliers: { type: Number, default: 0 },
        localSourcingPercentage: { type: Number, default: 0 }
      }
    },
    
    governance: {
      boardComposition: {
        totalMembers: { type: Number, default: 0 },
        independentMembers: { type: Number, default: 0 },
        femaleMembers: { type: Number, default: 0 }
      },
      ethics: {
        codeOfConduct: { type: Boolean, default: false },
        whistleblowerPolicy: { type: Boolean, default: false },
        anticorruptionTraining: { type: Boolean, default: false }
      },
      transparency: {
        esgReportPublished: { type: Boolean, default: false },
        auditedFinancials: { type: Boolean, default: false },
        stakeholderEngagement: { type: Boolean, default: false }
      }
    },
    
    scores: {
      environmentalScore: { type: Number, min: 0, max: 100, default: 0 },
      socialScore: { type: Number, min: 0, max: 100, default: 0 },
      governanceScore: { type: Number, min: 0, max: 100, default: 0 },
      overallScore: { type: Number, min: 0, max: 100, default: 0 }
    },
    
    aiRecommendations: [{
      category: String,
      recommendation: String,
      impact: {
        type: String,
        enum: ['high', 'medium', 'low']
      },
      estimatedImprovement: Number,
      implementationCost: String
    }],
    
    status: {
      type: String,
      enum: ['draft', 'submitted', 'verified', 'published'],
      default: 'draft'
    },
    
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    
    verifiedAt: Date
  },
  {
    timestamps: true
  }
);

// Indexes
ESGMetricsSchema.index({ business: 1, 'reportingPeriod.year': -1 });
ESGMetricsSchema.index({ status: 1 });
ESGMetricsSchema.index({ 'scores.overallScore': -1 });

// Calculate total CO2 emissions
ESGMetricsSchema.pre('save', function(next) {
  if (this.environmental?.co2Emissions) {
    this.environmental.co2Emissions.total = 
      this.environmental.co2Emissions.scope1 +
      this.environmental.co2Emissions.scope2 +
      this.environmental.co2Emissions.scope3;
  }
  
  // Calculate recycling rate
  if (this.environmental?.waste) {
    const { generated, recycled } = this.environmental.waste;
    this.environmental.waste.recyclingRate = 
      generated > 0 ? (recycled / generated) * 100 : 0;
  }
  
  // Calculate overall ESG score
  if (this.scores) {
    this.scores.overallScore = Math.round(
      (this.scores.environmentalScore + 
       this.scores.socialScore + 
       this.scores.governanceScore) / 3
    );
  }
  
  next();
});

export default mongoose.model<IESGMetrics>('ESGMetrics', ESGMetricsSchema);
