/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        grow: {
          '0%': { width:'0%' },
          '100%': { width:'100%' },
        },
        openMenu: {
          '0%': {height:  '0%'},
          '100%': {height:  '100%'}
        },
      },
      animation: {
        grow: 'grow 1s ease-in-out infinite',
        openmenu:'openMenu 2s ease-in',
      },
      colors: {
        bg: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
      }
    },
  },
  plugins: [],
}
