'use client';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    images: [''],
    active: true,
    tags: [] as string[],
    meta: {},
    prices: [] as string[],
    defaultPrice: '',
    shippingRequired: false,
    taxRequired: false,
    type: 'physical' as 'physical' | 'digital' | 'service'
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [tagError, setTagError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTags(productData.tags)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/sphere', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: 'product',
          ...productData,
          tags: productData.tags.filter(tag => tag.trim() !== '')
        })
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateTags = (tags: string[]): boolean => {
    const validTags = tags.filter(tag => tag.trim() !== '');

    if (validTags.length > 10) {
      setTagError('Maximum 10 tags allowed');
      return false;
    }

    const longTags = validTags.filter(tag => tag.length > 50);
    if (longTags.length > 0) {
      setTagError('Tags must be less than 50 characters');
      return false;
    }

    setTagError(null);
    return true;
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter out invalid characters in real-time
    const filteredInput = e.target.value.replace(/[^a-zA-Z0-9-_\s]/g, '');
    setTagInput(filteredInput);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && tagInput === '' && productData.tags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      removeTag(productData.tags.length - 1);
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !productData.tags.includes(newTag)) {
      const newTags = [...productData.tags, newTag];
      if (validateTags(newTags)) {
        setProductData(prev => ({ ...prev, tags: newTags }));
        setTagInput('');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.value.split(',').map(url => url.trim());
    setProductData(prev => ({ ...prev, images }));
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            value={productData.images.join(', ')}
            onChange={handleImagesChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="https://example.com/image1.png, https://example.com/image2.png"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags
            <span className="ml-1 text-xs text-gray-500">
              {productData.tags.length}/10 tags
            </span>
          </label>
          <div className="mt-1 flex flex-wrap gap-2 p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
            {productData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              onBlur={addTag}
              className="flex-1 min-w-[120px] outline-none bg-transparent"
              placeholder={productData.tags.length < 10 ? "Add tag..." : ""}
              disabled={productData.tags.length >= 10}
            />
          </div>
          {tagError && (
            <p className="mt-1 text-sm text-red-500">{tagError}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Press Enter or comma to add a tag. Only letters, numbers, hyphens, and underscores allowed.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <select
            name="type"
            value={productData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="shippingRequired"
            checked={productData.shippingRequired}
            onChange={(e) => setProductData(prev => ({ ...prev, shippingRequired: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shipping Required</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="taxRequired"
            checked={productData.taxRequired}
            onChange={(e) => setProductData(prev => ({ ...prev, taxRequired: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tax Required</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!!tagError}
        >
          Create Product
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