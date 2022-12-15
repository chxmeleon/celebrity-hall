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
          50: '#131313',
          70: '#252525',
          75: '#333333',
          100: '#373737',
          150: '#4A4A4B', 
          200: '#9c6c0e',
          300: '#FCED95',
          400: '#de9b16',
        },
      },
      backgroundImage: {
        'link-button-54': 'linear-gradient(54deg, #FCED95, #9c6c0e, #FCED95)',
      },
    },
  },
  plugins: [],
}
