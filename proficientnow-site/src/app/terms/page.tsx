import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Terms & Conditions" };

// You'll send the final Terms & Conditions wording later — paste it in place of the
// placeholder text below (this is the only part you need to change).
export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" headline="Terms & Conditions" />
      <section className="py-24">
        <div className="container-x max-w-3xl space-y-4 text-slate">
          <p>This page is a placeholder. Your final Terms & Conditions content will go here.</p>
          <p>Last updated: (to be added)</p>
        </div>
      </section>
    </>
  );
}
