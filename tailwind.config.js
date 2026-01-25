export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#D4A800',  // Accessible gold
          2: '#074621',  // Dark green
          3: '#7A9B2F',  // Light green
        },
        secondary: {
          1: '#527A35',
          2: '#5C5410',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        tablet: '768px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
};
