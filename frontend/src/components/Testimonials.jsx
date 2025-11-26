import React, { useState, useEffect } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Johnson',
      text: 'Amazing selection and fast delivery! The product quality exceeded my expectations.',
      role: 'Verified Buyer',
      avatar: 'A',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      text: 'Great prices and excellent customer service. Will definitely shop here again!',
      role: 'Verified Buyer',
      avatar: 'P',
      rating: 5
    },
    {
      name: 'Sam Wilson',
      text: 'I love the personalized recommendations — they\'re always spot on for my taste.',
      role: 'Frequent Shopper',
      avatar: 'S',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      text: 'Beautiful packaging and items arrived in perfect condition. Highly recommend!',
      role: 'Verified Buyer',
      avatar: 'M',
      rating: 5
    },
    {
      name: 'David Chen',
      text: 'The website is so user-friendly and the checkout process is seamless.',
      role: 'Tech Enthusiast',
      avatar: 'D',
      rating: 5
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000) // Change testimonial every 4 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-gray-600 text-lg">Real reviews from real shoppers</p>
        </div>

        {/* Rotating Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none">"</div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    style={{ backgroundColor: getAvatarColor(currentTestimonial.name) }}
                  >
                    {currentTestimonial.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    {/* Star Rating */}
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      "{currentTestimonial.text}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</div>
                    <div className="text-blue-600 font-medium">{currentTestimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-linear"
              style={{
                width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                transition: 'width 4s linear'
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-16 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
