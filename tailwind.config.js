/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: { 50:'#fff7ed', 100:'#ffedd5', 200:'#fed7aa', 400:'#fb923c', 500:'#FF9933', 600:'#ea7612', 700:'#c25c0d' },
        igreen:  { 50:'#f0fdf4', 100:'#dcfce7', 400:'#4ade80', 500:'#138808', 600:'#16a34a', 700:'#15803d' },
        inavy:   { 50:'#eef2ff', 100:'#e0e7ff', 400:'#818cf8', 500:'#1a237e', 600:'#1e3a8a', 700:'#1e3a8a', 900:'#0f1f4a' },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeUp: { from:{ opacity:0, transform:'translateY(16px)' }, to:{ opacity:1, transform:'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
