import Link from "next/link";
import { legalMeta } from "@content/legal";

type Section = { heading: string; paras: string[]; bullets?: string[] };
type Doc = { title: string; intro: string; sections: Section[] };

export default function LegalPage({ doc }: { doc: Doc }) {
  return (
    <section className="page-header">
      <div className="container-x">
        <div className="article-wrap">
          <p className="eyebrow">Legal</p>
          <h1>{doc.title}</h1>
          <div className="meta">
            Effective from {legalMeta.effectiveDate} · Valid until {legalMeta.validUntil}
          </div>
          <div className="body" style={{ marginTop: 26 }}>
            <p style={{ fontSize: 18 }}>{doc.intro}</p>
            {doc.sections.map((s) => (
              <div key={s.heading} style={{ marginTop: 30 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>{s.heading}</h3>
                {s.paras.map((p, i) => (<p key={i} style={{ marginTop: 10 }}>{p}</p>))}
                {s.bullets && (
                  <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 10 }}>
                    {s.bullets.map((b, i) => (<li key={i} style={{ marginTop: 6 }}>{b}</li>))}
                  </ul>
                )}
              </div>
            ))}
            <p style={{ marginTop: 34, fontSize: 13, color: "var(--muted)" }}>
              This document is provided for general information and is reviewed at least annually.
              For questions, contact <a href={`mailto:${legalMeta.email}`} style={{ color: "var(--accent)" }}>{legalMeta.email}</a>.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link href="/privacy" className="cardlink" style={{ marginRight: 20 }}>Privacy Policy</Link>
              <Link href="/terms" className="cardlink" style={{ marginRight: 20 }}>Terms &amp; Conditions</Link>
              <Link href="/cookies" className="cardlink" style={{ marginRight: 20 }}>Cookie Policy</Link>
              <Link href="/gdpr" className="cardlink">GDPR &amp; Data Protection</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
