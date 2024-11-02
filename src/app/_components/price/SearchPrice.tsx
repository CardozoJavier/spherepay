'use client';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { Price as PriceResponse } from '../../_types/PriceResponse';

export default function SearchPrice() {
  const [priceId, setPriceId] = useState('');
  const [price, setPrice] = useState<PriceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceId.trim()) return;

    setIsLoading(true);
    try {
      const url = new URL('/api/sphere', window.location.origin);
      url.searchParams.append('endpoint', 'price');
      url.searchParams.append('id', priceId);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Price not found');
      }
      const data = await response.json();
      setPrice(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find price');
      setPrice(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Search Price</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ID</label>
          <input
            type="text"
            value={priceId}
            onChange={(e) => setPriceId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter price ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="mt-4 text-red-500 dark:text-red-400">{error}</div>
      )}
      {price && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Price Details</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
            {JSON.stringify(price, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 