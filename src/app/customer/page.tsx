'use client';
import { useState } from 'react';
import LoadingSpinner from '../_components/LoadingSpinner';
import BackToHome from '../_components/BackToHome';

export default function CustomerPage() {
  const [customerData, setCustomerData] = useState({
    type: 'individual',
    address: {
      country: '',
      state: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

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
          endpoint: 'customer',
          ...customerData
        })
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BackToHome />

      {/* Main Content - Updated with max-width container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[500px] mx-auto"> {/* Added container with max-width */}
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <input
                type="text"
                name="country"
                value={customerData.address.country}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
              <input
                type="text"
                name="state"
                value={customerData.address.state}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Customer
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
      </div>
    </div>
  );
} 