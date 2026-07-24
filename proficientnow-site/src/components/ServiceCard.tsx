import Link from "next/link";

export default function ServiceCard({
  title, summary, benefits, process,
}: { title: string; summary: string; benefits: string[]; process: string }) {
  return (
    <div className="card reveal tilt" style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: 20 }}>{title}</h3>
      <p style={{ marginTop: 12 }}>{summary}</p>
      <ul style={{ listStyle: "none", margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
        {benefits.map((b) => (
          <li key={b} style={{ display: "flex", gap: 8, fontSize: 14 }}>
            <span className="accent" aria-hidden>✓</span>{b}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--cardbd)", fontSize: 14, color: "var(--muted)" }}>
        <span style={{ color: "var(--heading)", fontWeight: 600 }}>How it works: </span>{process}
      </p>
      <Link href="/contact" className="accent" style={{ marginTop: 20, fontWeight: 600, fontSize: 14 }}>
        Enquire about this service →
      </Link>
    </div>
  );
}
