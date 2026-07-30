import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Terms & Conditions" };

// Paste your final Terms & Conditions wording in place of the placeholder text below.
export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" headline="Terms & Conditions" />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x" style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          <p className="muted">This page is a placeholder. Your final Terms & Conditions content will go here.</p>
          <p className="muted">Last updated: (to be added)</p>
        </div>
      </section>
    </>
  );
}
