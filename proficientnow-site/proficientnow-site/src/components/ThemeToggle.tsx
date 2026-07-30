"use client";

// Light/dark toggle. Adds/removes `.light` on <html> and remembers the choice.
export default function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = !el.classList.contains("light");
    el.classList.toggle("light", next);
    try {
      localStorage.setItem("pn-theme", next ? "light" : "dark");
    } catch {}
  }
  return (
    <button className="themeToggle" onClick={toggle} aria-label="Toggle light or dark mode">
      <span className="ti moon">☾</span>
      <span className="ti sun">☀</span>
    </button>
  );
}
