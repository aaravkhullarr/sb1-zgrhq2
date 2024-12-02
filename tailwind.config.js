/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-orange': '#fd6600',
        'light-orange': '#e4a74b',
        'tan': '#edc9af',
        'peach': '#f9e7cf',
        'navy': '#040084',
      },
      fontFamily: {
        cocomat: ['"Cocomat Pro"', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        josefin: ['"Josefin Slab"', 'serif'],
        avallon: ['"Avallon Alt"', 'sans-serif'],
        biro: ['"Biro Script Plus"', 'cursive'],
      },
    },
  },
  plugins: [],
};