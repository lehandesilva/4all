/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-1": "#141414",
        "p-2": "#202020",
        "p-3": "#383838",
        "s-1": "#c40b0c",
        "s-2": "#00BABA",
        "s-3": "#F1F1F1",
        "s-4": "#E4E4E4",
        "s-5": "#D6D6D6",
        "s-6": "#740001",
      },
    },
  },
  plugins: [],
};
