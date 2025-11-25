import React from 'react';

/**
 * FilterBar Component
 * Contains category filter dropdown
 */
const FilterBar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white shadow-sm py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label htmlFor="category-filter" className="text-gray-900 font-semibold whitespace-nowrap">
            Filter by Category:
          </label>
          <select
            id="category-filter"
            className="w-full sm:w-auto min-w-[200px] px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 cursor-pointer outline-none hover:border-primary-500 focus:border-primary-500 transition-colors bg-white"
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
      </div>
    </div>
  );
};

export default FilterBar;
