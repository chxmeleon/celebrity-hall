/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/*.{scss, css}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          100: '#373737',
          200: '#9c6c0e',
          300: '#FCED95',
          400: '#de9b16',
        },
      },
    },
  },
  plugins: [],
}
