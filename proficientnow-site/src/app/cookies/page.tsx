import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Cookie Policy" };

// Paste your final Cookie Policy wording in place of the placeholder text below.
export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" headline="Cookie Policy" />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x" style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          <p className="muted">This page is a placeholder. Your final Cookie Policy content will go here.</p>
          <p className="muted">Last updated: (to be added)</p>
        </div>
      </section>
    </>
  );
}
