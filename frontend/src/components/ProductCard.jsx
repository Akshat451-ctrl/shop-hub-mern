import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageForTitle, getRandomPlaceholder } from '../utils/getImageForTitle';

/**
 * ProductCard Component
 * Displays individual product with image, name, price, rating, and actions
 */
const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite = false, user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  /**
   * Render star rating
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    return stars;
  };

  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // Only navigate if the click is not on a button
        if (!e.target.closest('button')) {
          navigate(`/product/${product._id}`);
        }
      }}
    >
      {/* Favorite Button - Always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite && onToggleFavorite(product._id);
        }}
        className="absolute top-3 right-3 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 border-2 border-white/50"
        title={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
      >
        <span className={`text-xl transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Product Image */}
      <div className="h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        )}
       <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  onLoad={() => setImageLoaded(true)}
  onError={(e) => {
    e.target.src = getRandomPlaceholder(800, 600, product._id);
  }}
  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
/>


        {/* Quick View / Actions Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-between p-4 transition-opacity">
            <div className="text-white font-semibold bg-black bg-opacity-30 px-3 py-1 rounded">{product.category}</div>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(product); }}
                className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-md font-semibold hover:scale-105 transform transition"
                aria-label="Add to cart"
              >
                🛒
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(product._id); }}
                className="bg-white bg-opacity-90 text-red-500 px-3 py-1 rounded-md font-semibold hover:scale-105 transform transition"
                aria-label="Toggle favorite"
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
          {product.category}
        </span>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 min-h-[3rem] line-clamp-2 hover:text-primary-500 transition-colors">
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
          <div className="text-xl sm:text-2xl font-bold text-primary-500">
            ${product.price.toFixed(2)}
          </div>
          {product.price > 50 && (
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
              Free Shipping
            </span>
          )}
        </div>

        {/* Action Buttons - Always visible */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm border-2 border-transparent hover:border-primary-400"
          >
            <span className="text-lg">🛒</span>
            <span>Add to Cart</span>
          </button>
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              onToggleFavorite && onToggleFavorite(product._id); 
            }}
            className="px-3 py-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className="text-lg">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
