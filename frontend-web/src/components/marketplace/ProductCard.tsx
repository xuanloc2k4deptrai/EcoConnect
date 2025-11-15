'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Product } from '@/types';
import { formatCurrency, getESGColor } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onViewPassport?: (passportId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onViewPassport }) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleViewPassport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.passportId && onViewPassport) {
      onViewPassport(product.passportId);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card hover className="h-full flex flex-col transition-all hover:shadow-2xl hover:scale-105">
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.blockchainVerified && (
              <Badge variant="success" size="sm">
                ✓ Verified
              </Badge>
            )}
            {product.esgScore.overall >= 80 && (
              <Badge variant="success" size="sm">
                🌿 Eco
              </Badge>
            )}
          </div>
          {/* Carbon Offset Badge */}
          <div className="absolute bottom-2 left-2">
            <div className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              -{product.carbonFootprint.total}kg CO₂
            </div>
          </div>
        </div>

        <CardBody className="flex-grow">
          {/* Product Info */}
          <div className="mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* ESG Score */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">ESG Score:</span>
            <div className="flex items-center gap-1">
              <span className={`font-bold ${getESGColor(product.esgScore.overall)}`}>
                {product.esgScore.overall}/100
              </span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    product.esgScore.overall >= 80
                      ? 'bg-green-500'
                      : product.esgScore.overall >= 60
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${product.esgScore.overall}%` }}
                />
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>by {product.seller.name}</span>
            <span>⭐ {product.seller.rating.toFixed(1)}</span>
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="info" size="sm">
                  {cert}
                </Badge>
              ))}
              {product.certifications.length > 2 && (
                <Badge variant="default" size="sm">
                  +{product.certifications.length - 2}
                </Badge>
              )}
            </div>
          )}
        </CardBody>

        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </div>
                <div className="text-xs text-gray-500">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  ⭐ {product.rating.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  ({product.reviews} reviews)
                </div>
              </div>
            </div>
            {product.passportId && (
              <button
                onClick={handleViewPassport}
                className="w-full py-2 px-3 bg-green-50 hover:bg-green-100 text-green-700 font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Xem hộ chiếu xanh
              </button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
