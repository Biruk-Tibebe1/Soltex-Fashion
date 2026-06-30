import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7fcf7',
          100: '#eef7ed',
          200: '#d7eacf',
          300: '#b6d3a8',
          400: '#8bb677',
          500: '#72aa56',
          600: '#5b8d42',
          700: '#4a7036',
          800: '#3f5d2d',
          900: '#364e28',
        },
      },
      boxShadow: {
        soft: '0 18px 50px rgba(50, 75, 50, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
