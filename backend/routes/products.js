const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * GET /api/products
 * Returns all products from the database
 * Supports pagination and filtering
 */
router.get('/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, sort, page = 1, limit = 100 } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Build sort
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching products' 
    });
  }
});

/**
 * GET /api/search?q=term
 * Performs case-insensitive partial search on product names
 * Returns maximum 5 results
 */
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    
    // Validate search term
    if (!searchTerm || searchTerm.trim() === '') {
      return res.json({ success: true, products: [] });
    }

    // Case-insensitive partial match search using regex
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .limit(5) // Maximum 5 results for autosuggest
    .select('name price category rating image'); // Select only needed fields

    res.json({ success: true, products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while searching products' 
    });
  }
});

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching product' 
    });
  }
});

module.exports = router;
