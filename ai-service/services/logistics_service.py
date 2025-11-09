"""
Logistics Optimization Service

Tối ưu hóa tuyến đường, gom đơn và giảm carbon footprint
"""

import googlemaps
from typing import List, Dict, Tuple
import numpy as np
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from datetime import datetime

from ..models import (
    Location, RouteOptimizationResponse, RouteSegment,
    VehicleType, OptimizationMode, PackagingSuggestion
)

# Carbon emission factors (kg CO2 per km)
EMISSION_FACTORS = {
    VehicleType.ELECTRIC_CAR: 0.0,
    VehicleType.ELECTRIC_BIKE: 0.0,
    VehicleType.BIKE: 0.0,
    VehicleType.HYBRID_CAR: 0.08,
    VehicleType.DIESEL_TRUCK: 0.27,
}

class LogisticsService:
    def __init__(self):
        # Initialize Google Maps client (requires API key)
        # self.gmaps = googlemaps.Client(key=os.getenv('GOOGLE_MAPS_API_KEY'))
        pass
    
    async def optimize_route(
        self,
        origin: Location,
        destinations: List[Location],
        vehicle_type: VehicleType,
        optimization_mode: OptimizationMode
    ) -> RouteOptimizationResponse:
        """
        Tối ưu hóa tuyến đường giao hàng
        
        Sử dụng Google OR-Tools để tìm tuyến đường tối ưu
        """
        
        # Calculate distance matrix
        distance_matrix = self._calculate_distance_matrix(origin, destinations)
        
        # Solve TSP (Traveling Salesman Problem)
        optimized_order = self._solve_tsp(distance_matrix, optimization_mode)
        
        # Build optimized route
        optimized_route = [origin]
        segments = []
        total_distance = 0
        total_carbon = 0
        
        current_location = origin
        for idx in optimized_order:
            next_location = destinations[idx]
            
            # Calculate segment
            distance = self._calculate_distance(current_location, next_location)
            duration = self._estimate_duration(distance, vehicle_type)
            carbon = distance * EMISSION_FACTORS.get(vehicle_type, 0.15)
            
            segment = RouteSegment(
                from_location=current_location,
                to_location=next_location,
                distance_km=distance,
                duration_minutes=duration,
                carbon_emissions_kg=carbon
            )
            
            segments.append(segment)
            optimized_route.append(next_location)
            total_distance += distance
            total_carbon += carbon
            current_location = next_location
        
        # Calculate baseline carbon (without optimization)
        baseline_carbon = self._calculate_baseline_carbon(
            origin, destinations, vehicle_type
        )
        carbon_saved = max(0, baseline_carbon - total_carbon)
        carbon_saved_percentage = (carbon_saved / baseline_carbon * 100) if baseline_carbon > 0 else 0
        
        # Calculate green score (0-100)
        green_score = self._calculate_green_score(
            vehicle_type, carbon_saved_percentage, total_distance
        )
        
        return RouteOptimizationResponse(
            optimized_route=optimized_route,
            segments=segments,
            total_distance_km=round(total_distance, 2),
            total_duration_minutes=round(sum(s.duration_minutes for s in segments), 0),
            total_carbon_kg=round(total_carbon, 3),
            carbon_saved_kg=round(carbon_saved, 3),
            carbon_saved_percentage=round(carbon_saved_percentage, 1),
            green_score=round(green_score, 1)
        )
    
    def _calculate_distance_matrix(
        self, origin: Location, destinations: List[Location]
    ) -> np.ndarray:
        """Tính ma trận khoảng cách giữa các điểm"""
        all_locations = [origin] + destinations
        n = len(all_locations)
        matrix = np.zeros((n, n))
        
        for i in range(n):
            for j in range(n):
                if i != j:
                    matrix[i][j] = self._calculate_distance(
                        all_locations[i], all_locations[j]
                    )
        
        return matrix
    
    def _calculate_distance(self, loc1: Location, loc2: Location) -> float:
        """Tính khoảng cách Haversine giữa 2 điểm (km)"""
        from math import radians, sin, cos, sqrt, atan2
        
        R = 6371  # Earth radius in km
        
        lat1, lon1 = radians(loc1.latitude), radians(loc1.longitude)
        lat2, lon2 = radians(loc2.latitude), radians(loc2.longitude)
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))
        
        return R * c
    
    def _estimate_duration(self, distance_km: float, vehicle_type: VehicleType) -> float:
        """Ước tính thời gian di chuyển (phút)"""
        # Average speeds (km/h)
        speeds = {
            VehicleType.ELECTRIC_CAR: 40,
            VehicleType.HYBRID_CAR: 40,
            VehicleType.DIESEL_TRUCK: 35,
            VehicleType.ELECTRIC_BIKE: 25,
            VehicleType.BIKE: 15,
        }
        speed = speeds.get(vehicle_type, 40)
        return (distance_km / speed) * 60
    
    def _solve_tsp(
        self, distance_matrix: np.ndarray, mode: OptimizationMode
    ) -> List[int]:
        """Giải bài toán TSP để tìm tuyến đường tối ưu"""
        # Simplified: Return destinations in order
        # TODO: Implement actual TSP solver with OR-Tools
        n = len(distance_matrix) - 1
        return list(range(n))
    
    def _calculate_baseline_carbon(
        self, origin: Location, destinations: List[Location], vehicle_type: VehicleType
    ) -> float:
        """Tính carbon baseline (không tối ưu)"""
        emission_factor = EMISSION_FACTORS.get(vehicle_type, 0.15)
        total_distance = 0
        
        current = origin
        for dest in destinations:
            total_distance += self._calculate_distance(current, dest)
            current = dest
        
        return total_distance * emission_factor
    
    def _calculate_green_score(
        self, vehicle_type: VehicleType, carbon_saved_pct: float, distance: float
    ) -> float:
        """Tính điểm xanh (0-100)"""
        # Vehicle score
        vehicle_scores = {
            VehicleType.ELECTRIC_CAR: 100,
            VehicleType.ELECTRIC_BIKE: 100,
            VehicleType.BIKE: 100,
            VehicleType.HYBRID_CAR: 70,
            VehicleType.DIESEL_TRUCK: 30,
        }
        vehicle_score = vehicle_scores.get(vehicle_type, 50)
        
        # Optimization score
        optimization_score = min(100, carbon_saved_pct * 2)
        
        # Distance penalty (longer = worse)
        distance_score = max(0, 100 - distance)
        
        # Weighted average
        return (vehicle_score * 0.5 + optimization_score * 0.3 + distance_score * 0.2)
    
    async def batch_orders(self, orders: List[Dict]) -> List[Dict]:
        """Gom nhóm đơn hàng theo khu vực"""
        # TODO: Implement clustering algorithm
        return [{
            "batch_id": "BATCH_001",
            "orders": orders,
            "estimated_carbon_saved": 2.5,
            "estimated_cost_saved": 50000
        }]
    
    async def get_packaging_suggestions(
        self, product_category: str, dimensions: str = None
    ) -> List[PackagingSuggestion]:
        """Gợi ý bao bì xanh"""
        suggestions = [
            PackagingSuggestion(
                material="Recycled Cardboard",
                biodegradable=True,
                recyclable=True,
                carbon_footprint_kg=0.5,
                cost_estimate="10,000 - 15,000 VND",
                suppliers=["EcoPack Vietnam", "Green Box Co."],
                certifications=["FSC", "Recycled Content"]
            ),
            PackagingSuggestion(
                material="Mushroom Packaging",
                biodegradable=True,
                recyclable=False,
                carbon_footprint_kg=0.2,
                cost_estimate="20,000 - 30,000 VND",
                suppliers=["BioMaterial Solutions"],
                certifications=["Compostable", "Carbon Neutral"]
            ),
            PackagingSuggestion(
                material="Cornstarch Foam",
                biodegradable=True,
                recyclable=False,
                carbon_footprint_kg=0.3,
                cost_estimate="15,000 - 25,000 VND",
                suppliers=["EcoFoam Vietnam"],
                certifications=["Biodegradable", "Non-Toxic"]
            )
        ]
        return suggestions
