import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ categories = [] }) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl font-bold">
                🛍️
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ShopHub
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for quality products, exceptional service, and unbeatable value.
              Discover amazing deals on everything you need.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm">
                  📧
                </div>
                <span className="text-sm">support@shophub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm">
                  📞
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm">
                  📍
                </div>
                <span className="text-sm">123 Commerce St, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Shop Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat, index) => (
                <li key={cat}>
                  <Link 
                    to={`/?category=${encodeURIComponent(cat)}`} 
                    onClick={() => setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform duration-200">•</span>
                    {cat}
                  </Link>
                </li>
              ))}
              {categories.length > 6 && (
                <li>
                  <Link to="/" onClick={() => setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium">
                    View All Categories →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Customer Service & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns-exchanges" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Terms of Service
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-white">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <span className="text-white text-lg">📘</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <span className="text-white text-lg">📷</span>
                </a>
                {/* /* <a
                  href="#"
                  className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Twitter"
                >
                  
                </a>  */}
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <span className="text-white text-lg">📺</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-8 border border-gray-700">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive deals, new product launches, and shopping tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>🔒 Secure Payments</span>
              <span>🚚 Free Shipping</span>
              <span>↩️ Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made By Akshat Ghatiya</span>
              <span className="text-red-500 animate-pulse">AG</span>
              <span>by ShopHub Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
