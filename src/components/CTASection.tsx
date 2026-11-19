import Link from "next/link";
import Emphasize from "./Emphasize";

export default function CTASection({
  heading, body, ctaLabel, ctaHref, mark = "Hire",
}: { heading: string; body: string; ctaLabel: string; ctaHref: string; mark?: string }) {
  return (
    <div className="cta">
      <div className="secmark">{mark}</div>
      <div className="container-x">
        <div className="cta-panel reveal">
          <h2><Emphasize text={heading} /></h2>
          <p>{body}</p>
          <Link href={ctaHref} className="btn-primary">{ctaLabel} <span aria-hidden>→</span></Link>
        </div>
      </div>
    </div>
  );
}
