/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#ffff',
        "columnBackgroundColor": '#ffff'
      }
    },
  },
  plugins: [],
  corePlugins: {
    transform: true
  }
}