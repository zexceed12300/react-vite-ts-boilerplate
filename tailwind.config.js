import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        inherit: "inherit",
      },
      colors: {
        primary: "#60a5fa", // Tailwind's blue-400
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
