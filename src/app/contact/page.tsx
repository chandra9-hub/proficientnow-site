import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/contact", "Contact Our UK Recruitment Team", "Contact ProficientNow in London on +44 20 4529 1462 or info@proficientnow.co.uk. Hiring or exploring a move? We respond within one business day.");

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" headline="Let's talk about *your next hire.*" subhead="Whether you're hiring or exploring a career move, we respond within one business day." />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x contact-grid">
          <SectionReveal>
            <div className="panel">
              <h2 style={{ fontSize: 24 }}>Send us a message</h2>
              <p className="muted" style={{ fontSize: 14, margin: "8px 0 24px" }}>All fields marked * are required.</p>
              <ContactForm />
            </div>
          </SectionReveal>
          <SectionReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 18 }}>Our UK office</h3>
                <p className="muted" style={{ marginTop: 12 }}>
                  {site.contact.address.line1}<br />
                  {site.contact.address.city}, {site.contact.address.postcode}<br />{site.contact.address.country}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 18 }}>Get in touch</h3>
                <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  <li><a className="muted" href={site.contact.phoneHref}>{site.contact.phone}</a></li>
                  <li><a className="muted" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
                  <li className="muted" style={{ fontSize: 14, paddingTop: 4 }}>{site.contact.hours}</li>
                </ul>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
