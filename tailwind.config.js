/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in',
      'fade-out': 'fadeOut 0.3s ease-out',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      fadeOut: {
        from: { opacity: '1' },
        to: { opacity: '0' },
      },
      'modal-bounce': {
        '0%, 100%': { transform: 'translateY(-20px)' },
        '50%': { transform: 'translateY(0)' },
      },
      'zoom-out': {
        from: { transform: 'scale(1)' },
        to: { transform: 'scale(0)' },
      },
      'zoom-in': {
        from: { transform: 'scale(0)' },
        to: { transform: 'scale(1)' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}