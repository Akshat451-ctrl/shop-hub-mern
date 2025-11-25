import React from 'react';

/**
 * Hero Banner Component
 * Displays promotional banner at the top of the page
 */
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 text-white py-16 md:py-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              🎉 New Arrivals Every Week
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow leading-tight">
              Shop Smart,
              <br />
              <span className="text-yellow-300">Save More</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-lg">
              Discover thousands of products with personalized recommendations just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 text-lg font-semibold bg-white text-purple-600 rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Explore Products
              </button>
              <button className="px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto md:mx-0">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Products</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-90">Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Featured Products Preview */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-xl h-32 mb-3"></div>
                <div className="h-3 bg-white bg-opacity-50 rounded mb-2"></div>
                <div className="h-3 bg-white bg-opacity-30 rounded w-2/3"></div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-transform mt-8">
                <div className="bg-white rounded-xl h-32 mb-3"></div>
                <div className="h-3 bg-white bg-opacity-50 rounded mb-2"></div>
                <div className="h-3 bg-white bg-opacity-30 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
