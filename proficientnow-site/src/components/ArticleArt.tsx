// Wide, on-brand section banners for article sections (no photos, no AI).
export default function ArticleArt({ variant = 0 }: { variant?: number }) {
  const v = ((variant % 4) + 4) % 4;
  const S = { stroke: "var(--accent)", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div className="article-band">
      <svg viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {v === 0 && (<g>{[...Array(9)].map((_,i)=>{const x=70+i*80;const y=150-i*11;return <rect key={i} x={x} y={y} width="34" height={200-y} rx="5" fill="var(--accent)" fillOpacity={0.12+i*0.06}/>;})}<path d="M84 150 L164 132 L244 118 L324 104 L404 96 L484 82 L564 70 L644 58 L724 44" {...S}/></g>)}
        {v === 1 && (<g>{[[120,60],[260,120],[400,50],[540,130],[660,70],[730,140],[200,150],[480,150]].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="6" fill="var(--accent)"/>))}<path d="M120 60 L260 120 L400 50 L540 130 L660 70 M200 150 L260 120 M480 150 L540 130 M660 70 L730 140" {...S} strokeOpacity=".5"/></g>)}
        {v === 2 && (<g>{[0,1,2,3].map(i=>(<path key={i} d={`M60 ${170-i*10} Q400 ${20+i*30} 740 ${170-i*10}`} {...S} strokeOpacity={0.5-i*0.1}/>))}<circle cx="400" cy="60" r="7" fill="var(--navy)"/></g>)}
        {v === 3 && (<g><path d="M60 160 L200 120 L320 140 L460 80 L600 100 L740 50" {...S}/><path d="M60 160 L200 120 L320 140 L460 80 L600 100 L740 50 L740 200 L60 200 Z" fill="var(--accent)" fillOpacity=".08" stroke="none"/>{[[60,160],[200,120],[320,140],[460,80],[600,100],[740,50]].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="6" fill="var(--navy)"/>))}</g>)}
      </svg>
    </div>
  );
}
