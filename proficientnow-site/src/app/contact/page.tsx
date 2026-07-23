import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ProficientNow. Whether you're hiring or exploring a career move, we respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        headline="Let's talk about *your next hire.*"
        subhead="Whether you're hiring or exploring a career move, we respond within one business day."
      />

      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <SectionReveal>
            <div className="rounded-2xl border border-line bg-white p-8">
              <h2 className="font-display text-2xl font-bold text-navy">Send us a message</h2>
              <p className="mt-2 mb-6 text-sm text-slate">All fields marked * are required.</p>
              <ContactForm />
            </div>
          </SectionReveal>

          {/* Details */}
          <SectionReveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-navy">Head office</h3>
                <p className="mt-3 text-slate">
                  {site.contact.address.line1}<br />
                  {site.contact.address.line2}<br />
                  {site.contact.address.city}, {site.contact.address.postcode}<br />
                  {site.contact.address.country}
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-navy">Get in touch</h3>
                <ul className="mt-3 space-y-1 text-slate">
                  <li>
                    <a href={site.contact.phoneHref} className="hover:text-accent">{site.contact.phone}</a>
                  </li>
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="hover:text-accent">{site.contact.email}</a>
                  </li>
                  <li className="pt-1 text-sm">{site.contact.hours}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-navy">Also operating in</h3>
                <ul className="mt-3 space-y-2 text-slate">
                  {site.offices.map((o) => (
                    <li key={o.city} className="text-sm">
                      <span className="font-medium text-navy">{o.city}</span>, {o.country} — {o.phone}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
