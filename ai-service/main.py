"""
EcoConnect AI Service

Microservice Python/FastAPI cho:
- Tối ưu hóa logistics xanh
- Phân tích ESG và đề xuất cải thiện
- Dự đoán carbon footprint
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uvicorn
from datetime import datetime

# Models
from .models import (
    RouteOptimizationRequest,
    RouteOptimizationResponse,
    ESGAnalysisRequest,
    ESGRecommendation,
    CarbonFootprintRequest,
    CarbonFootprintResponse
)

# Services
from .services.logistics_service import LogisticsService
from .services.esg_service import ESGService
from .services.carbon_service import CarbonService

# Initialize FastAPI app
app = FastAPI(
    title="EcoConnect AI Service",
    description="AI-powered sustainability and logistics optimization",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
logistics_service = LogisticsService()
esg_service = ESGService()
carbon_service = CarbonService()

# ===================================
# HEALTH CHECK
# ===================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "EcoConnect AI"
    }

# ===================================
# LOGISTICS OPTIMIZATION
# ===================================

@app.post("/api/v1/logistics/optimize-route", response_model=RouteOptimizationResponse)
async def optimize_route(request: RouteOptimizationRequest):
    """
    Tối ưu hóa tuyến đường giao hàng để giảm carbon footprint
    
    Args:
        request: Thông tin về điểm xuất phát, điểm đến và các đơn hàng
    
    Returns:
        Tuyến đường tối ưu với ước tính carbon tiết kiệm được
    """
    try:
        result = await logistics_service.optimize_route(
            origin=request.origin,
            destinations=request.destinations,
            vehicle_type=request.vehicle_type,
            optimization_mode=request.optimization_mode
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/logistics/batch-orders")
async def batch_orders(orders: List[Dict]):
    """
    Gom nhóm các đơn hàng để tối ưu vận chuyển
    
    Args:
        orders: Danh sách các đơn hàng cần gom nhóm
    
    Returns:
        Các nhóm đơn hàng đã được tối ưu
    """
    try:
        result = await logistics_service.batch_orders(orders)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/logistics/packaging-suggestions")
async def get_packaging_suggestions(product_category: str, dimensions: Optional[str] = None):
    """
    Gợi ý bao bì thân thiện môi trường
    
    Args:
        product_category: Loại sản phẩm
        dimensions: Kích thước sản phẩm (optional)
    
    Returns:
        Danh sách các gợi ý bao bì xanh
    """
    try:
        suggestions = await logistics_service.get_packaging_suggestions(
            product_category, dimensions
        )
        return {"success": True, "data": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/logistics/calculate-footprint", response_model=CarbonFootprintResponse)
async def calculate_footprint(request: CarbonFootprintRequest):
    """
    Tính toán carbon footprint cho logistics
    
    Args:
        request: Thông tin về khoảng cách, phương tiện và trọng lượng
    
    Returns:
        Carbon footprint ước tính
    """
    try:
        result = await carbon_service.calculate_logistics_footprint(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===================================
# ESG ANALYTICS
# ===================================

@app.post("/api/v1/esg/analyze", response_model=List[ESGRecommendation])
async def analyze_esg(request: ESGAnalysisRequest):
    """
    Phân tích dữ liệu ESG và đưa ra các đề xuất cải thiện
    
    Args:
        request: Dữ liệu ESG của doanh nghiệp
    
    Returns:
        Danh sách các đề xuất cải thiện ESG
    """
    try:
        recommendations = await esg_service.analyze_and_recommend(request)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/esg/score")
async def calculate_esg_score(data: Dict):
    """
    Tính toán điểm ESG tổng thể
    
    Args:
        data: Dữ liệu ESG
    
    Returns:
        Điểm ESG cho từng mảng E, S, G và tổng thể
    """
    try:
        scores = await esg_service.calculate_scores(data)
        return {"success": True, "data": scores}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/esg/benchmark")
async def get_industry_benchmark(industry: str):
    """
    Lấy điểm ESG trung bình của ngành
    
    Args:
        industry: Loại ngành
    
    Returns:
        Điểm ESG benchmark của ngành
    """
    try:
        benchmark = await esg_service.get_industry_benchmark(industry)
        return {"success": True, "data": benchmark}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/esg/predict-trend")
async def predict_trend(historical_data: List[Dict]):
    """
    Dự đoán xu hướng ESG dựa trên dữ liệu lịch sử
    
    Args:
        historical_data: Dữ liệu ESG lịch sử
    
    Returns:
        Dự đoán xu hướng cho các kỳ tiếp theo
    """
    try:
        prediction = await esg_service.predict_trend(historical_data)
        return {"success": True, "data": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===================================
# CARBON ANALYTICS
# ===================================

@app.post("/api/v1/carbon/calculate-product")
async def calculate_product_carbon(product_data: Dict):
    """
    Tính toán carbon footprint của sản phẩm
    
    Args:
        product_data: Thông tin sản phẩm và quy trình sản xuất
    
    Returns:
        Carbon footprint chi tiết
    """
    try:
        footprint = await carbon_service.calculate_product_footprint(product_data)
        return {"success": True, "data": footprint}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/carbon/compare")
async def compare_carbon(product_ids: List[str]):
    """
    So sánh carbon footprint giữa các sản phẩm
    
    Args:
        product_ids: Danh sách ID sản phẩm cần so sánh
    
    Returns:
        Kết quả so sánh carbon footprint
    """
    try:
        comparison = await carbon_service.compare_products(product_ids)
        return {"success": True, "data": comparison}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===================================
# ML MODELS MANAGEMENT
# ===================================

@app.get("/api/v1/models/status")
async def get_models_status():
    """Trạng thái của các ML models"""
    return {
        "success": True,
        "data": {
            "logistics_optimizer": "active",
            "esg_analyzer": "active",
            "carbon_predictor": "active",
            "last_updated": datetime.utcnow().isoformat()
        }
    }

@app.post("/api/v1/models/train")
async def train_models(model_name: str):
    """Trigger training cho ML models"""
    # TODO: Implement model training
    return {
        "success": True,
        "message": f"Training started for {model_name}"
    }

# ===================================
# RUN APPLICATION
# ===================================

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
