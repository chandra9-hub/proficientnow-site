import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import SectorCard from "@/components/SectorCard";
import IndustriesMarquee from "@/components/IndustriesMarquee";
import CTASection from "@/components/CTASection";
import DataChart from "@/components/DataChart";
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

      {/* WHY US — paragraph + UK data chart */}
      <section className="pad">
        <div className="secmark">Why us</div>
        <div className="container-x">
          <div className="contentband reveal">
            <div className="prose">
              <p className="eyebrow">{home.intro.eyebrow}</p>
              <h2><Emphasize text={home.intro.heading} /></h2>
              {home.intro.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
              <div className="mini">
                {home.intro.points.map((pt) => (
                  <div key={pt.title}><b>{pt.title}</b><span>{pt.note}</span></div>
                ))}
              </div>
            </div>
            <div className="art"><DataChart /></div>
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
      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="secmark">Process</div>
        <div className="container-x">
          <div className="reveal parallax">
            <SectionHeading eyebrow={home.process.eyebrow} heading={home.process.heading} body={home.process.body} />
          </div>
          <div className="proc-grid" style={{ marginTop: 48 }}>
            {home.process.steps.map((st) => (
              <div className="step reveal" key={st.title}>
                <div className="dot" />
                <div className="day">{st.day}</div>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={home.finalCta.heading} body={home.finalCta.body} ctaLabel={home.finalCta.cta.label} ctaHref={home.finalCta.cta.href} />
    </>
  );
}
