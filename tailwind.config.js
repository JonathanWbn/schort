module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    fontFamily: {
      caption: ['PT Sans Caption', 'sans-serif'],
    },
    extend: {
      colors: {
        'accent-1': '#f26e03',
        'bg-light': 'rgba(255,255,255,0.2)',
        'bg-white-light': 'rgba(255,255,255,0.4)',
      },
      transitionProperty: {
        top: 'top',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
