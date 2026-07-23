import Emphasize from "./Emphasize";

// Compact navy header used at the top of inner pages (About, Services, etc.)
export default function PageHeader({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow: string;
  headline: string;
  subhead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-36 pb-20 md:pt-44 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-x relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
          <Emphasize text={headline} />
        </h1>
        {subhead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{subhead}</p>}
      </div>
    </section>
  );
}
