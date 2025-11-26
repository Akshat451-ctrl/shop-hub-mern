import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

const FeaturedSection = ({ onAddToCart, onToggleFavorite, favorites = [], user }) => {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured()
  }, [])

  const fetchFeatured = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/products?sort=rating&page=1&limit=8')
      const products = res.data.products || res.data
      setFeatured(products)
    } catch (err) {
      console.error(err)
      setFeatured([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Featured Picks</h3>
          <p className="text-sm text-gray-600">Hand-picked top-rated products</p>
        </div>

        <div className="overflow-x-auto -mx-2 py-2">
          <div className="inline-flex gap-4 px-2">
            {featured.map(p => (
              <div key={p._id} className="w-64 flex-shrink-0">
                <ProductCard product={p} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} isFavorite={favorites?.includes(p._id)} user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
