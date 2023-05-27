/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        white: {
          1: '#fff',
          2: '#F6F7F9',
        },
        black: '#222',
        yellow: '#D9C306',
        red: '#F02C2C',
        green: '#109B26',
      },
      backgroundImage: {
        'card-1': "url('../images/card1.svg')",
        'card-2': "url('../images/card2.svg')",
        'card-3': "url('../images/card3.svg')",
      },
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      chivo: ['Chivo', 'sans-serif'],
    },
  },
  plugins: [],
};
