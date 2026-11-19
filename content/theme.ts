// =============================================================================
// THEME — the brand's colours and fonts, all in one place.
// Change a value here and it updates EVERYWHERE on the site.
// (Colours are also wired into tailwind.config.ts so you can use them as
//  classes like `bg-navy` or `text-accent`.)
// =============================================================================

export const theme = {
  colors: {
    navy: "#0B1F3A",      // deep navy — headings, dark sections, footer
    ink: "#111827",       // near-black — body text
    slate: "#5B6B85",     // muted grey — secondary text
    accent: "#1E5EFF",    // accent blue — buttons, links, highlights
    accentDark: "#1544C9",// darker accent — hover states
    line: "#E4E8F0",      // hairline dividers / borders
    mist: "#F4F6FA",      // light grey — alternating section backgrounds
    white: "#FFFFFF",
  },
  fonts: {
    // Display face (headings) and body face are loaded in src/app/layout.tsx
    display: "var(--font-display)", // Plus Jakarta Sans
    body: "var(--font-body)",       // Inter
  },
} as const;
