import type { Config } from "tailwindcss";
import { theme } from "./content/theme";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: theme.colors.navy,
        ink: theme.colors.ink,
        slate: theme.colors.slate,
        accent: theme.colors.accent,
        "accent-dark": theme.colors.accentDark,
        line: theme.colors.line,
        mist: theme.colors.mist,
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
