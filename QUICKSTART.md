# 🚀 Quick Start Guide - ShopHub MERN Project

This guide will help you get the ShopHub application running in minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)
- **npm** (comes with Node.js)

## ⚡ Quick Setup (5 minutes)

### Step 1: Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:
```bash
npm install
```

**For MongoDB Atlas users:** Edit the `.env` file and replace the MongoDB URI:
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/shophub
PORT=5000
```

**For local MongoDB users:** The default `.env` is already configured:
```
MONGODB_URI=mongodb://localhost:27017/shophub
PORT=5000
```

Seed the database with sample products:
```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Successfully seeded 20 products
👋 Database connection closed
```

Start the backend server:
```bash
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server is running on http://localhost:5000
📊 API endpoints available at http://localhost:5000/api
```

**Keep this terminal open!**

### Step 2: Frontend Setup

Open a **NEW terminal** and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The application will automatically open in your browser at `http://localhost:5173`

## ✅ Verify Everything Works

1. **Homepage loads** - You should see the ShopHub header, hero banner, and product grid
2. **Products display** - 20 products should be visible in a grid layout
3. **Search works** - Type "wireless" in the search bar
   - Autosuggest dropdown should appear with up to 5 suggestions
   - Click a suggestion to filter products
4. **Category filter works** - Select "Electronics" from the dropdown
   - Products should filter to show only Electronics
5. **Responsive design** - Resize your browser window
   - Desktop: 4 columns
   - Tablet: 3 columns
   - Mobile: 1-2 columns

## 🎯 Testing the API Directly

You can test the API endpoints using your browser or tools like Postman:

**Get all products:**
```
http://localhost:5000/api/products
```

**Search for products:**
```
http://localhost:5000/api/search?q=wireless
```

## 🐛 Troubleshooting

### Backend won't start
- **Error: "Cannot connect to MongoDB"**
  - Make sure MongoDB is running (local) or your Atlas URI is correct
  - For local MongoDB: Run `mongod` in a separate terminal
  
### Frontend won't start
- **Error: "Port 5173 is already in use"**
  - Kill the process using port 5173 or change the port in `vite.config.js`

### Products not showing
- **Check if backend is running** - Visit `http://localhost:5000`
- **Check if database is seeded** - Run `npm run seed` in backend folder
- **Check browser console** - Press F12 and look for errors

### CORS errors
- Make sure backend is running on port 5000
- Check that CORS is enabled in `backend/server.js`

## 📁 Project Structure

```
shop-hub-mern/
├── backend/                 # Express.js API
│   ├── models/             # Mongoose schemas
│   │   └── Product.js
│   ├── routes/             # API routes
│   │   └── products.js
│   ├── .env                # Environment variables
│   ├── server.js           # Express server
│   ├── seed.js             # Database seeding script
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # Tailwind CSS imports
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md               # Main documentation
```

## 🎨 Features Implemented

✅ Single GitHub repository with /frontend and /backend folders
✅ React with Vite (functional components + hooks)
✅ Tailwind CSS for styling
✅ Fully responsive design (desktop, tablet, mobile)
✅ Header with working search bar
✅ Autosuggest dropdown (max 5 suggestions)
✅ Click suggestion fills input and filters products
✅ Hero banner section
✅ Product grid with 20 products
✅ Product cards show: image, name, price, star rating
✅ Hover effects (scale + shadow)
✅ Category dropdown filter
✅ Node.js + Express backend
✅ MongoDB database
✅ GET /api/products endpoint
✅ GET /api/search?q=term endpoint (case-insensitive, max 5 results)
✅ Seed file with 20 realistic products
✅ Clean, well-commented code
✅ Professional folder structure
✅ Comprehensive README with setup steps

## 🚀 Ready to Deploy?

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect your repository
3. Set environment variables (MONGODB_URI)
4. Deploy!

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in code to your backend URL

## 📸 Screenshots

Take screenshots of:
1. Desktop view with all products
2. Tablet view (resize browser)
3. Mobile view (resize browser)
4. Search autosuggest in action
5. Category filter working

Save them in a `screenshots/` folder and update the main README.md

## 🎓 Next Steps

- Add user authentication
- Implement shopping cart functionality
- Add product detail pages
- Implement pagination
- Add more filters (price range, rating)
- Add sorting options
- Implement checkout process

## 📝 Assignment Submission Checklist

- [ ] Both frontend and backend run with `npm install && npm start`
- [ ] Search with autosuggest works (max 5 suggestions)
- [ ] Category filter works
- [ ] At least 18 products in database
- [ ] Responsive design works on all screen sizes
- [ ] Pure CSS (no frameworks)
- [ ] Code is well-commented
- [ ] README.md is complete
- [ ] Screenshots added (optional but recommended)
- [ ] Pushed to GitHub

## 💡 Tips

- Keep both terminals (backend and frontend) running
- Use browser DevTools (F12) to debug issues
- Check Network tab to see API calls
- MongoDB Compass is great for viewing your database
- Use React DevTools extension for debugging React components

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in each file
- Check browser console for errors
- Verify both servers are running
- Make sure MongoDB is connected

---

**Congratulations! Your MERN stack e-commerce application is ready! 🎉**
