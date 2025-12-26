import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // THREE COLOR SYSTEM
        // 1. Background - Rich dark blue-gray (not pure black)
        bg: {
          DEFAULT: "#0f1419",
          light: "#1a2332",
          lighter: "#243044",
        },
        // 2. Text - Off-white / light gray
        text: {
          DEFAULT: "#e8eaed",
          muted: "#9aa0a6",
          dim: "#5f6368",
        },
        // 3. Accent - Sophisticated amber/gold
        accent: {
          DEFAULT: "#d4a853",
          light: "#e8c47c",
          dark: "#b8923d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 168, 83, 0.2)" },
          "100%": { boxShadow: "0 0 25px rgba(212, 168, 83, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
