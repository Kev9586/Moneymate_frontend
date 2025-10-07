/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D6EFD",
        primaryGreen: "#00B87C",
        alertRed: "#FF4D4F",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #0D6EFD, #00B87C)',
      }
    },
  },
  plugins: [],
}