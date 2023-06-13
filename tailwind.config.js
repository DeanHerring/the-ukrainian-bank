/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        white: {
          1: '#fff',
          2: '#F6F7F9',
          3: '#EFEFEF',
        },
        black: '#222',
        yellow: '#D9C306',
        red: '#F02C2C',
        green: '#109B26',
        blue: '#2684FF',
        gray: {
          1: '#848E9C',
        },
      },
      backgroundImage: {
        'card-1': "url('../images/card1.svg')",
        'card-2': "url('../images/card2.svg')",
        'card-3': "url('../images/card3.svg')",
        login: "url('/images/login.jpg')",
      },
      gridTemplateColumns: {
        31: 'repeat(3, 1fr) 3fr',
      },
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      chivo: ['Chivo', 'sans-serif'],
    },
    screens: {
      'md-800': { max: '800px' },
      'sm-500': { max: '500px' },
    },
  },
  plugins: [],
};
