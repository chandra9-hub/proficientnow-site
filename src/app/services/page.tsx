import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services, servicesIntro } from "@content/services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/services", "Recruitment Services for UK Employers", "Permanent recruitment, contract staffing, executive search, RPO and international recruitment for UK employers, all on a contingency basis.");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
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
