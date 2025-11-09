import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Challenge } from '@/types';

export function useChallenges(filters?: any) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChallenges();
  }, [filters]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getChallenges(filters);
      setChallenges(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  };

  const enrollChallenge = async (id: string) => {
    try {
      await apiClient.enrollChallenge(id);
      fetchChallenges(); // Refresh list
    } catch (err: any) {
      throw new Error(err.message || 'Failed to enroll in challenge');
    }
  };

  return { challenges, loading, error, enrollChallenge, refetch: fetchChallenges };
}

export function useChallenge(id: string) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchChallenge();
    }
  }, [id]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getChallenge(id);
      setChallenge(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch challenge');
    } finally {
      setLoading(false);
    }
  };

  const checkIn = async (data: any) => {
    try {
      await apiClient.checkInChallenge(id, data);
      fetchChallenge(); // Refresh challenge
    } catch (err: any) {
      throw new Error(err.message || 'Failed to check in');
    }
  };

  return { challenge, loading, error, checkIn, refetch: fetchChallenge };
}
