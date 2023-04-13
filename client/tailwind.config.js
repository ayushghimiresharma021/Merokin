/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      custom: ['Cereal', 'sans-serif']
    },
    extend: {
      colors:{
        primary: '#F5385D'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

