/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "sf-pro-display": "SF Pro Display",
        "sf-pro-text": "SF Pro Text"
      },
      colors: {
        "abu": "rgba(0, 0, 0, 0.56)",
        "nav": "rgba(22, 22, 23, 0.8)",
        "nav-md-text": "rgba(255, 255, 255, 0.8)",
        "bg-button": "rgb(0, 113, 227)",
        "bg-button-hover": "#0077ED",
        "text-footer": "rgba(0, 0, 0, 0.88)" ,
        "text-footer-sub-li": "rgba(0, 0, 0, 0.72)"
      },
      theme:{
        screens: {
          "2kolom": "731px"
        }
      }
    },
  },
  plugins: [],
}