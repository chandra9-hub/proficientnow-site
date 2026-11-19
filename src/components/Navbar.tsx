"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@content/nav";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const s = () => setSolid(scrollY > 60); s(); addEventListener("scroll", s, { passive: true }); return () => removeEventListener("scroll", s); }, []);
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) return null;
  return (
    <header className={`nav ${solid ? "solid" : ""}`}>
      <div className="container-x">
        <Link href="/" className="logo">
          <img className="lg-light" src="/brand/logo-light.png" alt="ProficientNow" />
          <img className="lg-dark" src="/brand/logo-dark.png" alt="ProficientNow" />
        </Link>
        <div className="navlinks">
          {navLinks.map((l) => (<Link key={l.href} href={l.href} className="plain">{l.label}</Link>))}
          <ThemeToggle />
          <Link href="/contact" className="navbtn">Start a search</Link>
        </div>
        <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="mobile-only" style={{ background: "none", border: 0, cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ width: 22, height: 2, background: "var(--ink)", display: "block" }} />
            <span style={{ width: 22, height: 2, background: "var(--ink)", display: "block" }} />
            <span style={{ width: 22, height: 2, background: "var(--ink)", display: "block" }} />
          </div>
        </button>
      </div>
      {open && (
        <div className="mobile-only" style={{ background: "var(--navglass)", backdropFilter: "blur(14px)", borderTop: "1px solid var(--line)" }}>
          <div className="container-x" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "12px 22px 20px" }}>
            {navLinks.map((l) => (<Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: "10px 0", color: "var(--body)", fontWeight: 500 }}>{l.label}</Link>))}
          </div>
        </div>
      )}
    </header>
  );
}
