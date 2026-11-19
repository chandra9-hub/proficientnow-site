import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SectorIcon from "@/components/SectorIcon";
import CTASection from "@/components/CTASection";
import { sectors } from "@content/sectors";
import { sectorPhoto } from "@/lib/photos";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, fitDescription, pageMeta, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return sectors.map((s) => ({ slug: s.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = sectors.find((x) => x.slug === params.slug);
  if (!s) return {};
  const label = s.seoName || s.name;
  return pageMeta(
    `/sectors/${s.slug}`,
    `${label} Recruitment Agency UK`,
    fitDescription(`Specialist ${label.toLowerCase()} recruitment agency for UK employers.`, s.blurb, "100% contingency: no fee until you hire."),
  );
}

export default function SectorDetail({ params }: { params: { slug: string } }) {
  const s = sectors.find((x) => x.slug === params.slug);
  if (!s) return notFound();
  const hero = s.image || sectorPhoto(s.slug, 0);
  const label = s.seoName || s.name;
  const path = `/sectors/${s.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Sectors", path: "/sectors" }, { name: s.name, path }])} />
      <JsonLd data={serviceLd(`${label} recruitment`, path)} />
      <section className="page-header" style={{ paddingBottom: 0 }}>
        <div className="secmark">{s.name}</div>
        <div className="container-x">
          <Link href="/sectors" className="backlink">← All sectors</Link>
          <div className="sector-hero">
            <div className="ico" style={{ width: 60, height: 60, borderRadius: 16 }}><SectorIcon name={s.icon} /></div>
            <div><p className="eyebrow">Sector focus</p><h1>{label} recruitment</h1></div>
          </div>
          <Image className="article-hero" src={hero} alt={`${label} recruitment`} width={1400} height={700} sizes="(max-width: 1100px) 100vw, 1040px" priority style={{ marginTop: 28 }} />
          <p className="article-lead" style={{ marginTop: 26 }}>{s.intro}</p>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 30 }}>
        <div className="container-x article-page" style={{ paddingLeft: 0, paddingRight: 0 }}>
          {s.sections.map((sec, i) => (
            <div className={`art-row ${i % 2 === 1 ? "flip" : ""}`} key={sec.title}>
              <div className="art-text">
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h2>{sec.title}</h2>
                <p>{sec.body}</p>
              </div>
              <div className="art-photo"><Image src={sectorPhoto(s.slug, i + 1)} alt="" width={700} height={560} sizes="(max-width: 1000px) 100vw, 500px" /></div>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <p className="eyebrow">Worth having</p>
            <h2 style={{ fontSize: 32, marginTop: 8 }}>Certifications &amp; qualifications</h2>
            <div className="cert-grid">
              {s.certifications.map((c, i) => (<div key={c} className="cert"><span className="n">{`0${i + 1}`}</span><span>{c}</span></div>))}
            </div>
          </div>
        </div>
      </section>

      <CTASection heading={`Hiring in ${s.name}? *We already know the market.*`} body="Tell us the role and we'll show you specialist talent that generalist agencies never reach — usually within a week." ctaLabel="Start a search" ctaHref="/contact" mark={s.name} />
    </>
  );
}
