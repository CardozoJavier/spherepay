import { useState, FormEvent } from 'react';

interface CreatePriceFormProps {
  onSubmit: (formData: {
    currency: string;
    network: string;
    unitAmountDecimal: string;
    product: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export default function CreatePriceForm({ onSubmit, isLoading }: CreatePriceFormProps) {
  const [formData, setFormData] = useState({
    currency: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Default SOL token
    network: "sol",
    unitAmountDecimal: "",
    product: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Network</label>
        <select
          value={formData.network}
          onChange={(e) => setFormData(prev => ({ ...prev, network: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="sol">Solana</option>
          <option value="eth">Ethereum</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
        <input
          type="text"
          value={formData.currency}
          onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Enter currency address"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Default: SOL token address
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
        <input
          type="text"
          value={formData.unitAmountDecimal}
          onChange={(e) => setFormData(prev => ({ ...prev, unitAmountDecimal: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Enter amount (e.g., 10)"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product ID</label>
        <input
          type="text"
          value={formData.product}
          onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Enter product ID"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 ${
          isLoading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }`}
      >
        {isLoading ? 'Creating...' : 'Create Price'}
      </button>
    </form>
  );
} 