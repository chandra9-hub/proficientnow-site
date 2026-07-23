import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Browse open roles and submit your CV to ProficientNow.",
};

// PHASE 2 will replace this with the full careers portal:
// browse / search / filter jobs, job detail pages, apply online + CV upload.
export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        headline="Your next role is *on its way.*"
        subhead="Our live jobs board is launching shortly. In the meantime, send us your CV and we'll be in touch when a suitable role comes up."
      />
      <section className="py-24">
        <div className="container-x max-w-2xl">
          <p className="text-lg leading-relaxed text-slate">
            We're building a fully searchable careers portal where you'll be able to
            browse and filter live vacancies, view full job details, and apply online
            with your CV in any format. Check back soon — or get in touch now.
          </p>
          <div className="mt-8">
            <Button href="/contact">Send us your CV</Button>
          </div>
        </div>
      </section>
    </>
  );
}
