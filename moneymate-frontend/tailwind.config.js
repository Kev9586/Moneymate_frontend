/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0D1C22',
        primary: {
          DEFAULT: '#1A3A42',
          dark: '#122C34',
        },
        accent: {
          DEFAULT: '#25D366',
          hover: '#1DB954',
        },
        'light-text': '#E2E8F0',
        'input-bg': '#1E293B',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
