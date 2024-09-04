/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'main': '#0aad0a',
        'light-color':"#f0f3f2",
        'rating-color':"#ffc908",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

