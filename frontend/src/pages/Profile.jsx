import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Profile = ({ user }) => {
  const [favorites, setFavorites] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const fileInputRef = useRef(null)

  // Get avatar based on gender with robust fallbacks
  const getAvatarUrl = (user) => {
    if (user?.avatar && user.avatar !== 'https://picsum.photos/150/150?random=user') {
      return user.avatar
    }

    // Generate initials-based avatar
    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U'
    const colors = {
      male: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'],
      female: ['#EC4899', '#DB2777', '#BE185D', '#9D174D'],
      other: ['#6B7280', '#4B5563', '#374151', '#1F2937']
    }

    const gender = user?.gender || 'other'
    const colorIndex = firstLetter.charCodeAt(0) % colors[gender].length
    const bgColor = colors[gender][colorIndex]

    // Return a data URL for a simple SVG avatar with first letter
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="150" fill="${bgColor}"/>
        <text x="75" y="95" font-family="Arial, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="white">${firstLetter}</text>
      </svg>
    `)}`
  }

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      // Fetch favorites
      const favRes = await axios.get('https://shop-hub-mern.onrender.com/api/recommendations/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setFavorites(favRes.data.favorites || [])

      // Fetch user's reviews
      const reviewRes = await axios.get('https://shop-hub-mern.onrender.com/api/recommendations/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReviews(reviewRes.data.reviews || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle photo upload
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put('https://shop-hub-mern.onrender.com/api/auth/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      // Update user avatar in local storage and trigger re-render
      const updatedUser = { ...user, avatar: response.data.avatar }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      window.location.reload() // Simple way to refresh the page with new avatar
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Failed to upload photo. Please try again.')
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Mock update - in real app, call API
    alert('Profile update feature coming soon!')
    setLoading(false)
    setIsEditing(false)
  }

  if (!user) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">You're not logged in</h2>
          <p className="text-gray-600">Please log in to view and edit your profile.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-2xl overflow-hidden">
                <img
                  src={getAvatarUrl(user)}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Create a simple fallback avatar with initials
                    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
                    const canvas = document.createElement('canvas')
                    canvas.width = 150
                    canvas.height = 150
                    const ctx = canvas.getContext('2d')

                    // Generate color based on name
                    const colors = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6']
                    const colorIndex = initials.charCodeAt(0) % colors.length
                    ctx.fillStyle = colors[colorIndex]
                    ctx.fillRect(0, 0, 150, 150)

                    // Add text
                    ctx.fillStyle = 'white'
                    ctx.font = 'bold 48px Arial'
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(initials, 75, 75)

                    e.target.src = canvas.toDataURL()
                  }}
                />
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                title="Upload new photo"
              >
                📷
              </button>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {/* Gender Badge */}
              {user?.gender && (
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
                  user.gender === 'male' ? 'bg-blue-500' :
                  user.gender === 'female' ? 'bg-pink-500' : 'bg-gray-500'
                }`}>
                  {user.gender === 'male' ? '👨' : user.gender === 'female' ? '👩' : '🧑'}
                </div>
              )}
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  {user.name}
                </h1>
                <p className="text-xl text-gray-600 font-medium">{user.email}</p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Active Member
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">Joined recently</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {loading ? '...' : favorites.length}
                  </div>
                  <div className="text-sm font-medium text-blue-700">Favorites</div>
                  <div className="text-xs text-blue-500 mt-1">❤️ Loved items</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {loading ? '...' : reviews.length}
                  </div>
                  <div className="text-sm font-medium text-green-700">Reviews</div>
                  <div className="text-xs text-green-500 mt-1">⭐ Feedback given</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
                  <div className="text-sm font-medium text-purple-700">Orders</div>
                  <div className="text-xs text-purple-500 mt-1">🛒 Purchases</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ✏️ Edit Profile
                </button>
                <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg">
                  📊 View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? '💾 Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Favorites Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                ❤️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
                <p className="text-gray-500 text-sm">Items you've loved</p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your favorites...</p>
              </div>
            ) : favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.slice(0, 5).map((product) => (
                  <div key={product._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-red-600 font-bold text-lg">${product.price}</p>
                    </div>
                    <div className="text-red-400 text-xl">❤️</div>
                  </div>
                ))}
                {favorites.length > 5 && (
                  <div className="text-center mt-6">
                    <p className="text-gray-500 mb-3">And {favorites.length - 5} more favorites...</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      View All Favorites
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-6">Start exploring products and add them to your favorites!</p>
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  🛍️ Browse Products
                </button>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                <p className="text-gray-500 text-sm">Your product feedback</p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-200 border-t-yellow-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review._id} className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-500 text-lg">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{review.rating}/5</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                        {review.product?.name}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
                {reviews.length > 3 && (
                  <div className="text-center mt-6">
                    <p className="text-gray-500 mb-3">And {reviews.length - 3} more reviews...</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      View All Reviews
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
                <p className="text-gray-500 mb-6">Share your thoughts on products you've purchased!</p>
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  ✍️ Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center text-2xl">
              ⚙️
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-gray-500 text-sm">Manage your account preferences</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🛒</div>
              <h3 className="font-bold text-gray-900 mb-2">Order History</h3>
              <p className="text-sm text-gray-600 mb-4">View your past orders and track shipments</p>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold">
                Coming Soon
              </button>
            </div>

            <div className="group text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2">Security</h3>
              <p className="text-sm text-gray-600 mb-4">Change password and security settings</p>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold">
                Coming Soon
              </button>
            </div>

            <div className="group text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🔔</div>
              <h3 className="font-bold text-gray-900 mb-2">Notifications</h3>
              <p className="text-sm text-gray-600 mb-4">Manage email preferences and alerts</p>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
