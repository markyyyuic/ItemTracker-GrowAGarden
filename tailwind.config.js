/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        sunny: "url('/public/images/sunny.gif')",
        rain: "url('/public/images/rain.gif')",
        snow: "url('/public/images/snow.gif')",
        thunderstorm: "url('/public/images/thunderstorm.gif')",
        night: "url('/public/images/night.gif')",
        bloodmoon: "url('/public/images/bloodmoon.gif')",
        beeswarm: "url('/public/images/beeevent.gif')",
        default: "url('/public/images/sunny.gif')", 
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'flash': 'flash 1.5s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        flash: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
    },
  },
  plugins: [],
};
