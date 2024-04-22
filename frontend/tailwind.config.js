/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      colors: {
        'dark-1': '#151619',
        'dark-2': '#1D1F22',
        'dark-3': '#2B2D31',
        'grey-3': '#35393F',
        'grey-2': '#5A6069',
        'grey-1': '#7C8187',
        'light-4': '#C1C4CB',
        'light-3': '#E4E4E4',
        'light-2': '#F5F5F5',
        'light': '#FFFFFF',
        'orange': '#E46643',
        'orange-light': '#F39765',
      },
      'light-theme': {
        'primary': '#35393F',
        'secondary': '#7C8187',
        'secondary-2': '#E4E4E4',
        'background-1': '#FFFFFF',
        'background-2': '#F5F5F5',
      },
      'dark-theme': {
        'primary': '#C1C4CB',
        'secondary': '#C1C4CB',
        'secondary-2': '#5A6069',
        'background-1': '#151619',
        'background-2': '#1D1F22',
        'background-3': '#2B2D31',
      },
      letterSpacing: {
        'extra-wide': '.5em',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
}

