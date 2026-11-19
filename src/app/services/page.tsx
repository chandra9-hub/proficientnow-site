import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services, servicesIntro } from "@content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Permanent recruitment, contract staffing, executive search, RPO and international recruitment — all on a contingency basis.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow={servicesIntro.eyebrow} headline={servicesIntro.headline} subhead={servicesIntro.subhead} />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x">
          <div className="grid-2">
            {services.map((s) => (
              <ServiceCard key={s.slug} title={s.title} summary={s.summary} benefits={s.benefits} process={s.process} />
            ))}
          </div>
        </div>
      </section>
      <CTASection heading="Not sure which service *fits your need?*" body="Tell us the role and the timeline. We'll recommend the right approach — no obligation." ctaLabel="Talk to a specialist" ctaHref="/contact" mark="Services" />
    </>
  );
}
