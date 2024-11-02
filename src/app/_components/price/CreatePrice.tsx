'use client';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function CreatePrice() {
  const [priceData, setPriceData] = useState({
    product: '',
    unitAmount: '',
    currency: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/sphere', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: 'price',
          ...priceData
        })
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error creating price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Price</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product ID</label>
          <input
            type="text"
            name="product"
            value={priceData.product}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
          <input
            type="number"
            name="unitAmount"
            value={priceData.unitAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
          <input
            type="text"
            name="currency"
            value={priceData.currency}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Price
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {response && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Response</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 