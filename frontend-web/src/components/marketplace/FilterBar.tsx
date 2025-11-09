'use client';

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { FilterOptions } from '@/types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Mobile Toggle */}
      <button
        className="md:hidden w-full flex items-center justify-between mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold">Filters</span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters Content */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </div>
        </div>

        {/* ESG Score */}
        <div>
          <h3 className="font-semibold mb-3">Minimum ESG Score</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minESG || 0}
            onChange={(e) =>
              onFilterChange({ ...filters, minESG: Number(e.target.value) })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>0</span>
            <span className="font-semibold">{filters.minESG || 0}</span>
            <span>100</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.category === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-semibold mb-3">Certifications</h3>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <label key={cert} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.certifications?.includes(cert) || false}
                  onChange={() => handleCertificationToggle(cert)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Blockchain Verified */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.blockchainVerified || false}
              onChange={(e) =>
                onFilterChange({ ...filters, blockchainVerified: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium">Blockchain Verified Only</span>
          </label>
        </div>

        {/* Reset Button */}
        <Button variant="outline" size="sm" onClick={onReset} className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
