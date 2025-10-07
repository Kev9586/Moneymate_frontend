const { theme } = require('./src/constants/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: theme.colors.primaryBlue,
        primaryGreen: theme.colors.primaryGreen,
        alertRed: theme.colors.alertRed,
        textDark: theme.colors.textDark,
        textLight: theme.colors.textLight,
        bgLight: theme.colors.bgLight,
        dark: {
          bg: '#1A1A1A',
          text: '#FFFFFF',
          card: '#2C2C2C'
        }
      },
      borderRadius: {
        md: theme.radius.md,
        lg: theme.radius.lg,
        xl: theme.radius.xl,
      },
      boxShadow: {
        soft: theme.shadow.soft,
        medium: theme.shadow.medium,
      },
      fontFamily: {
        heading: [theme.font.heading],
        body: [theme.font.body],
      },
      fontSize: {
        '2xl': '1.5rem', // section headings
        'lg': '1.125rem', // card titles
        'base': '1rem', // body
        'sm': '0.875rem', // labels
      },
      backgroundImage: {
        'primary-gradient': theme.colors.primaryGradient,
      }
    },
  },
  plugins: [],
}