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
        rankingbg: {
          100: '#1D1D1D -2.95%',
          200: '#505050 50.18%',
          300: '#1D1D1D 106.29%',
        },
        rankingBorder: {
          100: '#CCCCCC',
          200: '#3A3A3A',
        }
      },
    },
  },
  plugins: [],
}
