import Link from "next/link";
import Emphasize from "./Emphasize";
import { home } from "@content/home";

export default function Hero() {
  const { hero } = home;
  return (
    <section className="hero">
      <div className="container-x">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1><Emphasize text={hero.headline} /></h1>
        <p className="sub">{hero.subhead}</p>
        <p className="note">{hero.note}</p>
        <div className="ctas">
          <Link href={hero.primaryCta.href} className="btn-primary">{hero.primaryCta.label} <span aria-hidden>→</span></Link>
          <Link href={hero.secondaryCta.href} className="btn-ghost">{hero.secondaryCta.label}</Link>
        </div>
      </div>
    </section>
  );
}
