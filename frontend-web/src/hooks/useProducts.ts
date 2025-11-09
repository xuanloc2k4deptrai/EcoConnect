import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Product, PaginatedResponse, FilterOptions } from '@/types';

export function useProducts(filters?: FilterOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProducts({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      }) as unknown as PaginatedResponse<Product>;
      setProducts(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchProducts();
  };

  return { products, loading, error, pagination, setPagination, refetch };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProduct(id);
      setProduct(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch: fetchProduct };
}
