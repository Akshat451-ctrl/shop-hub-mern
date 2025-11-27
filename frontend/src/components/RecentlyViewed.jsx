import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProxiedImageUrl } from '../utils/api';

/**
 * RecentlyViewed Component
 * Shows recently viewed products for better user experience
 */
const RecentlyViewed = ({ currentProductId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out current product if viewing product details
        const filtered = currentProductId
          ? parsed.filter(id => id !== currentProductId).slice(0, 4)
          : parsed.slice(0, 4);
        setRecentlyViewed(filtered);
      } catch (error) {
        console.error('Error parsing recently viewed:', error);
      }
    }
  }, [currentProductId]);

  // Add current product to recently viewed
  useEffect(() => {
    if (currentProductId) {
      const stored = localStorage.getItem('recentlyViewed');
      let viewed = [];

      if (stored) {
        try {
          viewed = JSON.parse(stored);
        } catch (error) {
          viewed = [];
        }
      }

      // Remove if already exists, then add to beginning
      viewed = viewed.filter(id => id !== currentProductId);
      viewed.unshift(currentProductId);

      // Keep only last 10 items
      viewed = viewed.slice(0, 10);

      localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    }
  }, [currentProductId]);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">👁️</span>
        Recently Viewed
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recentlyViewed.map((productId) => (
          <Link
            key={productId}
            to={`/product/${productId}`}
            className="group block"
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:shadow-lg transition-shadow">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 truncate group-hover:text-primary-500 transition-colors">
              Product #{productId.slice(-6)}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/"
          className="text-primary-500 hover:text-primary-600 text-sm font-medium"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
};

export default RecentlyViewed;