const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * GET /api/recommendations
 * Get personalized product recommendations
 * Based on user's view history and favorites
 */
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let recommendations = [];
    let isPersonalized = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId)
          .populate('viewHistory.product')
          .populate('favorites');

        if (user) {
          // Get categories from user's view history
          const viewedCategories = user.viewHistory
            .filter(item => item.product)
            .map(item => item.product.category);

          // Get categories from favorites
          const favoriteCategories = user.favorites
            .map(product => product.category);

          // Combine and get unique categories
          const preferredCategories = [...new Set([...viewedCategories, ...favoriteCategories])];

          if (preferredCategories.length > 0) {
            // Get products from preferred categories
            recommendations = await Product.find({
              category: { $in: preferredCategories },
              _id: { $nin: [...user.favorites.map(f => f._id)] }
            })
            .limit(8)
            .sort({ rating: -1 });
            
            isPersonalized = true;
          }
        }
      } catch (error) {
        console.log('Token verification failed, showing general recommendations');
      }
    }

    // If no personalized recommendations, show top-rated products
    if (recommendations.length === 0) {
      recommendations = await Product.find({})
        .sort({ rating: -1 })
        .limit(8);
    }

    res.json({
      success: true,
      recommendations,
      isPersonalized
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching recommendations' 
    });
  }
});

/**
 * POST /api/recommendations/track-view
 * Track product view for recommendations
 */
router.post('/track-view', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { productId } = req.body;

    if (!token || !productId) {
      return res.status(400).json({ message: 'Token and productId required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to view history (limit to last 20 views)
    user.viewHistory.unshift({ product: productId });
    if (user.viewHistory.length > 20) {
      user.viewHistory = user.viewHistory.slice(0, 20);
    }

    await user.save();

    res.json({ message: 'View tracked successfully' });
  } catch (error) {
    console.error('Error tracking view:', error);
    res.status(500).json({ message: 'Server error while tracking view' });
  }
});

/**
 * POST /api/recommendations/toggle-favorite
 * Add or remove product from favorites
 */
router.post('/toggle-favorite', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { productId } = req.body;

    if (!token || !productId) {
      return res.status(400).json({ 
        success: false,
        message: 'Token and productId required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const favoriteIndex = user.favorites.indexOf(productId);
    
    if (favoriteIndex > -1) {
      // Remove from favorites
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.json({ 
        success: true,
        message: 'Removed from favorites', 
        isFavorite: false 
      });
    } else {
      // Add to favorites
      user.favorites.push(productId);
      await user.save();
      res.json({ 
        success: true,
        message: 'Added to favorites', 
        isFavorite: true 
      });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while toggling favorite' 
    });
  }
});

/**
 * GET /api/recommendations/favorites
 * Get user's favorite products
 */
router.get('/favorites', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching favorites' 
    });
  }
});

module.exports = router;
