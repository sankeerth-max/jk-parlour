/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        roseGold: '#a67c52',
        softPink: '#f5f5f7',
        beige: '#f5f5f7',
        deepCharcoal: '#1d1d1f',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 60px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};

