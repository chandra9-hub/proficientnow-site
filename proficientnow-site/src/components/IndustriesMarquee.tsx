import { industryRows, industriesIntro } from "@content/industries";

function Row({ items, dir, slow }: { items: string[]; dir: "l" | "r"; slow?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`mrow ${dir} ${slow ? "slow" : ""}`}>
      {doubled.map((name, i) => (
        <div className="pill" key={i}><span className="d" />{name}</div>
      ))}
    </div>
  );
}

export default function IndustriesMarquee() {
  return (
    <div className="industries band">
      <div className="secmark">Industries</div>
      <div className="container-x ind-head reveal parallax">
        <p className="eyebrow">{industriesIntro.eyebrow}</p>
        <h2>{industriesIntro.heading}</h2>
        <p>{industriesIntro.body}</p>
      </div>
      <div className="marquees">
        {industryRows.map((items, i) => (
          <Row key={i} items={items} dir={i % 2 === 0 ? "l" : "r"} slow={i >= 2} />
        ))}
      </div>
    </div>
  );
}
