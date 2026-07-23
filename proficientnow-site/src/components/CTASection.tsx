import Link from "next/link";
import Emphasize from "./Emphasize";

export default function CTASection({
  heading,
  body,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-navy py-20">
      <div className="container-x text-center">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
          <Emphasize text={heading} />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">{body}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:-translate-y-0.5"
        >
          {ctaLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
