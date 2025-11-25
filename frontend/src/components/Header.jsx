import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Header Component
 * Contains logo, search bar with autosuggest functionality, and user menu
 */
const Header = ({ onSearch, user, onLogout, onOpenAuth }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Debounce timer
  const debounceTimer = useRef(null);

  /**
   * Fetch search suggestions from API
   */
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      const productsData = response.data.products || response.data;
      setSuggestions(productsData);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  /**
   * Handle search input change with debouncing
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // 300ms debounce
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
    onSearch(productName);
  };

  /**
   * Handle search form submit
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(searchTerm);
  };

  /**
   * Close suggestions when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold cursor-pointer whitespace-nowrap">
              🛍️ ShopHub
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl w-full order-3 md:order-2" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 text-gray-900 outline-none placeholder-gray-500"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                <button 
                  type="submit" 
                  className="px-6 bg-primary-500 hover:bg-primary-600 transition-colors text-white text-xl"
                >
                  🔍
                </button>
              </div>

              {/* Autosuggest Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                  {suggestions.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleSuggestionClick(product.name)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-gray-900 font-medium">{product.name}</div>
                        <div className="text-primary-500 font-semibold">${product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex gap-3 items-center order-2 md:order-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs opacity-90">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all whitespace-nowrap hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap hover:scale-105 transform"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
