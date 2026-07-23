import Emphasize from "./Emphasize";

// Standard section header: small eyebrow label, big heading, optional intro.
export default function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${alignment} max-w-2xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-display text-3xl leading-tight md:text-4xl">
        <Emphasize text={heading} />
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-slate">{body}</p>}
    </div>
  );
}
