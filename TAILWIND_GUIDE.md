# Tailwind CSS Implementation Guide

## Overview

This project uses **Tailwind CSS 3.4** for all styling. Tailwind is a utility-first CSS framework that allows you to build modern, responsive designs directly in your JSX.

## Setup

The project is already configured with Tailwind CSS. Here's what's included:

### Configuration Files

1. **tailwind.config.js** - Tailwind configuration
2. **postcss.config.js** - PostCSS configuration
3. **src/App.css** - Tailwind directives

### Installation

Tailwind and its dependencies are already in `package.json`:

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

## Custom Theme Configuration

### Colors

Custom colors are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#667eea',
        600: '#5568d3',
        700: '#764ba2',
      },
      secondary: {
        500: '#f5576c',
        600: '#f093fb',
      }
    }
  }
}
```

**Usage:**
```jsx
<div className="bg-primary-500 text-white">
  <button className="bg-primary-600 hover:bg-primary-700">
    Click me
  </button>
</div>
```

## Responsive Design

Tailwind uses mobile-first breakpoints:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

**Example:**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* 1 column on mobile, 2 on small tablets, 3 on laptops, 4 on desktops */}
</div>
```

## Common Patterns Used

### 1. Product Grid

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Responsive grid that adapts to screen size */}
</div>
```

### 2. Card with Hover Effects

```jsx
<div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
  {/* Card that lifts and increases shadow on hover */}
</div>
```

### 3. Gradient Backgrounds

```jsx
<header className="bg-gradient-to-r from-primary-500 to-primary-700">
  {/* Purple gradient header */}
</header>

<section className="bg-gradient-to-r from-pink-400 via-purple-400 to-red-400">
  {/* Multi-color gradient hero */}
</section>
```

### 4. Flexbox Layouts

```jsx
<div className="flex items-center justify-between gap-4">
  {/* Horizontal layout with space between items */}
</div>

<div className="flex flex-col gap-2">
  {/* Vertical layout with gap */}
</div>
```

### 5. Responsive Text

```jsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  {/* Text size increases on larger screens */}
</h1>
```

### 6. Buttons

```jsx
<button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300">
  Add to Cart
</button>
```

### 7. Input Fields

```jsx
<input 
  className="flex-1 px-4 py-3 text-gray-900 outline-none placeholder-gray-500 rounded-lg border-2 border-gray-300 focus:border-primary-500"
  placeholder="Search..."
/>
```

### 8. Dropdown/Autosuggest

```jsx
<div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
  {/* Positioned dropdown with scroll */}
</div>
```

## Utility Classes Reference

### Spacing
- `p-4` - padding: 1rem
- `px-6` - padding left/right: 1.5rem
- `py-3` - padding top/bottom: 0.75rem
- `m-4` - margin: 1rem
- `gap-4` - gap: 1rem

### Colors
- `bg-white` - white background
- `text-gray-900` - dark gray text
- `text-primary-500` - custom primary color
- `border-gray-300` - gray border

### Typography
- `text-xl` - font-size: 1.25rem
- `font-bold` - font-weight: 700
- `font-semibold` - font-weight: 600
- `line-clamp-2` - truncate to 2 lines

### Layout
- `flex` - display: flex
- `grid` - display: grid
- `grid-cols-4` - 4 columns
- `gap-6` - gap: 1.5rem

### Sizing
- `w-full` - width: 100%
- `h-64` - height: 16rem
- `max-w-7xl` - max-width: 80rem
- `min-h-screen` - min-height: 100vh

### Effects
- `shadow-md` - medium shadow
- `shadow-xl` - extra large shadow
- `rounded-lg` - border-radius: 0.5rem
- `rounded-xl` - border-radius: 0.75rem

### Transitions
- `transition-all` - transition all properties
- `duration-300` - 300ms duration
- `hover:shadow-2xl` - shadow on hover
- `hover:-translate-y-2` - move up on hover

### Positioning
- `relative` - position: relative
- `absolute` - position: absolute
- `sticky` - position: sticky
- `top-0` - top: 0
- `z-50` - z-index: 50

## Component Examples

### Header Component

```jsx
<header className="bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between gap-4 py-4">
      <h1 className="text-2xl md:text-3xl font-bold">🛍️ ShopHub</h1>
      {/* Search and nav */}
    </div>
  </div>
</header>
```

### Product Card Component

```jsx
<div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
  <div className="h-64 overflow-hidden bg-gray-100">
    <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-5">
    <h3 className="text-lg font-semibold text-gray-900 mb-2 min-h-[3rem] line-clamp-2">
      Product Name
    </h3>
    <div className="text-2xl font-bold text-primary-500 mb-4">$99.99</div>
    <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
      Add to Cart
    </button>
  </div>
</div>
```

## Customization

### Adding Custom Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        light: '#your-color',
        DEFAULT: '#your-color',
        dark: '#your-color',
      }
    }
  }
}
```

### Adding Custom Animations

```javascript
theme: {
  extend: {
    animation: {
      'bounce-slow': 'bounce 2s infinite',
    }
  }
}
```

### Adding Custom Utilities

In `src/App.css`:

```css
@layer utilities {
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## Best Practices

1. **Use Tailwind's spacing scale** - Stick to Tailwind's spacing (4, 6, 8, etc.) for consistency
2. **Mobile-first** - Start with mobile styles, then add responsive variants
3. **Reuse patterns** - Extract common patterns into components
4. **Use semantic colors** - Use color names that describe purpose (primary, secondary)
5. **Leverage hover states** - Add interactive feedback with hover utilities
6. **Combine utilities** - Chain utilities for complex effects

## Performance

Tailwind automatically purges unused CSS in production builds. The `content` array in `tailwind.config.js` tells Tailwind which files to scan:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground
- [Tailwind UI](https://tailwindui.com/) - Premium components

## Troubleshooting

### Styles not applying?
1. Make sure Tailwind directives are in `src/App.css`
2. Check that files are listed in `tailwind.config.js` content array
3. Restart dev server after config changes

### Custom colors not working?
1. Verify colors are in `tailwind.config.js` under `theme.extend.colors`
2. Restart dev server
3. Use correct syntax: `bg-primary-500` not `bg-primary500`

### Build size too large?
1. Ensure `content` array in config is correct
2. Remove unused dependencies
3. Run production build: `npm run build`

---

**Happy styling with Tailwind CSS! 🎨**
