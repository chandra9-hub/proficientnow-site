import Link from "next/link";
import SectorIcon from "./SectorIcon";

export default function SectorCard({ name, blurb, icon, slug }: { name: string; blurb: string; icon: string; slug?: string }) {
  const inner = (
    <>
      <div className="ico"><SectorIcon name={icon} /></div>
      <h3>{name}</h3>
      <p>{blurb}</p>
      {slug && <span className="cardlink">Explore sector →</span>}
    </>
  );
  return slug
    ? <Link href={`/sectors/${slug}`} className="card reveal tilt sector-card">{inner}</Link>
    : <div className="card reveal tilt">{inner}</div>;
}
