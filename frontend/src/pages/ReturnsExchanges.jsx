import React from 'react';
import { Link } from 'react-router-dom';

const ReturnsExchanges = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-xl text-gray-600">
            Hassle-free returns and exchanges within 30 days of purchase
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-gray-600 text-sm">Return any item within 30 days for a full refund</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Exchanges</h3>
              <p className="text-gray-600 text-sm">Exchange for a different size or color at no cost</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Return Shipping</h3>
              <p className="text-gray-600 text-sm">We cover return shipping costs for you</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">1</div>
                <h3 className="font-semibold text-gray-900 mb-1">Start Return</h3>
                <p className="text-gray-600 text-sm">Log into your account and select the item to return</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">2</div>
                <h3 className="font-semibold text-gray-900 mb-1">Pack Item</h3>
                <p className="text-gray-600 text-sm">Use the provided return label and packaging</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">3</div>
                <h3 className="font-semibold text-gray-900 mb-1">Ship It Back</h3>
                <p className="text-gray-600 text-sm">Drop off at any UPS location or schedule pickup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">4</div>
                <h3 className="font-semibold text-gray-900 mb-1">Get Refunded</h3>
                <p className="text-gray-600 text-sm">Receive your refund within 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Conditions</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900">Eligible Items</h3>
                <p className="text-gray-600">Most items are eligible for return within 30 days, except for personalized or custom items.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900">Original Condition</h3>
                <p className="text-gray-600">Items must be unused, in original packaging, with all tags and accessories attached.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl mt-1">✗</span>
              <div>
                <h3 className="font-semibold text-gray-900">Non-Returnable Items</h3>
                <p className="text-gray-600">Gift cards, intimate apparel, and items marked as final sale are not eligible for return.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size Exchanges</h3>
              <p className="text-gray-600 mb-4">
                If you need a different size, simply return your current item and we'll send you the correct size at no additional cost.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Free exchange shipping</li>
                <li>• No restocking fees</li>
                <li>• Quick processing (1-2 days)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Item Exchanges</h3>
              <p className="text-gray-600 mb-4">
                Want a different item? Return your current purchase and place a new order. We'll provide a return label for the exchange.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Full refund to original payment method</li>
                <li>• No time limit for exchanges</li>
                <li>• Easy online process</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="mb-6">
              Our customer service team is here to help with any questions about returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <a
                href="tel:+15551234567"
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
              >
                Call Us: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnsExchanges;