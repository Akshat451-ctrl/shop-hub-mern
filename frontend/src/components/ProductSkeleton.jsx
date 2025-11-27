import React from 'react';

/**
 * ProductSkeleton Component
 * Loading skeleton for product cards
 */
const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 sm:h-56 lg:h-64 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-5">
        {/* Category badge skeleton */}
        <div className="h-6 w-20 bg-gray-200 rounded-full mb-2"></div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-4 w-8 bg-gray-200 rounded"></div>
        </div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;