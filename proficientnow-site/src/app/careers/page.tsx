import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "Careers", description: "Browse open roles and submit your CV to ProficientNow." };

// PHASE 2 will replace this with the full careers portal (jobs + CV upload).
export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" headline="Your next role is *on its way.*" subhead="Our live jobs board is launching shortly. In the meantime, send us your CV and we'll be in touch when a suitable role comes up." />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x" style={{ maxWidth: 720 }}>
          <p className="muted" style={{ fontSize: 18 }}>
            We&apos;re building a fully searchable careers portal where you&apos;ll browse and filter live vacancies,
            view full job details, and apply online with your CV in any format. Check back soon — or get in touch now.
          </p>
          <div style={{ marginTop: 32 }}><Button href="/contact">Send us your CV</Button></div>
        </div>
      </section>
    </>
  );
}
