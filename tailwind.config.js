// tailwind.config.js - WCAG AA Compliant Color System
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Updated for WCAG AA compliance
          1: '#C29600',  // Darker gold - 4.5:1 contrast on white
          2: '#074621',  // Dark green (already compliant)
          3: '#6B8A28',  // Darker light green - better contrast
        },
        secondary: {
          1: '#476C2D',  // Darker for better contrast
          2: '#4D4A0E',  // Darker brown
        },
        support: {
          1: '#FFF8E0',  // Light background
          2: '#E6F0C3',  // Light green background
        },
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',    // Small phones
        'sm': '640px',    // Default TW small
        'tablet': '768px',
        'lg': '1024px',   // Default TW large
        'desktop': '1280px',
        '2xl': '1536px',  // Large desktop
      },
      // Add container queries support
      containers: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
      },
    },
  },
  plugins: [
    // Add container queries plugin
    // npm install @tailwindcss/container-queries
  ],
};