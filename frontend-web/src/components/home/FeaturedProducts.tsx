/**
 * Featured Products Component - Displays featured eco-friendly products
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/marketplace';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Organic Cotton T-Shirt',
    description: 'Sustainable fashion made from 100% organic cotton',
    category: 'Fashion',
    price: 29.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
    seller: {
      id: 'seller1',
      name: 'EcoWear',
      rating: 4.8
    },
    esgScore: {
      overall: 92,
      environmental: 95,
      social: 90,
      governance: 91
    },
    carbonFootprint: {
      manufacturing: 1.5,
      transportation: 0.5,
      packaging: 0.3,
      total: 2.3
    },
    certifications: ['GOTS', 'Fair Trade'],
    blockchainVerified: true,
    stock: 150,
    sold: 423,
    rating: 4.7,
    reviews: 128,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Bamboo Reusable Water Bottle',
    description: 'Eco-friendly bamboo bottle, BPA-free',
    category: 'Lifestyle',
    price: 24.99,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8'],
    seller: {
      id: 'seller2',
      name: 'GreenLife',
      rating: 4.9
    },
    esgScore: {
      overall: 88,
      environmental: 92,
      social: 85,
      governance: 87
    },
    carbonFootprint: {
      manufacturing: 0.8,
      transportation: 0.3,
      packaging: 0.1,
      total: 1.2
    },
    certifications: ['FSC', 'Carbon Neutral'],
    blockchainVerified: true,
    stock: 200,
    sold: 856,
    rating: 4.9,
    reviews: 245,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Solar Power Bank',
    description: 'Portable solar charger with 10000mAh capacity',
    category: 'Electronics',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5'],
    seller: {
      id: 'seller3',
      name: 'SolarTech',
      rating: 4.6
    },
    esgScore: {
      overall: 85,
      environmental: 88,
      social: 82,
      governance: 85
    },
    carbonFootprint: {
      manufacturing: 2.5,
      transportation: 0.8,
      packaging: 0.5,
      total: 3.8
    },
    certifications: ['Energy Star'],
    blockchainVerified: true,
    stock: 75,
    sold: 312,
    rating: 4.5,
    reviews: 87,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Eco-Products</h2>
          <Link 
            href="/marketplace" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
