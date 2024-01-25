/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        purple: "#5032A0",
        orange: "#FF4600",
        green: "#00D9B5",
      },
      fontFamily: {
        sans: ["Neue Haas Grotesk", ...defaultTheme.fontFamily.sans],
        display: ["Diatype Compressed", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
