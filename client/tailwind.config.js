module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 1.3s linear infinite'
      },
      keyframes: {
        wave: {
          '0%, 60%, 100% ': {
            transform: 'initial'
          },
          '30%': {
            transform: 'translateY(-25%)'
          }
        }
      }
    },
  },
  plugins: [],
}
