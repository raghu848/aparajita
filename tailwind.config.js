/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAF7',
          100: '#FAF7F2',
          200: '#F4ECE4',
          300: '#EDE2D6',
          400: '#DFD0C0',
          DEFAULT: '#FAF7F2',
        },
        beige: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#ECE4DC',
          300: '#DFD4C8',
          400: '#CDBEAF',
          DEFAULT: '#ECE4DC',
        },
        blush: {
          50: '#FDF8F7',
          100: '#F8ECE9',
          200: '#F2D7D1',
          300: '#E5B7AE',
          400: '#D3968B',
          500: '#BD766A',
          600: '#A2594D',
          DEFAULT: '#F2D7D1',
        },
        warm: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
