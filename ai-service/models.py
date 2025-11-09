"""
Pydantic Models for AI Service
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum

# ===================================
# LOGISTICS MODELS
# ===================================

class VehicleType(str, Enum):
    ELECTRIC_CAR = "electric_car"
    ELECTRIC_BIKE = "electric_bike"
    BIKE = "bike"
    HYBRID_CAR = "hybrid_car"
    DIESEL_TRUCK = "diesel_truck"

class OptimizationMode(str, Enum):
    FASTEST = "fastest"
    SHORTEST = "shortest"
    GREENEST = "greenest"
    BALANCED = "balanced"

class Location(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    address: Optional[str] = None

class RouteOptimizationRequest(BaseModel):
    origin: Location
    destinations: List[Location]
    vehicle_type: VehicleType = VehicleType.ELECTRIC_CAR
    optimization_mode: OptimizationMode = OptimizationMode.GREENEST
    max_distance: Optional[float] = None
    time_windows: Optional[List[Dict]] = None

class RouteSegment(BaseModel):
    from_location: Location
    to_location: Location
    distance_km: float
    duration_minutes: float
    carbon_emissions_kg: float

class RouteOptimizationResponse(BaseModel):
    optimized_route: List[Location]
    segments: List[RouteSegment]
    total_distance_km: float
    total_duration_minutes: float
    total_carbon_kg: float
    carbon_saved_kg: float
    carbon_saved_percentage: float
    green_score: float

# ===================================
# CARBON FOOTPRINT MODELS
# ===================================

class CarbonFootprintRequest(BaseModel):
    distance_km: float
    vehicle_type: VehicleType
    weight_kg: Optional[float] = 0
    
class CarbonFootprintResponse(BaseModel):
    carbon_kg: float
    carbon_per_km: float
    equivalent_trees: float
    equivalent_km_driven: float

# ===================================
# ESG MODELS
# ===================================

class EnvironmentalData(BaseModel):
    co2_emissions_scope1: float = 0
    co2_emissions_scope2: float = 0
    co2_emissions_scope3: float = 0
    energy_consumption: float = 0
    renewable_energy_percentage: float = 0
    water_consumption: float = 0
    water_recycled: float = 0
    waste_generated: float = 0
    waste_recycled: float = 0

class SocialData(BaseModel):
    total_employees: int = 0
    female_percentage: float = 0
    minority_percentage: float = 0
    training_hours_per_employee: float = 0
    safety_incidents: int = 0
    community_investment: float = 0
    local_sourcing_percentage: float = 0

class GovernanceData(BaseModel):
    board_members: int = 0
    independent_board_members: int = 0
    female_board_members: int = 0
    has_code_of_conduct: bool = False
    has_whistleblower_policy: bool = False
    has_anticorruption_training: bool = False
    publishes_esg_report: bool = False

class ESGAnalysisRequest(BaseModel):
    business_id: str
    industry: str
    environmental: EnvironmentalData
    social: SocialData
    governance: GovernanceData

class ImpactLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class ESGRecommendation(BaseModel):
    category: str
    title: str
    description: str
    impact: ImpactLevel
    estimated_improvement: float
    implementation_cost: str
    priority: int
    timeline: str
    resources: List[str] = []

# ===================================
# PACKAGING MODELS
# ===================================

class PackagingSuggestion(BaseModel):
    material: str
    biodegradable: bool
    recyclable: bool
    carbon_footprint_kg: float
    cost_estimate: str
    suppliers: List[str] = []
    certifications: List[str] = []
