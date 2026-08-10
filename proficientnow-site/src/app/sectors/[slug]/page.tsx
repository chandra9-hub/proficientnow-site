import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Emphasize from "@/components/Emphasize";
import SectorIcon from "@/components/SectorIcon";
import SectorVisual from "@/components/SectorVisual";
import CTASection from "@/components/CTASection";
import { sectors } from "@content/sectors";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = sectors.find((x) => x.slug === params.slug);
  if (!s) return { title: "Sector" };
  return { title: `${s.name} recruitment`, description: s.intro };
}

export default function SectorDetail({ params }: { params: { slug: string } }) {
  const s = sectors.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  return (
    <>
      <section className="page-header">
        <div className="secmark">{s.name}</div>
        <div className="container-x">
          <Link href="/sectors" className="backlink">← All sectors</Link>
          <div className="sector-hero">
            <div className="ico" style={{ width: 60, height: 60, borderRadius: 16 }}><SectorIcon name={s.icon} /></div>
            <div>
              <p className="eyebrow">Sector focus</p>
              <h1>{s.name}</h1>
            </div>
          </div>
          <p style={{ fontSize: 20, color: "var(--body)", marginTop: 22, maxWidth: "62ch" }}>{s.intro}</p>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x" style={{ display: "flex", flexDirection: "column", gap: 90 }}>
          {s.sections.map((sec, i) => (
            <div key={sec.title} className={`contentband reveal ${i % 2 === 1 ? "flip" : ""}`}>
              <div className="prose">
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h2 style={{ fontSize: 34 }}>{sec.title}</h2>
                <p>{sec.body}</p>
              </div>
              <div className="art"><SectorVisual variant={i} /></div>
            </div>
          ))}

          {/* certifications */}
          <div className="reveal">
            <p className="eyebrow">Worth having</p>
            <h2 style={{ fontSize: 34, marginTop: 8 }}>Certifications &amp; qualifications</h2>
            <div className="cert-grid">
              {s.certifications.map((c, i) => (
                <div key={c} className="cert"><span className="n">{`0${i + 1}`}</span><span>{c}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading={`Hiring in ${s.name}? *We already know the market.*`}
        body="Tell us the role and we'll show you specialist talent that generalist agencies never reach — usually within a week."
        ctaLabel="Start a search" ctaHref="/contact" mark={s.name}
      />
    </>
  );
}
