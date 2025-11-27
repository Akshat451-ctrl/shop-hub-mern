import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

const CartPage = ({ cart = [], setCart }) => {
  const removeItem = (id) => {
    setCart && setCart(cart.filter(i => i._id !== id))
  }

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/" className="px-6 py-3 bg-primary-500 text-white rounded-lg">Continue Shopping</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                    <button onClick={() => removeItem(item._id)} className="text-sm text-red-500 mt-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
              <Link to="/checkout" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
