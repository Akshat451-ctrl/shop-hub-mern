import React from 'react'

const About = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About ShopHub</h1>
        <p className="text-lg text-gray-700 mb-6">We are a passionate team dedicated to bringing you the best products, at the best prices, with a delightful shopping experience.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Curated Selection</h3>
            <p className="text-sm text-gray-600">Hand-picked products from trusted sellers.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Reliable shipping and easy returns.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-sm text-gray-600">We are here to help 24/7.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
