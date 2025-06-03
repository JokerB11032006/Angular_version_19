/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss,css}',
    './src/**/**/*.html',
    './src/**/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}; 