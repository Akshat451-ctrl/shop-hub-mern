const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';

/**
 * Sample products data - 20 realistic products across different categories
 * Using placeholder images from via.placeholder.com
 */
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x300/4A90E2/ffffff?text=Headphones',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    name: 'Smart Watch Series 5',
    price: 299.99,
    category: 'Electronics',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x300/50C878/ffffff?text=Smart+Watch',
    description: 'Advanced fitness tracking and notifications'
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    category: 'Accessories',
    rating: 4.3,
    image: 'https://via.placeholder.com/300x300/FF6B6B/ffffff?text=Backpack',
    description: 'Durable backpack with laptop compartment'
  },
  {
    name: 'USB-C Hub Adapter',
    price: 34.99,
    category: 'Electronics',
    rating: 4.2,
    image: 'https://via.placeholder.com/300x300/95E1D3/ffffff?text=USB+Hub',
    description: '7-in-1 USB-C hub with multiple ports'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    price: 129.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x300/F38181/ffffff?text=Keyboard',
    description: 'RGB backlit mechanical keyboard'
  },
  {
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    rating: 4.4,
    image: 'https://via.placeholder.com/300x300/AA96DA/ffffff?text=Mouse',
    description: 'Ergonomic wireless mouse with precision tracking'
  },
  {
    name: 'Portable Phone Charger 20000mAh',
    price: 39.99,
    category: 'Electronics',
    rating: 4.6,
    image: 'https://via.placeholder.com/300x300/FCBAD3/ffffff?text=Power+Bank',
    description: 'High-capacity portable charger'
  },
  {
    name: 'Yoga Mat Premium',
    price: 34.99,
    category: 'Sports',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x300/A8D8EA/ffffff?text=Yoga+Mat',
    description: 'Non-slip exercise yoga mat'
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    category: 'Sports',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x300/FFD93D/ffffff?text=Water+Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24hrs'
  },
  {
    name: 'Running Shoes Pro',
    price: 89.99,
    category: 'Sports',
    rating: 4.6,
    image: 'https://via.placeholder.com/300x300/6BCB77/ffffff?text=Running+Shoes',
    description: 'Lightweight running shoes with cushioning'
  },
  {
    name: 'Coffee Maker Deluxe',
    price: 79.99,
    category: 'Home',
    rating: 4.4,
    image: 'https://via.placeholder.com/300x300/4D96FF/ffffff?text=Coffee+Maker',
    description: 'Programmable coffee maker with thermal carafe'
  },
  {
    name: 'Air Purifier HEPA Filter',
    price: 149.99,
    category: 'Home',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x300/FFB6B9/ffffff?text=Air+Purifier',
    description: 'Smart air purifier for large rooms'
  },
  {
    name: 'LED Desk Lamp',
    price: 44.99,
    category: 'Home',
    rating: 4.3,
    image: 'https://via.placeholder.com/300x300/FEC8D8/ffffff?text=Desk+Lamp',
    description: 'Adjustable LED lamp with USB charging port'
  },
  {
    name: 'Bluetooth Speaker Waterproof',
    price: 59.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x300/957DAD/ffffff?text=Speaker',
    description: 'Portable waterproof speaker with 12hr battery'
  },
  {
    name: 'Digital Camera 4K',
    price: 599.99,
    category: 'Electronics',
    rating: 4.9,
    image: 'https://via.placeholder.com/300x300/E4C1F9/ffffff?text=Camera',
    description: 'Professional 4K digital camera'
  },
  {
    name: 'Fitness Resistance Bands Set',
    price: 19.99,
    category: 'Sports',
    rating: 4.4,
    image: 'https://via.placeholder.com/300x300/FF6B9D/ffffff?text=Resistance+Bands',
    description: 'Set of 5 resistance bands for home workout'
  },
  {
    name: 'Ceramic Cookware Set',
    price: 129.99,
    category: 'Home',
    rating: 4.6,
    image: 'https://via.placeholder.com/300x300/C1E1C1/ffffff?text=Cookware',
    description: '10-piece non-stick ceramic cookware set'
  },
  {
    name: 'Smart LED Light Bulbs 4-Pack',
    price: 39.99,
    category: 'Home',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x300/BEDCFA/ffffff?text=Smart+Bulbs',
    description: 'WiFi-enabled color-changing LED bulbs'
  },
  {
    name: 'Tablet 10-inch Display',
    price: 249.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x300/FFD6A5/ffffff?text=Tablet',
    description: 'High-resolution tablet with stylus support'
  },
  {
    name: 'Dumbbell Set Adjustable',
    price: 159.99,
    category: 'Sports',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x300/CAFFBF/ffffff?text=Dumbbells',
    description: 'Adjustable dumbbells 5-52.5 lbs per hand'
  }
];

/**
 * Seed function to populate the database
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
