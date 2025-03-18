import type { Config } from "tailwindcss";
import {
  gray,
  blue,
  green,
  red,
  iris,
  grayDark,
  blueDark,
  greenDark,
  redDark,
  irisDark,
  cyan,
  violet,
  slate,
} from "@radix-ui/colors";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ...gray,
        ...blue,
        ...green,
        ...red,
        ...iris,
        ...grayDark,
        ...blueDark,
        ...redDark,
        ...irisDark,
        ...greenDark,
        ...cyan,
        ...violet,
        ...slate,
      },
      height: {
        "50": "50px",
      },
      screens: {
        "800": "800px",
        "900": "900px",
        "1000": "1000px",
        "1100": "1100px",
        "1200": "1200px",
        "1300": "1300px",
        "1400": "1400px",
        "1500": "1500px",
      },
    },
  },
  plugins: [],
} satisfies Config;
