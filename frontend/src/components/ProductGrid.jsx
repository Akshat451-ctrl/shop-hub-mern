import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

/**
 * ProductGrid Component
 * Displays grid of product cards with enhanced features
 */
const ProductGrid = ({ products, loading, onAddToCart, onToggleFavorite, favorites = [], user }) => {
  if (loading) {
    return (
      <div className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg font-medium">Loading amazing products...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-900 text-2xl font-bold mb-2">No products found</p>
        <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites?.includes(product._id)}
          user={user}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
