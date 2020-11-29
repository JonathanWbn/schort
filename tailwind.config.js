module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    fontFamily: {
      caption: ['PT Sans Caption', 'sans-serif'],
    },
    extend: {
      colors: {
        accent: '#f26e03',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
