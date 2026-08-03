"use client";
export default function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    try { localStorage.setItem("pn-theme", next ? "dark" : "light"); } catch {}
  }
  return (
    <button className="themeToggle" onClick={toggle} aria-label="Toggle light or dark mode">
      <span className="ti sun">☀</span><span className="ti moon">☾</span>
    </button>
  );
}
