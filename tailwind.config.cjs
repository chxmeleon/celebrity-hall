/** @type {import('tailwindcss').Config} */
module.exports = {
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
        cinema: '2.35 / 1'
      },
      screens: {
        '1.5xl': '1440px',
        '3xl': '1520px'
      },
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        25: 'repeat(25, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
}
