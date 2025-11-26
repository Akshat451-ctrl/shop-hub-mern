import React from 'react'

const Contact = () => {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">Have questions? Send us a message and we'll get back to you within 24 hours.</p>

        <form className="bg-white rounded-xl shadow-md p-6 grid gap-4">
          <input type="text" placeholder="Your name" className="border p-3 rounded" />
          <input type="email" placeholder="Your email" className="border p-3 rounded" />
          <textarea placeholder="Message" rows="6" className="border p-3 rounded"></textarea>
          <div className="text-right">
            <button type="submit" className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
