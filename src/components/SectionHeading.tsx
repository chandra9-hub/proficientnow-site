import Emphasize from "./Emphasize";

export default function SectionHeading({
  eyebrow, heading, body, center = false,
}: { eyebrow?: string; heading: string; body?: string; center?: boolean }) {
  return (
    <div className={`sechead ${center ? "center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2><Emphasize text={heading} /></h2>
      {body && <p>{body}</p>}
    </div>
  );
}
