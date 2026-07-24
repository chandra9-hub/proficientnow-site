import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionReveal from "@/components/SectionReveal";
import CTASection from "@/components/CTASection";
import { about } from "@content/about";

export const metadata: Metadata = {
  title: "About us",
  description: "ProficientNow is a specialist recruitment firm built around sector depth, aligned incentives and quality over volume.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={about.hero.eyebrow} headline={about.hero.headline} subhead={about.hero.subhead} />

      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x">
          <div className="grid-2">
            {[about.mission, about.vision].map((b) => (
              <SectionReveal key={b.title}>
                <div className="panel">
                  <h2 style={{ fontSize: 26 }}>{b.title}</h2>
                  <p className="muted" style={{ fontSize: 18, marginTop: 16 }}>{b.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="secmark">Values</div>
          <SectionReveal><h2 style={{ fontSize: 36, maxWidth: 640 }}>Three principles that shape every search.</h2></SectionReveal>
          <div className="grid-4" style={{ marginTop: 48, gridTemplateColumns: "repeat(3,1fr)" }}>
            {about.values.map((v) => (
              <SectionReveal key={v.title} className="tilt">
                <div className="panel" style={{ height: "100%" }}>
                  <div style={{ height: 4, width: 40, borderRadius: 999, background: "linear-gradient(90deg,var(--accent),var(--accent2))", marginBottom: 16 }} />
                  <h3 style={{ fontSize: 18 }}>{v.title}</h3>
                  <p className="muted" style={{ marginTop: 12 }}>{v.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="secmark">Journey</div>
          <SectionReveal>
            <p className="eyebrow">{about.timeline.eyebrow}</p>
            <h2 style={{ fontSize: 36, maxWidth: 640, marginTop: 12 }}>{about.timeline.heading}</h2>
          </SectionReveal>
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            {about.timeline.milestones.map((m) => (
              <SectionReveal key={m.year}>
                <div className="panel" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", padding: 26 }}>
                  <div className="accent" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, minWidth: 90 }}>{m.year}</div>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <h3 style={{ fontSize: 18 }}>{m.title}</h3>
                    <p className="muted" style={{ marginTop: 4 }}>{m.body}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <SectionReveal>
            <p className="eyebrow">{about.team.eyebrow}</p>
            <h2 style={{ fontSize: 36, maxWidth: 640, marginTop: 12 }}>{about.team.heading}</h2>
            <p className="muted" style={{ fontSize: 18, marginTop: 16, maxWidth: 640 }}>{about.team.body}</p>
          </SectionReveal>
          <div className="grid-4" style={{ marginTop: 48, gridTemplateColumns: "repeat(3,1fr)" }}>
            {about.team.highlights.map((h) => (
              <SectionReveal key={h.label} className="tilt">
                <div className="panel" style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--heading)" }}>{h.stat}</div>
                  <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>{h.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Want to work with us? *Let's talk.*" body="Whether you're hiring for one critical role or building an entire team, we'll put the right candidates in front of you fast." ctaLabel="Start a search" ctaHref="/contact" mark="Talk" />
    </>
  );
}
