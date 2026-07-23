import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services, servicesIntro } from "@content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Permanent recruitment, contract staffing, executive search, RPO and international recruitment — all on a contingency basis.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesIntro.eyebrow}
        headline={servicesIntro.headline}
        subhead={servicesIntro.subhead}
      />

      <section className="py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <SectionReveal key={s.slug} delay={(i % 2) * 0.08}>
                <ServiceCard
                  title={s.title}
                  summary={s.summary}
                  benefits={s.benefits}
                  process={s.process}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Not sure which service *fits your need?*"
        body="Tell us the role and the timeline. We'll recommend the right approach — no obligation."
        ctaLabel="Talk to a specialist"
        ctaHref="/contact"
      />
    </>
  );
}
