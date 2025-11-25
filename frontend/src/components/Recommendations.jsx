import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

/**
 * Recommendations Component
 * Displays personalized product recommendations
 */
const Recommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get('http://localhost:5000/api/recommendations', { headers });
      const recommendationsData = response.data.recommendations || response.data;
      setRecommendations(recommendationsData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {user ? '✨ Recommended For You' : '🔥 Top Picks'}
            </h2>
            <p className="text-gray-600">
              {user ? 'Based on your interests' : 'Our most popular products'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
