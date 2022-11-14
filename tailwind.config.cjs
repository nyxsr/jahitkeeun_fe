/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        makeSlide:{
          '100%':{ backgroundPosition:'right'}
        },
        reversemakeSlide:{
          '100%':{ backgroundPosition:'left'}
        }
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      makeSlide: 'makeSlide .5s ease-in-out forwards',
      reversemakeSlide: 'reversemakeSlide .2s ease-out forwards'
    },
  },
  plugins: [],
}