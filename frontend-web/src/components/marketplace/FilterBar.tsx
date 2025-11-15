'use client';

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { FilterOptions } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 20000000
  ]);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Food & Beverage',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Office Supplies',
    'Other',
  ];

  const certifications = [
    'Organic',
    'Fair Trade',
    'Carbon Neutral',
    'FSC Certified',
    'Energy Star',
    'B Corp',
    'Rainforest Alliance',
    'Cruelty Free',
  ];

  const handleCategoryToggle = (category: string) => {
    const newCategory = filters.category === category ? undefined : category;
    onFilterChange({ ...filters, category: newCategory });
  };

  const handleCertificationToggle = (cert: string) => {
    const current = filters.certifications || [];
    const newCerts = current.includes(cert)
      ? current.filter((c) => c !== cert)
      : [...current, cert];
    onFilterChange({ ...filters, certifications: newCerts });
  };

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({
      ...filters,
      minPrice: newRange[0],
      maxPrice: newRange[1]
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.certifications?.length,
    filters.blockchainVerified,
    filters.minESG && filters.minESG > 0,
    filters.maxCarbonFootprint,
    (filters.minPrice || 0) > 0 || (filters.maxPrice || 200) < 200
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Bộ lọc</h3>
            {activeFiltersCount > 0 && (
              <p className="text-xs text-primary-600">{activeFiltersCount} đang áp dụng</p>
            )}
          </div>
        </div>
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Content */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Price Range with Dual Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>💰</span>
              <span>Khoảng giá</span>
            </h4>
            <span className="text-sm font-bold text-primary-600">
              {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
            </span>
          </div>
          
          {/* Dual Range Slider */}
          <div className="relative pt-2 pb-4">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                style={{
                  left: `${(priceRange[0] / 20000000) * 100}%`,
                  right: `${100 - (priceRange[1] / 20000000) * 100}%`
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
              className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            />
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
              className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            />
          </div>
        </div>

        {/* ESG Score */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>🌿</span>
              <span>Điểm ESG tối thiểu</span>
            </h4>
            <span className="text-sm font-bold text-green-600">{filters.minESG || 0}/100</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters.minESG || 0}
            onChange={(e) =>
              onFilterChange({ ...filters, minESG: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${filters.minESG || 0}%, #e5e7eb ${filters.minESG || 0}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Thấp</span>
            <span>Trung bình</span>
            <span>Cao</span>
          </div>
        </div>

        {/* Carbon Footprint */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>🌍</span>
              <span>Dấu chân Carbon (tối đa)</span>
            </h4>
            <span className="text-sm font-bold text-blue-600">
              {filters.maxCarbonFootprint || 10}kg CO₂
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.maxCarbonFootprint || 10}
            onChange={(e) =>
              onFilterChange({ ...filters, maxCarbonFootprint: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((filters.maxCarbonFootprint || 10) / 10) * 100}%, #e5e7eb ${((filters.maxCarbonFootprint || 10) / 10) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0kg</span>
            <span>5kg</span>
            <span>10kg</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📦</span>
            <span>Danh mục</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const categoryIcons: Record<string, string> = {
                'Electronics': '💻',
                'Fashion': '👔',
                'Home & Garden': '🏡',
                'Food & Beverage': '🍎',
                'Beauty & Personal Care': '💄',
                'Sports & Outdoors': '⚽',
                'Office Supplies': '📝',
                'Other': '🔖'
              };
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    filters.category === category
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <span>{categoryIcons[category]}</span>
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🏅</span>
            <span>Chứng nhận</span>
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {certifications.map((cert) => {
              const certIcons: Record<string, string> = {
                'Organic': '🌱',
                'Fair Trade': '🤝',
                'Carbon Neutral': '🌍',
                'FSC Certified': '🌳',
                'Energy Star': '⭐',
                'B Corp': '🏢',
                'Rainforest Alliance': '🌿',
                'Cruelty Free': '🐰'
              };
              
              const isChecked = filters.certifications?.includes(cert) || false;
              
              return (
                <label
                  key={cert}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCertificationToggle(cert)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  />
                  <span className="text-xl">{certIcons[cert]}</span>
                  <span className={`text-sm font-medium flex-1 ${isChecked ? 'text-primary-700' : 'text-gray-700'}`}>
                    {cert}
                  </span>
                  {isChecked && (
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Blockchain Verified */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border-2 border-green-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.blockchainVerified || false}
              onChange={(e) =>
                onFilterChange({ ...filters, blockchainVerified: e.target.checked })
              }
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Chỉ Blockchain Verified</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Sản phẩm được xác thực trên blockchain</p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset} 
            className="flex-1 font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Đặt lại
          </Button>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {activeFiltersCount} lọc
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
