/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c1': "#F4EDCC",
        'c2': "#A4CE95",
        'c3': "#6196A6",
        'c4': "#5F5D9C"
      },
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6196A6",
          "secondary": "#5F5D9C",
          "accent": "#212e53",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "autumn",
      "winter",
      "dracula"
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"),
  function ({ addUtilities }) {
    const newUtilities = {
      '.no-scrollbar::-webkit-scrollbar': {
        display: 'none'
      },
      '.no - scrollbar ': {
        '-ms - overflow - style': "none",
        /* IE and Edge */
        'scrollbar - width': "none"
        /* Firefox */
      }
    }
    addUtilities(newUtilities);
  }],
}
