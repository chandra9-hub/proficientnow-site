import SectionReveal from "./SectionReveal";

type Item = { quote: string; author: string; detail: string };

export default function Testimonials({ items }: { items: Item[] }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <SectionReveal key={t.author + i} delay={i * 0.1}>
          <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-8">
            <div className="font-display text-5xl leading-none text-accent/30" aria-hidden>
              &ldquo;
            </div>
            <blockquote className="-mt-3 flex-1 text-[15px] leading-relaxed text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <div className="font-semibold text-navy">{t.author}</div>
              <div className="text-sm text-slate">{t.detail}</div>
            </figcaption>
          </figure>
        </SectionReveal>
      ))}
    </div>
  );
}
