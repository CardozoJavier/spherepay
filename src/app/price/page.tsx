'use client';
import { useState } from 'react';
import BackToHome from '../_components/BackToHome';
import CreatePrice from '../_components/price/CreatePrice';
import SearchPrice from '../_components/price/SearchPrice';
import ListPrices from '../_components/price/ListPrices';

export default function PricePage() {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'search'>('list');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BackToHome />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
            >
              List Prices
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
            >
              Create Price
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
            >
              Search Price
            </button>
          </nav>
        </div>

        {activeTab === 'list' && <ListPrices />}
        {activeTab === 'create' && <CreatePrice />}
        {activeTab === 'search' && <SearchPrice />}
      </div>
    </div>
  );
}
