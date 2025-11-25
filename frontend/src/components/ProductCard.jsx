import React, { useState } from 'react';

/**
 * ProductCard Component
 * Displays individual product with image, name, price, rating, and actions
 */
const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  /**
   * Render star rating
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500 text-xl">★</span>);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500 text-xl opacity-50">★</span>);
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>);
    }

    return stars;
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite && onToggleFavorite(product._id);
        }}
        className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Product Image */}
      <div className="h-64 overflow-hidden bg-gray-100 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity">
            <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 min-h-[3rem] line-clamp-2 hover:text-primary-500 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 font-medium">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary-500">
            ${product.price.toFixed(2)}
          </div>
          {product.price > 50 && (
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
              Free Shipping
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>🛒</span>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
