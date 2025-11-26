import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getImageForTitle, getRandomPlaceholder } from '../utils/getImageForTitle'
import { getProxiedImageUrl } from '../utils/api'
// import { getImageForTitle, getRandomPlaceholder } from '../utils/getImageForTitle'

const ProductDetails = ({ onAddToCart, onToggleFavorite, favorites = [] }) => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const navigate = useNavigate()
  const headingRef = useRef(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/products/${id}`)
        // API returns { success: true, product }
        const payload = res.data && res.data.product ? res.data.product : res.data
        setProduct(payload)
        setSelectedImage((payload?.images && payload.images[0]) || payload?.image || '')
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  // Scroll to top and focus heading whenever the product id changes (navigation to /product/:id)
  useEffect(() => {
    // give React a tick to render the content, then scroll
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (headingRef.current) {
        headingRef.current.focus()
      }
    }, 50)
    return () => clearTimeout(t)
  }, [id])

  const submitReview = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add a review')
      return
    }

    setSubmittingReview(true)
    try {
      await axios.post(`/api/products/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Refresh product data
      const res = await axios.get(`/api/products/${id}`)
      const payload = res.data && res.data.product ? res.data.product : res.data
      setProduct(payload)
      setReviewComment('')
      setReviewRating(5)
    } catch (error) {
      console.error(error)
      alert('Failed to add review')
    }
    setSubmittingReview(false)
  }

  if (loading) return <div className="py-20 text-center">Loading product...</div>
  if (!product) return <div className="py-20 text-center">Product not found</div>

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const handleBuyNow = () => {
    if (onAddToCart) onAddToCart(product, quantity)
    navigate('/checkout')
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product._id}`
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url })
      } catch (err) {
        console.error('Share failed', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Product link copied to clipboard')
      } catch (err) {
        console.error('Copy failed', err)
      }
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <nav className="text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/?category=${product.category}`} className="hover:underline">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
          <div className="w-full h-[420px] flex items-center justify-center bg-gray-50 rounded-lg">
            <img 
              src={getProxiedImageUrl(selectedImage || product.image)}
              alt={product.name} 
              className="max-h-[380px] object-contain" 
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(img)} 
                  className={`border-2 rounded-lg p-1 transition-all duration-200 ${
                    selectedImage === img 
                      ? 'border-primary-500 shadow-md ring-2 ring-primary-200' 
                      : 'border-gray-200 hover:border-primary-300 hover:shadow-sm'
                  }`}
                >
                  <img 
                    src={getProxiedImageUrl(img)}
                    alt={`thumb-${idx}`} 
                    className="w-20 h-16 object-cover rounded" 
                  />
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 justify-between">
            <div className="text-sm text-gray-600">{product.brand || 'ShopHub'}</div>
            <div className="text-xs text-gray-500">SKU: {product._id.slice(0, 8)}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl font-bold text-primary-500 tracking-tight">${product.price?.toFixed(2)}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500">{renderStars(product.rating)} <span className="ml-1">{product.rating}</span></div>
            <div className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded">Free shipping</div>
            <span
              className={`px-2 py-1 text-xs rounded ${product.countInStock === undefined || product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
            >
              {product.countInStock === undefined ? 'Available' : (product.countInStock > 0 ? 'In stock' : 'Out of stock')}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-semibold shadow-sm hover:shadow"
                aria-label="Decrease quantity"
              >−</button>
              <div className="px-5 py-2 text-center min-w-[56px] font-semibold text-gray-800">{quantity}</div>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-semibold shadow-sm hover:shadow"
                aria-label="Increase quantity"
              >+</button>
            </div>
            <button 
              onClick={() => onAddToCart && onAddToCart(product, quantity)} 
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              🛒 Add to Cart
            </button>
            <button 
              onClick={handleBuyNow} 
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:shadow-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              ⚡ Buy Now
            </button>
            <button 
              onClick={handleShare} 
              className="px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button 
              onClick={() => onToggleFavorite && onToggleFavorite(product._id)} 
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                favorites.includes(product._id) 
                  ? 'bg-red-50 border-2 border-red-400 text-red-600 hover:bg-red-100' 
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <span className="flex items-center gap-2">
                {favorites.includes(product._id) ? '❤️' : '🤍'}
                {favorites.includes(product._id) ? 'Favorited' : 'Add to Favorites'}
              </span>
            </button>
          </div>
          <div className="text-sm text-gray-500">Category: {product.category}</div>
          <div className="mt-6 bg-white rounded-xl shadow p-4">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <button 
                onClick={() => setActiveTab('description')} 
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'description' 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('specs')} 
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'specs' 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab('shipping')} 
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'shipping' 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                Shipping & Returns
              </button>
            </div>
            <div className="text-sm text-gray-700">
              {activeTab === 'description' && (
                <div>{product.description || 'No detailed description provided for this product.'}</div>
              )}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-500">Category</div>
                  <div className="font-medium">{product.category}</div>
                  <div className="text-gray-500">Brand</div>
                  <div className="font-medium">{product.brand || 'ShopHub'}</div>
                  <div className="text-gray-500">Price</div>
                  <div className="font-medium">${product.price?.toFixed(2)}</div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div>
                  <p className="mb-2">Shipping: Usually ships in 1-3 business days. Free standard shipping on orders over $50.</p>
                  <p className="mb-0">Returns: 30-day return policy. Please refer to our Returns & Exchanges page for details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews ({product.reviews?.length || 0})</h2>
        
        {/* Add Review Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select 
                value={reviewRating} 
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="border rounded px-3 py-2"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea 
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Share your thoughts about this product..."
              />
            </div>
            <button 
              onClick={submitReview}
              disabled={submittingReview}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {submittingReview ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                '✍️ Submit Review'
              )}
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {product.reviews?.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{review.user?.name || 'Anonymous'}</div>
                  <div className="text-yellow-400">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {(!product.reviews || product.reviews.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
