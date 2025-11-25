import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import Recommendations from './components/Recommendations';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import './App.css';

/**
 * Main App Component
 * Manages state and coordinates all child components
 */
function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  /**
   * Check for logged in user on mount
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  /**
   * Save cart to localStorage
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Fetch all products on component mount
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Apply filters whenever search query or category changes
   */
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, allProducts]);

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  /**
   * Fetch products from API
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      const productsData = response.data.products || response.data;
      setAllProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productsData.map(p => p.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to load products', 'error');
      setLoading(false);
    }
  };

  /**
   * Apply search and category filters
   */
  const applyFilters = () => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  /**
   * Handle search from Header component
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  /**
   * Handle category change from FilterBar component
   */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  /**
   * Handle authentication success
   */
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setFavorites([]);
    setCart([]);
    showToast('Logged out successfully', 'info');
  };

  /**
   * Handle add to cart
   */
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      showToast('Quantity updated in cart', 'success');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showToast('Added to cart!', 'success');
    }
  };

  /**
   * Handle toggle favorite
   */
  const handleToggleFavorite = async (productId) => {
    if (!user) {
      showToast('Please login to add favorites', 'warning');
      setShowAuthModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/recommendations/toggle-favorite',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isFavorite) {
        setFavorites([...favorites, productId]);
        showToast('Added to favorites!', 'success');
      } else {
        setFavorites(favorites.filter(id => id !== productId));
        showToast('Removed from favorites', 'info');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('Failed to update favorites', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onSearch={handleSearch} 
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
      />
      <Hero />
      
      {/* Recommendations Section */}
      <Recommendations user={user} />
      
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
              <p className="text-gray-600 mt-1">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>
            {cart.length > 0 && (
              <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">🛒</span>
                <span className="font-semibold text-primary-700">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                </span>
              </div>
            )}
          </div>
          <ProductGrid 
            products={filteredProducts} 
            loading={loading}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        </div>
      </main>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🛍️ ShopHub</h3>
              <p className="text-gray-400">Your one-stop shop for amazing products at unbeatable prices.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map(cat => (
                  <li key={cat}><a href="#" className="hover:text-white transition-colors">{cat}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-primary-400 transition-colors">📘</a>
                <a href="#" className="hover:text-primary-400 transition-colors">📷</a>
                <a href="#" className="hover:text-primary-400 transition-colors">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopHub. All rights reserved. Made with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
