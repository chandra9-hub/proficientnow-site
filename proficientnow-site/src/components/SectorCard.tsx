import SectorIcon from "./SectorIcon";

export default function SectorCard({
  name,
  blurb,
  icon,
}: {
  name: string;
  blurb: string;
  icon: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-16px_rgba(11,31,58,0.25)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <SectorIcon name={icon} />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{blurb}</p>
    </div>
  );
}
