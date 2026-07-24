import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectorCard from "@/components/SectorCard";
import CTASection from "@/components/CTASection";
import { sectors, sectorsIntro } from "@content/sectors";

export const metadata: Metadata = {
  title: "Sectors we recruit for",
  description: "Specialist recruitment across engineering, construction, manufacturing, healthcare, finance, legal, supply chain and more.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHeader eyebrow={sectorsIntro.eyebrow} headline={sectorsIntro.headline} subhead={sectorsIntro.subhead} />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x">
          <div className="grid-4" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {sectors.map((s) => (
              <SectorCard key={s.name} name={s.name} blurb={s.blurb} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>
      <CTASection heading="Hiring in your sector? *We already know the market.*" body="Tell us the role and we'll show you the talent that generalist agencies never reach." ctaLabel="Start a search" ctaHref="/contact" mark="Sectors" />
    </>
  );
}
