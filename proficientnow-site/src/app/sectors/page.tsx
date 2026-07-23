import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import SectorCard from "@/components/SectorCard";
import CTASection from "@/components/CTASection";
import { sectors, sectorsIntro } from "@content/sectors";

export const metadata: Metadata = {
  title: "Sectors we recruit for",
  description:
    "Specialist recruitment across engineering, construction, manufacturing, healthcare, finance, legal, supply chain and more.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHeader
        eyebrow={sectorsIntro.eyebrow}
        headline={sectorsIntro.headline}
        subhead={sectorsIntro.subhead}
      />

      <section className="py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <SectionReveal key={s.name} delay={(i % 3) * 0.06}>
                <SectorCard name={s.name} blurb={s.blurb} icon={s.icon} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Hiring in your sector? *We already know the market.*"
        body="Tell us the role and we'll show you the talent that generalist agencies never reach."
        ctaLabel="Start a search"
        ctaHref="/contact"
      />
    </>
  );
}
