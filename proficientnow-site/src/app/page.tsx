import Link from "next/link";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import SectorCard from "@/components/SectorCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { home } from "@content/home";
import { site } from "@content/site";
import { sectors } from "@content/sectors";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats band */}
      <section className="border-b border-line bg-white py-16">
        <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
          {site.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* Intro / differentiators */}
      <section className="py-24">
        <div className="container-x">
          <SectionReveal>
            <SectionHeading
              eyebrow={home.intro.eyebrow}
              heading={home.intro.heading}
              body={home.intro.body}
            />
          </SectionReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {home.differentiators.map((d, i) => (
              <SectionReveal key={d.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-mist p-7">
                  <div className="mb-4 h-1 w-10 rounded-full bg-accent" />
                  <h3 className="font-display text-lg font-bold text-navy">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{d.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors preview */}
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our sectors"
                heading="Specialists, not *generalists.*"
                body="Every recruiter on your search has placed in your sector before."
              />
              <Link href="/sectors" className="link-underline text-sm font-semibold text-accent">
                View all sectors →
              </Link>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.slice(0, 8).map((s, i) => (
              <SectionReveal key={s.name} delay={i * 0.05}>
                <SectorCard name={s.name} blurb={s.blurb} icon={s.icon} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container-x">
          <SectionReveal>
            <SectionHeading
              eyebrow={home.process.eyebrow}
              heading={home.process.heading}
              body={home.process.body}
            />
          </SectionReveal>
          <ProcessTimeline steps={home.process.steps} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionReveal>
            <SectionHeading
              eyebrow={home.testimonials.eyebrow}
              heading={home.testimonials.heading}
              align="center"
            />
          </SectionReveal>
          <Testimonials items={home.testimonials.items} />
        </div>
      </section>

      <CTASection
        heading={home.finalCta.heading}
        body={home.finalCta.body}
        ctaLabel={home.finalCta.cta.label}
        ctaHref={home.finalCta.cta.href}
      />
    </>
  );
}
