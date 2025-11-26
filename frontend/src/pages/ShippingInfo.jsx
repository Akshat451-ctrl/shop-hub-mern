import React from 'react';

const ShippingInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600">
            Fast, reliable delivery to get your orders to you quickly and safely
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Shipping</h3>
            <p className="text-gray-600 mb-4">5-7 business days</p>
            <p className="text-2xl font-bold text-blue-600">$4.99</p>
            <p className="text-sm text-gray-500">Free on orders over $50</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-purple-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Express Shipping</h3>
            <p className="text-gray-600 mb-4">2-3 business days</p>
            <p className="text-2xl font-bold text-purple-600">$9.99</p>
            <p className="text-sm text-gray-500">Most popular</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✈️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Overnight Shipping</h3>
            <p className="text-gray-600 mb-4">1 business day</p>
            <p className="text-2xl font-bold text-green-600">$19.99</p>
            <p className="text-sm text-gray-500">Available in select areas</p>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
              <p className="text-gray-600">
                Orders are typically processed within 1-2 business days. You'll receive an email confirmation
                with tracking information once your order ships.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Zones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">United States</h4>
                  <p className="text-gray-600 text-sm">2-7 business days</p>
                  <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">International</h4>
                  <p className="text-gray-600 text-sm">7-14 business days</p>
                  <p className="text-gray-600 text-sm">Free shipping on orders over $100</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Tracking</h3>
              <p className="text-gray-600 mb-3">
                Once your order ships, you'll receive a tracking number via email. You can also track your
                order status in your account dashboard.
              </p>
              <a
                href="/track-order"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Track Your Order
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">When will my order ship?</h3>
              <p className="text-gray-600">Orders are processed within 1-2 business days and shipped the same or next day.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping rates apply.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What if my package is damaged?</h3>
              <p className="text-gray-600">Contact us immediately if you receive a damaged package. We'll arrange for a replacement or refund.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my shipping address?</h3>
              <p className="text-gray-600">Contact us within 2 hours of placing your order to change the shipping address.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingInfo;