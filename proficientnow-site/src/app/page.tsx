import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import SectorCard from "@/components/SectorCard";
import IndustriesMarquee from "@/components/IndustriesMarquee";
import CTASection from "@/components/CTASection";
import Emphasize from "@/components/Emphasize";
import { home } from "@content/home";
import { site } from "@content/site";
import { sectors } from "@content/sectors";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* STATS */}
      <div className="stats">
        <div className="container-x">
          <div className="stats-grid">
            {site.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num" data-to={s.value} data-suffix={s.suffix}>0</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIFFERENTIATORS */}
      <section className="pad">
        <div className="secmark">ProficientNow.</div>
        <div className="container-x">
          <div className="reveal parallax">
            <SectionHeading eyebrow={home.intro.eyebrow} heading={home.intro.heading} body={home.intro.body} />
          </div>
          <div className="grid-4" style={{ marginTop: 56 }}>
            {home.differentiators.map((d) => (
              <div className="diff reveal tilt" key={d.title}>
                <div className="bar" />
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES MARQUEE */}
      <IndustriesMarquee />

      {/* SECTORS */}
      <section className="pad">
        <div className="secmark">Sectors</div>
        <div className="container-x">
          <div className="flexhead reveal parallax">
            <SectionHeading eyebrow="Our sectors" heading="Specialists, not *generalists.*" body="Every recruiter on your search has placed in your sector before — no on-the-job learning at your expense." />
            <a className="viewall" href="/sectors">View all sectors →</a>
          </div>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {sectors.slice(0, 8).map((s) => (
              <SectorCard key={s.name} name={s.name} blurb={s.blurb} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="pad">
        <div className="secmark">Process</div>
        <div className="container-x">
          <div className="reveal parallax">
            <SectionHeading eyebrow={home.process.eyebrow} heading={home.process.heading} body={home.process.body} />
          </div>
          <div className="proc-grid" style={{ marginTop: 48 }}>
            {home.process.steps.map((st, i) => (
              <div className="step reveal tilt" key={st.title}>
                <div className="n">{String(i + 1).padStart(2, "0")}</div>
                <div className="day">{st.day}</div>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="pad">
        <div className="secmark">Clients</div>
        <div className="container-x">
          <div className="reveal parallax">
            <SectionHeading eyebrow={home.testimonials.eyebrow} heading={home.testimonials.heading} center />
          </div>
          <div className="grid-3" style={{ marginTop: 48 }}>
            {home.testimonials.items.map((t, i) => (
              <div className="test reveal tilt" key={i}>
                <div className="q">&ldquo;</div>
                <blockquote>{t.quote}</blockquote>
                <div className="who"><div className="a">{t.author}</div><div className="d">{t.detail}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={home.finalCta.heading} body={home.finalCta.body} ctaLabel={home.finalCta.cta.label} ctaHref={home.finalCta.cta.href} />
    </>
  );
}
