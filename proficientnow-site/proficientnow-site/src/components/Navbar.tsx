"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@content/nav";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${solid ? "solid" : ""}`}>
      <div className="container-x">
        <Link href="/" className="logo">
          Proficient<span className="now">Now.</span>
        </Link>

        <div className="navlinks">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="plain">{l.label}</Link>
          ))}
          <ThemeToggle />
          <Link href="/contact" className="navbtn">Start a search</Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="mobile-only"
          style={{ background: "none", border: 0, cursor: "pointer" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ width: 22, height: 2, background: "var(--heading)", display: "block" }} />
            <span style={{ width: 22, height: 2, background: "var(--heading)", display: "block" }} />
            <span style={{ width: 22, height: 2, background: "var(--heading)", display: "block" }} />
          </div>
        </button>
      </div>

      {open && (
        <div className="mobile-only" style={{ background: "var(--navglass)", backdropFilter: "blur(14px)", borderTop: "1px solid var(--line)" }}>
          <div className="container-x" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "12px 24px 20px" }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: "10px 0", color: "var(--txt)", fontWeight: 500 }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
