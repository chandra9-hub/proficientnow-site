import type { Config } from "tailwindcss";

// Colours map to the CSS variables defined in globals.css, so Tailwind utility
// classes (text-heading, bg-card, border-line, etc.) follow the light/dark theme.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        heading: "var(--heading)",
        txt: "var(--txt)",
        muted: "var(--muted)",
        card: "var(--card)",
        cardbd: "var(--cardbd)",
        line: "var(--line)",
        panel: "var(--panel)",
        navy: "var(--navy)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "var(--maxw)" },
    },
  },
  plugins: [],
};
export default config;
