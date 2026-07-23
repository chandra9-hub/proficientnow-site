import SectionReveal from "./SectionReveal";

type Step = { day: string; title: string; body: string };

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-5">
      {steps.map((step, i) => (
        <SectionReveal key={step.title} delay={i * 0.08}>
          <div className="relative h-full rounded-2xl bg-white p-6 ring-1 ring-line">
            <span className="font-display text-4xl font-extrabold text-line">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent">
              {step.day}
            </p>
            <h3 className="mt-1 font-display text-base font-bold text-navy">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
