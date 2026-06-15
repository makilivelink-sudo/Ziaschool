/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        schoolRed: '#cc0000',
        schoolBlue: '#0057b8',
        schoolBlueDark: '#143a7b',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(204, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      backgroundImage: {
        heroGlow:
          'radial-gradient(circle at top left, rgba(204,0,0,.18), transparent 35%), radial-gradient(circle at top right, rgba(204,0,0,.12), transparent 28%)',
      },
    },
  },
  plugins: [],
};
