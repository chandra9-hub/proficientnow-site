import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CareersBrowser from "@/components/CareersBrowser";
import { careers } from "@content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Browse live vacancies at ProficientNow and apply online with your CV.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow={careers.header.eyebrow} headline={careers.header.headline} subhead={careers.header.subhead} />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x">
          <CareersBrowser />
        </div>
      </section>
    </>
  );
}
