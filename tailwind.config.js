/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#000', // Optional if you want to specify #000 color in Tailwind
      },
      fontFamily: {
        'motiva': ['Motiva Sans Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

