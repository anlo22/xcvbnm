import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5e8e2",
          100: "#f5e8e2",
          200: "#f5e8e2",
          300: "#c69480",
          400: "#c69480",
          500: "#c69480",
          600: "#c69480",
          700: "#030304",
          800: "#030304",
          900: "#030304",
        },
        secondary: {
          50: "#f5e8e2",
          100: "#f5e8e2",
          200: "#f5e8e2",
          300: "#c69480",
          400: "#c69480",
          500: "#c69480",
          600: "#c69480",
          700: "#030304",
          800: "#030304",
          900: "#030304",
        },
      },
    },
  },
  plugins: [],
};

export default config;

