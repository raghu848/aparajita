/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F5EFEB',
          300: '#EFE7E0',
          400: '#E4D8CD',
          DEFAULT: '#F7F4EE',
        },
        champagne: {
          50: '#FAF7F0',
          100: '#F4EBD9',
          200: '#EADBBF',
          300: '#DFCBA4',
          400: '#D5BA89',
          DEFAULT: '#E8DCB8',
        },
        gold: {
          light: '#EED9A8',
          DEFAULT: '#C5A880',
          muted: '#A88C64',
          antique: '#9B7E54',
          shimmer: '#DFBE86',
        },
        charcoal: {
          50: '#3D3935',
          100: '#2E2B28',
          200: '#23201D',
          800: '#1A1816',
          900: '#121110',
          DEFAULT: '#141312',
          noir: '#0A0909',
        },
        blush: {
          soft: '#F4ECE8',
          muted: '#E5D6D0',
          dusty: '#C8B0A6',
          rose: '#9E7B73',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        editorial: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.35em',
        'super-wide': '0.5em',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
