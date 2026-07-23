import Link from "next/link";

export default function ServiceCard({
  title,
  summary,
  benefits,
  process,
}: {
  title: string;
  summary: string;
  benefits: string[];
  process: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(11,31,58,0.25)]">
      <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
      <p className="mt-3 text-slate">{summary}</p>

      <ul className="mt-5 space-y-2">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-0.5 text-accent" aria-hidden>✓</span>
            {b}
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-slate">
        <span className="font-semibold text-navy">How it works: </span>
        {process}
      </p>

      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
      >
        Enquire about this service <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
