import SectorIcon from "./SectorIcon";

export default function SectorCard({ name, blurb, icon }: { name: string; blurb: string; icon: string }) {
  return (
    <div className="card reveal tilt">
      <div className="ico"><SectorIcon name={icon} /></div>
      <h3>{name}</h3>
      <p>{blurb}</p>
    </div>
  );
}
