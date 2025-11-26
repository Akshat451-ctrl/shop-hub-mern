import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';

/**
 * Sample products data - 20 realistic products across different categories
 * Using high-quality images from Unsplash
 */
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    name: 'Smart Watch Series 5',
    price: 299.99,
    category: 'Electronics',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Advanced fitness tracking and notifications'
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    category: 'Accessories',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Durable backpack with laptop compartment'
  },
  {
    name: 'USB-C Hub Adapter',
    price: 34.99,
    category: 'Electronics',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop',
    description: '7-in-1 USB-C hub with multiple ports'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    price: 129.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    description: 'RGB backlit mechanical keyboard'
  },
  {
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking'
  },
  {
    name: 'Portable Phone Charger 20000mAh',
    price: 39.99,
    category: 'Electronics',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1609594044401-7b7b3c6e3a0e?w=500&h=500&fit=crop',
    description: 'High-capacity portable charger'
  },
  {
    name: 'Yoga Mat Premium',
    price: 34.99,
    category: 'Sports',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    description: 'Non-slip exercise yoga mat'
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    category: 'Sports',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    description: 'Insulated water bottle keeps drinks cold for 24hrs'
  },
  {
    name: 'Running Shoes Pro',
    price: 89.99,
    category: 'Sports',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    description: 'Lightweight running shoes with cushioning'
  },
  {
    name: 'Coffee Maker Deluxe',
    price: 79.99,
    category: 'Home',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    description: 'Programmable coffee maker with thermal carafe'
  },
  {
    name: 'Air Purifier HEPA Filter',
    price: 149.99,
    category: 'Home',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
    description: 'Smart air purifier for large rooms'
  },
  {
    name: 'LED Desk Lamp',
    price: 44.99,
    category: 'Home',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    description: 'Adjustable LED lamp with USB charging port'
  },
  {
    name: 'Bluetooth Speaker Waterproof',
    price: 59.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Portable waterproof speaker with 12hr battery'
  },
  {
    name: 'Digital Camera 4K',
    price: 599.99,
    category: 'Electronics',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
    description: 'Professional 4K digital camera'
  },
  {
    name: 'Fitness Resistance Bands Set',
    price: 19.99,
    category: 'Sports',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop',
    description: 'Set of 5 resistance bands for home workout'
  },
  {
    name: 'Ceramic Cookware Set',
    price: 129.99,
    category: 'Home',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
    description: '10-piece non-stick ceramic cookware set'
  },
  {
    name: 'Smart LED Light Bulbs 4-Pack',
    price: 39.99,
    category: 'Home',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&h=500&fit=crop',
    description: 'WiFi-enabled color-changing LED bulbs'
  },
  {
    name: 'Tablet 10-inch Display',
    price: 249.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop',
    description: 'High-resolution tablet with stylus support'
  },
  {
    name: 'Dumbbell Set Adjustable',
    price: 159.99,
    category: 'Sports',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop',
    description: 'Adjustable dumbbells 5-52.5 lbs per hand'
  },
  {
    name: 'Gaming Headset RGB',
    price: 89.99,
    category: 'Electronics',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=500&fit=crop',
    description: 'RGB gaming headset with surround sound'
  },
  {
    name: 'Wireless Earbuds Pro',
    price: 149.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop',
    description: 'True wireless earbuds with active noise cancellation'
  },
  {
    name: 'Smartphone Stand Holder',
    price: 19.99,
    category: 'Electronics',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&h=500&fit=crop',
    description: 'Adjustable smartphone stand for desk or car'
  },
  {
    name: 'External SSD 1TB',
    price: 119.99,
    category: 'Electronics',
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/71bBCTIvIIL.jpg',
    description: 'Fast external SSD for data storage and backup'
  },
  {
    name: 'Tennis Racket Professional',
    price: 199.99,
    category: 'Sports',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
    description: 'Carbon fiber tennis racket for advanced players'
  },
  {
    name: 'Yoga Block Set',
    price: 14.99,
    category: 'Sports',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    description: 'Set of 2 foam yoga blocks for support'
  },
  {
    name: 'Basketball Wilson Evolution',
    price: 79.99,
    category: 'Sports',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=500&fit=crop',
    description: 'Official size basketball for indoor/outdoor use'
  },
  {
    name: 'Cotton T-Shirt Classic',
    price: 15.99,
    category: 'Clothing',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    description: 'Comfortable cotton t-shirt in multiple colors'
  },
  {
    name: 'Denim Jeans Slim Fit',
    price: 49.99,
    category: 'Clothing',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    description: 'Slim fit denim jeans with stretch'
  },
  {
    name: 'Hooded Sweatshirt',
    price: 39.99,
    category: 'Clothing',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
    description: 'Cozy hooded sweatshirt for casual wear'
  }
];

/**
 * Seed function to populate the database
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
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
