# ShopHub Frontend

React frontend application for the ShopHub e-commerce platform.

## Features

- Modern, responsive UI built with React 18
- Real-time search with autosuggest dropdown
- Category-based product filtering
- Product grid with hover effects
- Tailwind CSS for styling
- Functional components with React Hooks
- Axios for API communication

## Components

### App.jsx
Main application component that manages global state and coordinates child components.

### Header.jsx
Navigation header with logo, search bar, and autosuggest functionality.
- Debounced search input (300ms)
- Max 5 suggestions displayed
- Click outside to close dropdown
- Search on Enter or suggestion click

### Hero.jsx
Promotional banner section with call-to-action.

### FilterBar.jsx
Category filter dropdown to filter products by category.

### ProductGrid.jsx
Responsive grid layout displaying product cards.

### ProductCard.jsx
Individual product card showing:
- Product image
- Product name
- Star rating
- Price
- Add to Cart button

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

3. Build for production:
```bash
npm run build
```

## Configuration

### API Configuration
The frontend is configured to use the live backend API at `https://shop-hub-mern.onrender.com`.

**Environment Variables:**
- `VITE_API_URL`: Backend API URL (default: `https://shop-hub-mern.onrender.com`)

**Image Proxy:**
All product images are routed through the backend proxy (`/proxy?url=`) to bypass CORS restrictions from external image sources (e.g., Amazon S3).

For local development, create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

To change the API URL, update the axios calls in:
- `src/App.jsx`
- `src/components/Header.jsx`
- `src/components/AuthModal.jsx`
- `src/components/Recommendations.jsx`
- `src/components/FeaturedSection.jsx`
- `src/pages/ProductDetails.jsx`
- `src/pages/Profile.jsx`

### Tailwind Configuration
Customize Tailwind in `tailwind.config.js`:
- Extend colors, fonts, spacing
- Add custom animations
- Configure breakpoints
- Add plugins

## Responsive Breakpoints (Tailwind)

- `sm`: 640px (2-column grid)
- `md`: 768px (mobile adjustments)
- `lg`: 1024px (3-column grid)
- `xl`: 1280px (4-column grid)
- `2xl`: 1536px (extra large screens)

## Technologies

- React 18
- Vite
- Axios
- Tailwind CSS
- PostCSS
- Autoprefixer
