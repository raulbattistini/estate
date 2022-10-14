/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'pocket': {'min': '280px', 'max': '479px'},
      'phone': {'min': '480px', 'max': '639px'},
      'tablet': {'min': '640px', 'max': '767px'},
      'laptop': {'min': '768px', 'max': '1023px'},
      'desktop': {'min': '1024px', 'max': '1279px'},
      'ultrawide': { 'min': '1280px', 'max': '9999px'}
    },
    fontFamily: {
      poppins: ['poppins, "sans-serif"']
    },
    extend: {
      spacing: {
        '110': '36rem',
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.5)",
        "transparent": "rgba(255, 255, 255, 0)",
        "glass-white": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
}