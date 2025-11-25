const mongoose = require('mongoose');

/**
 * Product Schema
 * Defines the structure for product documents in MongoDB
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create text index for efficient searching
productSchema.index({ name: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
