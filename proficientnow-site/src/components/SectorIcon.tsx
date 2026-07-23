// Minimal line icons for sector cards, picked by the `icon` keyword in
// content/sectors.ts. Add more cases as you add sectors.
export default function SectorIcon({ name }: { name: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, JSX.Element> = {
    engineering: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
    construction: <><path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-6h6v6" /></>,
    manufacturing: <><path d="M3 21h18M4 21V10l5 3V10l5 3V6l5 3v12" /></>,
    medical: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v8M8 12h8" /></>,
    health: <><path d="M12 21s-7-4.5-9-9a4.5 4.5 0 019-1 4.5 4.5 0 019 1c-2 4.5-9 9-9 9z" /></>,
    automotive: <><path d="M3 13l2-5h14l2 5v5h-3M3 18v-5h18M7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></>,
    energy: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></>,
    finance: <><path d="M3 21h18M6 21V10M10 21V6M14 21v-8M18 21V4" /></>,
    legal: <><path d="M12 3v18M5 7h14M7 7l-3 6a3 3 0 006 0L7 7zM17 7l-3 6a3 3 0 006 0l-3-6z" /></>,
    sales: <><path d="M3 17l6-6 4 4 8-8M15 3h6v6" /></>,
    operations: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
    supplychain: <><rect x="3" y="8" width="7" height="8" rx="1" /><path d="M14 12h3l3 3v1h-6M14 8h6M17 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></>,
    electrical: <><path d="M11 2L5 14h5l-1 8 8-12h-5l0-8z" /></>,
    civil: <><path d="M4 21h16M6 21v-8l6-4 6 4v8M3 13l9-6 9 6" /></>,
    facilities: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M10 21v-4h4v4" /></>,
    commercial: <><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>,
  };

  return <svg {...common} aria-hidden>{paths[name] ?? paths.commercial}</svg>;
}
