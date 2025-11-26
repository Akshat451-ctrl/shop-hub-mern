import React from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600">
            Enter your order details to track your package in real-time
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                placeholder="Enter your order number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Track Order
          </button>
        </div>

        {/* Order Status Example */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>

          <div className="space-y-6">
            {/* Order Info */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #12345</h3>
                  <p className="text-gray-600">Placed on November 20, 2025</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  In Transit
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Order Confirmed</h4>
                  <p className="text-gray-600">November 20, 2025 at 2:30 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Order Processed</h4>
                  <p className="text-gray-600">November 21, 2025 at 10:15 AM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">In Transit</h4>
                  <p className="text-gray-600">Expected delivery: November 28, 2025</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-500">Delivered</h4>
                  <p className="text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help with your order? Contact our support team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;