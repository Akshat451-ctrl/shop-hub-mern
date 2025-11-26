import React from 'react';

/**
 * FilterBar Component
 * Contains category filter dropdown
 */
const FilterBar = ({ categories, selectedCategory, onCategoryChange, minPrice, maxPrice, onPriceChange }) => {
  return (
    <div className="bg-white shadow-sm py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <label htmlFor="category-filter" className="text-gray-900 font-semibold whitespace-nowrap">
              Category:
            </label>
            <select
              id="category-filter"
              className="w-full sm:w-auto min-w-[180px] px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 cursor-pointer outline-none hover:border-primary-500 focus:border-primary-500 transition-colors bg-white"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <label className="text-gray-900 font-semibold">Price:</label>
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice ?? ''}
                onChange={(e) => onPriceChange && onPriceChange({ min: e.target.value ? parseFloat(e.target.value) : '' , max: maxPrice })}
                className="w-24 px-3 py-2 border rounded-lg"
              />
              <span className="text-gray-500">—</span>
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice ?? ''}
                onChange={(e) => onPriceChange && onPriceChange({ min: minPrice, max: e.target.value ? parseFloat(e.target.value) : '' })}
                className="w-24 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <button
                onClick={() => onPriceChange && onPriceChange({ min: '', max: '' })}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
