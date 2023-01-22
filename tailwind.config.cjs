/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT')
const plugin = require('tailwindcss/plugin')
const rotate3d = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-x-0': {
      transform: 'rotateX(0deg)'
    },
    '.rotate-x-90': {
      transform: 'rotateX(90deg)'
    },
    '.-rotate-x-90': {
      transform: 'rotateX(-90deg)'
    },
    '.rotate-x-180': {
      transform: 'rotateX(180deg)'
    },
    '.-rotate-x-180': {
      transform: 'rotateX(-180deg)'
    },
    '.rotate-y-0': {
      transform: 'rotateY(0deg)'
    },
    '.rotate-y-90': {
      transform: 'rotateY(90deg)'
    },
    '.-rotate-y-90': {
      transform: 'rotateY(-90deg)'
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)'
    },
    '.-rotate-y-180': {
      transform: 'rotateY(-180deg)'
    }
  })
})

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/*.{scss, css}'
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
          400: '#de9b16'
        },
        rankingbg: {
          100: '#1D1D1D -2.95%',
          200: '#505050 50.18%',
          300: '#1D1D1D 106.29%'
        },
        rankingBorder: {
          100: '#F2C83E',
          101: '#544B2A',
          200: '#CCCCCC',
          201: '#3A3A3A',
          300: '#CBA686',
          301: '#675749'
        },
        grid: {
          100: '#FF5F85',
          200: '#FFC25F',
          300: '#7AC943',
          400: '#3FA9F5'
        }
      },
      backgroundImage: {
        'link-button-54': 'linear-gradient(54deg, #FCED95, #9c6c0e, #FCED95)',
        'great-theme': 'linear-gradient(56deg, #FCED9510, #9c6c0e60, #FCED9510)'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        film: '2 / 1',
        cinema: '2.35 / 1',
        portrait: '9 / 16'
      },
      screens: {
        '1.5xl': '1440px',
        '3xl': '1520px',
        375: '375px',
        390: '390px',
        414: '414px'
      },
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        25: 'repeat(25, minmax(0, 1fr))'
      }
    }
  },
  plugins: [rotate3d, require('@tailwindcss/typography')]
})
