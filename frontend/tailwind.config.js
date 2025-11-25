/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}
