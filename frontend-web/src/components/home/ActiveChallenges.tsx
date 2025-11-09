/**
 * Active Challenges Component - Displays current environmental challenges
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChallengeCard } from '@/components/gamification';
import type { Challenge } from '@/types';

const mockChallenges: Challenge[] = [
  {
    _id: '1',
    title: 'Zero Waste Week',
    description: 'Reduce your waste to zero for 7 consecutive days',
    type: 'weekly',
    category: 'Waste Reduction',
    difficulty: 'medium',
    points: 500,
    carbonCredits: 50,
    requirements: {
      type: 'waste_reduction',
      target: 0,
      unit: 'kg'
    },
    duration: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    participants: 1243,
    status: 'active',
    badge: {
      name: 'Zero Waste Warrior',
      image: '/badges/zero-waste.png'
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Green Commute Challenge',
    description: 'Use eco-friendly transportation for 30 days',
    type: 'monthly',
    category: 'Transportation',
    difficulty: 'easy',
    points: 300,
    carbonCredits: 30,
    requirements: {
      type: 'green_commute',
      target: 30,
      unit: 'days'
    },
    duration: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    participants: 2567,
    status: 'active',
    badge: {
      name: 'Eco Commuter',
      image: '/badges/green-commute.png'
    },
    createdAt: new Date().toISOString()
  }
];

export default function ActiveChallenges() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Challenges</h2>
            <p className="text-gray-600">Join the community and make a difference</p>
          </div>
          <Link 
            href="/challenges" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Challenges →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockChallenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      </div>
    </section>
  );
}
