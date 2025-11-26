import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getProxiedImageUrl } from '../utils/api';

/**
 * Header Component
 * Contains logo, search bar with autosuggest functionality, and user menu
 */
const Header = ({ onSearch, user, onLogout, onOpenAuth, categories = [], cart = [], cartCount = 0, lastAddedItem = null, onCategorySelect }) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Use derived cart total passed from App
  const cartTotal = cartCount;
  // Debug cart prop - minimal for development
  // console.log('Header cart prop:', cart, 'length:', cart?.length, 'cartCount:', cartCount);

  // Get avatar URL with fallback to initials
  const getAvatarUrl = (user) => {
    if (user?.avatar && user.avatar !== 'https://picsum.photos/150/150?random=user') {
      return user.avatar;
    }

    // Generate initials-based avatar as fallback
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    const colors = {
      male: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'],
      female: ['#EC4899', '#DB2777', '#BE185D', '#9D174D'],
      other: ['#6B7280', '#4B5563', '#374151', '#1F2937']
    };

    const gender = user?.gender || 'other';
    const colorIndex = initials.charCodeAt(0) % colors[gender].length;
    const bgColor = colors[gender][colorIndex];

    // Return a data URL for a simple SVG avatar
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="${bgColor}"/>
        <text x="16" y="22" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
      </svg>
    `)}`;
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (!event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
      if (!event.target.closest('.categories-menu')) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show cart popup when lastAddedItem changes
  useEffect(() => {
    if (lastAddedItem) {
      setShowCartPopup(true);
      const timer = setTimeout(() => setShowCartPopup(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  /**
   * Fetch search suggestions from API
   */
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`/api/search?q=${query}`);
      const productsData = response.data.products || response.data;
      // Limit suggestions shown to at most 5 items
      setSuggestions((productsData || []).slice(0, 5));
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
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100" 
              onClick={() => setMobileOpen(!mobileOpen)} 
              aria-label="Toggle menu"
            >
              {/* Hamburger */}
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative flex items-center">
                {/* Shopping bag icon */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  {/* Decorative sparkle */}
                  <div className="absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                {/* ShopHub text */}
                <div className="ml-2 sm:ml-3">
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300 transform group-hover:scale-105">
                    ShopHub
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-gray-500 font-medium">Your Shopping Paradise</div>
              </div>
            </Link>
          </div>

          {/* Center: Search - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex flex-1 mx-6" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl">
              <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-gray-800 outline-none placeholder-gray-500"
                  placeholder="Search products, categories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                <button type="submit" className="px-4 text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-72 overflow-y-auto z-50">
                  {suggestions.map((product, idx) => (
                    <div
                      key={product._id}
                      role="option"
                      tabIndex={0}
                      aria-selected={false}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleSuggestionClick(product.name)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSuggestionClick(product.name); } }}
                    >
                      <img 
                        src={getProxiedImageUrl(product.image)}
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

          {/* Right: Actions - Always visible */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Categories dropdown - Hidden on mobile */}
            <div className="relative hidden md:block">
              <button onClick={() => setShowCategories(!showCategories)} className="text-sm text-gray-700 px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-1">
                Categories 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCategories && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="p-2">
                    {categories.slice(0, 10).map(cat => (
                      <li key={cat} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <button onClick={() => { setShowCategories(false); onCategorySelect && onCategorySelect(cat); }} className="w-full text-left">{cat}</button>
                      </li>
                    ))}
                    {categories.length === 0 && (
                      <li className="px-3 py-2 text-sm text-gray-500">No categories</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link to="/cart" className="relative group p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 transform hover:scale-110" aria-label="Shopping cart">
                <div className="relative">
                  {/* Modern Cart Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700 group-hover:text-blue-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {/* Cart wheels for extra detail */}
                  <div className="absolute -bottom-1 left-1 w-1 h-1 bg-gray-400 rounded-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute -bottom-1 right-1 w-1 h-1 bg-gray-400 rounded-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>
                {cartCount > 0 && (
                  <>
                    {/* cart badge will show total quantity */}
                    <span 
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shadow-lg border-2 border-white"
                      style={{ zIndex: 10 }}
                    >
                      {cartTotal}
                    </span>
                  </>
                )}
              </Link>

              {/* Cart Added Popup */}
              {showCartPopup && lastAddedItem && (
                <div className="absolute top-full mt-2 right-0 bg-white text-gray-900 px-3 py-2 rounded-lg shadow-xl z-50 animate-fade-in-up border border-gray-100 w-72">
                      <div className="flex items-center gap-3">
                        <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold">Added to cart</div>
                          <div className="text-sm text-gray-600 truncate">{lastAddedItem.name} <span className="text-xs text-gray-500">×{lastAddedItem.quantity || 1}</span></div>
                        </div>
                        <Link to="/cart" className="text-sm text-primary-600 font-semibold hover:underline">View Cart</Link>
                      </div>
                </div>
              )}
            </div>

            {/* User / Auth */}
            {user ? (
              <div className="relative user-menu">
                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <img src={getAvatarUrl(user)} alt={user.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200" />
                  <span className="hidden lg:inline text-sm text-gray-700 font-medium">{user.name.split(' ')[0]}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>

                    <Link
                      to="/cart"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                      My Cart
                    </Link>

                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Only shown when mobile menu is open */}
        {mobileOpen && (
          <div className="lg:hidden px-4 pb-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-gray-800 outline-none placeholder-gray-500"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                <button type="submit" className="px-4 text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                  {suggestions.map((product, idx) => (
                    <div
                      key={product._id}
                      role="option"
                      tabIndex={0}
                      aria-selected={false}
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => { handleSuggestionClick(product.name); setMobileOpen(false); }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSuggestionClick(product.name); setMobileOpen(false); } }}
                    >
                      <img 
                        src={getProxiedImageUrl(product.image)}
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                      <div className="flex-1">
                        <div className="text-gray-900 font-medium text-sm">{product.name}</div>
                        <div className="text-primary-500 font-semibold text-sm">${product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {/* Navigation Links */}
            <Link to="/" className="block text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700" onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/contact" className="block text-gray-700" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link to="/cart" className="block text-gray-700" onClick={() => setMobileOpen(false)}>
              Cart ({cartCount})
            </Link>

            {/* Categories */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-sm font-semibold text-gray-600 mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => { setMobileOpen(false); onCategorySelect && onCategorySelect(cat); }} 
                    className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded text-left hover:bg-gray-100"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </div>
                  <Link to="/profile" className="block text-gray-700" onClick={() => setMobileOpen(false)}>Profile</Link>
                  <button 
                    onClick={() => { onLogout(); setMobileOpen(false); }} 
                    className="block text-red-600 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMobileOpen(false); }}
                  className="w-full px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-semibold hover:shadow"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
