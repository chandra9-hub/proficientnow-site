import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import CTASection from "@/components/CTASection";
import { about } from "@content/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "ProficientNow is a specialist recruitment firm built around sector depth, aligned incentives and quality over volume.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.hero.eyebrow}
        headline={about.hero.headline}
        subhead={about.hero.subhead}
      />

      {/* Mission & vision */}
      <section className="py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[about.mission, about.vision].map((block, i) => (
            <SectionReveal key={block.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-white p-9">
                <h2 className="font-display text-2xl font-bold text-navy">{block.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate">{block.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionReveal>
            <h2 className="h-display max-w-2xl text-3xl md:text-4xl">
              Three principles that shape every search.
            </h2>
          </SectionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {about.values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-8 ring-1 ring-line">
                  <div className="mb-4 h-1 w-10 rounded-full bg-accent" />
                  <h3 className="font-display text-lg font-bold text-navy">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate">{v.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-x">
          <SectionReveal>
            <p className="eyebrow mb-3">{about.timeline.eyebrow}</p>
            <h2 className="h-display max-w-2xl text-3xl md:text-4xl">{about.timeline.heading}</h2>
          </SectionReveal>

          <div className="mt-12 space-y-4">
            {about.timeline.milestones.map((m, i) => (
              <SectionReveal key={m.year} delay={i * 0.05}>
                <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:gap-8">
                  <div className="font-display text-3xl font-extrabold text-accent md:w-28">{m.year}</div>
                  <div className="md:flex-1">
                    <h3 className="font-display text-lg font-bold text-navy">{m.title}</h3>
                    <p className="mt-1 text-slate">{m.body}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionReveal>
            <p className="eyebrow mb-3">{about.team.eyebrow}</p>
            <h2 className="h-display max-w-2xl text-3xl md:text-4xl">{about.team.heading}</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate">{about.team.body}</p>
          </SectionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {about.team.highlights.map((h, i) => (
              <SectionReveal key={h.label} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-line">
                  <div className="font-display text-3xl font-extrabold text-navy">{h.stat}</div>
                  <p className="mt-2 text-sm text-slate">{h.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Want to work with us? *Let's talk.*"
        body="Whether you're hiring for one critical role or building an entire team, we'll put the right candidates in front of you fast."
        ctaLabel="Start a search"
        ctaHref="/contact"
      />
    </>
  );
}
