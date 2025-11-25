# ShopHub - MERN Stack Product Landing Page

A modern, responsive e-commerce product landing page built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time search with autosuggest functionality.

## Features

### Core Features
- 🔍 Real-time search with autosuggest (max 5 suggestions)
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🎨 Modern UI with Tailwind CSS
- 🛍️ Product grid with 20 sample products
- 🏷️ Category-based filtering
- ⭐ Product ratings display
- 🎯 Hover effects and smooth animations
- 🔌 RESTful API backend

### New Professional Features
- 🔐 **User Authentication** - Secure login/register system
- 👤 **User Profiles** - Avatar and profile display
- 🎯 **Smart Recommendations** - Personalized product suggestions
- 💝 **Favorites System** - Save favorite products
- 📊 **View History** - Track browsing behavior
- 🎨 **Enhanced Hero** - Modern, animated hero section
- 🔒 **JWT Security** - Token-based authentication
- 📈 **Recommendation Engine** - AI-powered suggestions

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Axios for API calls
- Functional components with React Hooks
- JWT authentication
- LocalStorage for session management

**Backend:**
- Node.js & Express.js
- MongoDB (local or Atlas)
- Mongoose ODM
- CORS enabled
- JWT authentication
- Bcrypt password hashing

## Project Structure

```
shop-hub-mern/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express backend API
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── README.md
├── QUICKSTART.md
├── TAILWIND_GUIDE.md
└── PROJECT_SUMMARY.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already created with default values:
```
MONGODB_URI=mongodb://localhost:27017/shophub
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

For MongoDB Atlas, replace the URI with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub
```

4. Seed the database with sample products:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/search?q=term` - Search products (max 5 results)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `POST /api/recommendations/track-view` - Track product view
- `POST /api/recommendations/toggle-favorite` - Add/remove favorite

See `FEATURES_ADDED.md` for detailed API documentation.

## Screenshots

### Desktop View
![Desktop View](./screenshots/desktop.png)

### Tablet View
![Tablet View](./screenshots/tablet.png)

### Mobile View
![Mobile View](./screenshots/mobile.png)

### Search Autosuggest
![Search Autosuggest](./screenshots/autosuggest.png)

## Features in Detail

### Search & Autosuggest
- Real-time search as you type
- Dropdown shows max 5 relevant suggestions
- Click suggestion to fill input and filter products
- Click outside to close dropdown
- Debounced API calls for performance

### Product Grid
- Responsive grid layout (4 columns → 2 columns → 1 column)
- Product cards with image, name, price, and star ratings
- Hover effects with scale and shadow
- Smooth animations

### Category Filter
- Dropdown to filter products by category
- "All Categories" option to reset filter
- Combines with search functionality

### Responsive Design
- Desktop: 4-column grid
- Tablet: 2-column grid
- Mobile: 1-column grid
- Hamburger menu for mobile (if needed)

## Development

### Adding New Products
Edit `backend/seed.js` and run:
```bash
npm run seed
```

### Modifying Styles
This project uses **Tailwind CSS** for all styling.

- **Quick customization:** Edit utility classes directly in JSX components
- **Theme customization:** Modify `frontend/tailwind.config.js`
- **Custom utilities:** Add to `frontend/src/App.css`
- **Complete guide:** See `TAILWIND_GUIDE.md` for detailed documentation

### Environment Variables
- Backend: Create `.env` file with `MONGODB_URI` and `PORT`
- Frontend: API URL is set in the component (change if needed)

## Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from `backend` folder
3. Update frontend API URL

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable for API URL

## License

MIT License - feel free to use this project for learning and portfolio purposes.

## Author

Created as a MERN stack demonstration project.
