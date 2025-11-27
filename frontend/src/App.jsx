import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import ProductCard from './components/ProductCard';
import Recommendations from './components/Recommendations';
import FeaturedSection from './components/FeaturedSection';
import Testimonials from './components/Testimonials';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';
import RecentlyViewed from './components/RecentlyViewed';
import QuickViewModal from './components/QuickViewModal';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import SizeGuide from './pages/SizeGuide';
import ShippingInfo from './pages/ShippingInfo';
import ReturnsExchanges from './pages/ReturnsExchanges';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import { Routes, Route, useSearchParams } from 'react-router-dom';
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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queuedFavorite, setQueuedFavorite] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  /**
   * Check for logged in user on mount
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      loadUserFavorites(token);
    }
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Check for category in URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  /**
   * Save cart to localStorage
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Keep derived cartCount in sync with cart
   */
  useEffect(() => {
    const count = cart.reduce((s, i) => s + (i.quantity || 1), 0);
    setCartCount(count);
  }, [cart]);

  /**
   * Handle opening quick view modal
   */
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  /**
   * Handle closing quick view modal
   */
  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Apply filters whenever search query or category changes
   */
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, allProducts, minPrice, maxPrice]);

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
      const response = await axios.get('/api/products');
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
   * Load user's favorites from API
   */
  const loadUserFavorites = async (token) => {
    try {
      const response = await axios.get('/api/recommendations/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const favoriteProducts = response.data.favorites || [];
      setFavorites(favoriteProducts.map(fav => fav._id));
    } catch (error) {
      console.error('Error loading favorites:', error);
      // Don't show error toast for favorites loading failure
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

    // Apply price filters
    const min = minPrice === '' || minPrice === null ? null : Number(minPrice);
    const max = maxPrice === '' || maxPrice === null ? null : Number(maxPrice);

    if (min !== null) {
      filtered = filtered.filter(product => Number(product.price) >= min);
    }

    if (max !== null) {
      filtered = filtered.filter(product => Number(product.price) <= max);
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

  const handlePriceChange = ({ min, max }) => {
    setMinPrice(min === '' ? '' : min);
    setMaxPrice(max === '' ? '' : max);
  };

  /**
   * Handle authentication success
   */
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    const token = localStorage.getItem('token');
    if (token) {
      loadUserFavorites(token);
    }
    showToast(`Welcome back, ${userData.name}!`, 'success');
    
    // If the user had clicked favorite while logged out, process it now
    const queued = queuedFavorite || localStorage.getItem('queuedFavorite');
    if (queued) {
      // clear any queuedFavorite
      localStorage.removeItem('queuedFavorite');
      setQueuedFavorite(null);
      // toggle favorite now that user is logged in
      handleToggleFavorite(queued);
    }
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
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        const newCart = prevCart.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        // Updated cart created
        showToast('Quantity updated in cart', 'success');
        setLastAddedItem({ ...product, quantity });
        return newCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity }];
        // New cart created
        showToast('Added to cart!', 'success');
        setLastAddedItem({ ...product, quantity });
        return newCart;
      }
    });
  };

  /**
   * Handle toggle favorite
   */
  const handleToggleFavorite = async (productId) => {
    if (!user) {
      // Queue the favorite to be applied after login
      setQueuedFavorite(productId);
      localStorage.setItem('queuedFavorite', productId);
      showToast('Please login to add favorites', 'warning');
      setShowAuthModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // Making API call to toggle favorite
      const response = await axios.post(
        '/api/recommendations/toggle-favorite',
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
        key={`header-${cartCount}`}
        onSearch={handleSearch} 
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
        categories={categories}
        cart={cart}
        cartCount={cartCount}
        lastAddedItem={lastAddedItem}
        onCategorySelect={handleCategoryChange}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <FeaturedSection onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} user={user} />
            <Recommendations user={user} searchTerm={searchQuery} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />
            <RecentlyViewed />
            <Testimonials />

            {/* Shop Products Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Our Products</h2>
                  <p className="text-lg text-gray-600">Discover amazing products at ShopHub</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allProducts.slice(0, 8).map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites?.includes(product._id)}
                      user={user}
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button 
                    onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            </section>

            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
            <main id="products" className="flex-1 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
                    <p className="text-gray-600 mt-1">
                      Showing {filteredProducts.length} of {allProducts.length} products
                    </p>
                  </div>
                  {cartCount > 0 && (
                    <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                      <span className="text-2xl">🛒</span>
                      <span className="font-semibold text-primary-700">
                        {cartCount} items in cart
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
                  user={user}
                />
              </div>
            </main>
          </>
        } />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

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

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={quickViewProduct ? favorites?.includes(quickViewProduct._id) : false}
        user={user}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      <Footer categories={categories} />
    </div>
  );
}

export default App;
