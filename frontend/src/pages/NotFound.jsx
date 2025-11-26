import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="py-20 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-6xl mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page not found</p>
        <Link to="/" className="px-6 py-3 bg-primary-500 text-white rounded-lg">Back to Home</Link>
      </div>
    </section>
  )
}

export default NotFound
