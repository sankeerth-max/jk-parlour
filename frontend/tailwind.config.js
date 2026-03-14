/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        roseGold: '#b76e79',
        softPink: '#f9e3e8',
        beige: '#f5efe6',
        deepCharcoal: '#262626',
      },
      fontFamily: {
        display: ['\"Playfair Display\"', 'serif'],
        body: ['\"Poppins\"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 60px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};

