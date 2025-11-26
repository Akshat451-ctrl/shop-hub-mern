import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

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
    const searchQuery = req.query.q;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId)
          .populate('viewHistory.product')
          .populate('favorites');

        if (user) {
          // If there's a search query provided, record it in user's searchHistory
          if (searchQuery && searchQuery.trim()) {
            user.searchHistory.unshift({ term: searchQuery.trim() });
            if (user.searchHistory.length > 20) user.searchHistory = user.searchHistory.slice(0, 20);
            await user.save();
          }
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

    // If a search query is provided, return products matching the query (highest priority)
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim();
      const matched = await Product.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      })
      .limit(8)
      .sort({ rating: -1 });

      // If we found matches, prefer those
      if (matched.length > 0) {
        recommendations = matched;
        isPersonalized = !!token;
      }
    }

    // If still no personalized recommendations, show top-rated products
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

// GET /api/recommendations/reviews - Get user's reviews
router.get('/reviews', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const products = await Product.find({ 'reviews.user': userId })
      .populate('reviews.user', 'name')
      .select('name reviews');

    const userReviews = [];
    products.forEach(product => {
      product.reviews.forEach(review => {
        if (review.user._id.toString() === userId) {
          userReviews.push({
            ...review.toObject(),
            product: { name: product.name }
          });
        }
      });
    });

    res.json({
      success: true,
      reviews: userReviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews'
    });
  }
});

export default router;
