import Emphasize from "./Emphasize";

export default function PageHeader({
  eyebrow, headline, subhead,
}: { eyebrow: string; headline: string; subhead?: string }) {
  return (
    <section className="page-header">
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h1><Emphasize text={headline} /></h1>
        {subhead && <p>{subhead}</p>}
      </div>
    </section>
  );
}
