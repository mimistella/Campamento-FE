/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'caesar-dressing-regular': ['"Caesar Dressing"', 'system-ui'],
      },
    },
  },
  plugins: [],
}

