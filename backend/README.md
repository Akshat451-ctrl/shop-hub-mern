# ShopHub Backend API

Express.js backend API for the ShopHub e-commerce application.

## Features

- RESTful API endpoints
- MongoDB database with Mongoose ODM
- Product search with case-insensitive partial matching
- CORS enabled for frontend communication
- Sample data seeding script

## API Endpoints

### GET /api/products
Returns all products from the database.

**Example Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Bluetooth Headphones",
    "price": 79.99,
    "category": "Electronics",
    "rating": 4.5,
    "image": "https://via.placeholder.com/300x300",
    "description": "Premium wireless headphones",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/search?q=term
Performs case-insensitive partial search on product names.
Returns maximum 5 results for autosuggest functionality.

**Query Parameters:**
- `q` (required): Search term

**Example Request:**
```
GET /api/search?q=wireless
```

**Example Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Bluetooth Headphones",
    "price": 79.99,
    "category": "Electronics",
    "rating": 4.5,
    "image": "https://via.placeholder.com/300x300"
  }
]
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/shophub
PORT=5000
```

3. Seed the database:
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Important Environment Variables

- `JWT_SECRET` (required in production): Secret used to sign and verify JWT tokens. Set this on your hosting environment (Render, Vercel, etc.) to a long, random string.
- `JWT_PREV_SECRET` (optional): If you rotate your JWT secret, set this to the previous secret so existing tokens remain valid during a grace period.

If `JWT_SECRET` differs between where tokens were issued and where they are verified (e.g., you change the secret), token verification will fail with `invalid signature` and users will need to re-login.


## Database Schema

### Product Model
```javascript
{
  name: String (required),
  price: Number (required, min: 0),
  category: String (required),
  rating: Number (required, min: 0, max: 5),
  image: String (required),
  description: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
