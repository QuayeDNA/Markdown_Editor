/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
      
    },
  },
  plugins: [],
}

