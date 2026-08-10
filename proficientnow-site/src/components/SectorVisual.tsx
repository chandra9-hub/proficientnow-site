// Abstract, on-brand visuals for the sector detail sections.
// Five variants (one per section) — no photography, no AI imagery.
export default function SectorVisual({ variant }: { variant: number }) {
  const v = ((variant % 5) + 5) % 5;
  return (
    <div className="sector-visual">
      <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {v === 0 && (
          <g>{/* growth — rising bars + trend line */}
            {[0,1,2,3,4].map((i) => (
              <rect key={i} x={50 + i * 62} y={230 - i * 34} width="34" height={40 + i * 34} rx="6" fill="var(--accent)" fillOpacity={0.18 + i * 0.14} />
            ))}
            <path d="M60 210 L122 176 L184 150 L246 116 L308 84" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
            {[[60,210],[122,176],[184,150],[246,116],[308,84]].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="5" fill="var(--navy)"/>))}
          </g>
        )}
        {v === 1 && (
          <g>{/* challenges — interlocking rings */}
            <circle cx="160" cy="160" r="70" stroke="var(--accent)" strokeWidth="3" strokeOpacity=".7"/>
            <circle cx="240" cy="160" r="70" stroke="var(--navy)" strokeWidth="3" strokeOpacity=".5"/>
            <circle cx="200" cy="110" r="70" stroke="var(--accent)" strokeWidth="3" strokeOpacity=".35"/>
          </g>
        )}
        {v === 2 && (
          <g>{/* year ahead — forward arrows / arcs */}
            {[0,1,2].map((i)=>(<path key={i} d={`M${90+i*60} 220 Q${140+i*60} 120 ${190+i*60} 100`} stroke="var(--accent)" strokeWidth="3" strokeOpacity={0.3+i*0.25} fill="none"/>))}
            <path d="M250 100 l18 0 l-6 -8 M268 100 l-6 8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
            <circle cx="200" cy="160" r="6" fill="var(--navy)"/>
          </g>
        )}
        {v === 3 && (
          <g>{/* opportunities — rising dot field */}
            {Array.from({length:5}).map((_,r)=>Array.from({length:6}).map((__,c)=>{
              const x=60+c*56, y=250-r*40; const on=(r+c)%2===0;
              return <circle key={`${r}-${c}`} cx={x} cy={y} r={on?6:3} fill="var(--accent)" fillOpacity={0.2+r*0.15}/>;
            }))}
          </g>
        )}
        {v === 4 && (
          <g>{/* how to grow — ascending steps */}
            {[0,1,2,3].map((i)=>(<rect key={i} x={50+i*80} y={230-i*46} width="70" height={46+i*46} rx="8" fill="var(--accent)" fillOpacity={0.16+i*0.16}/>))}
            <path d="M60 210 L130 164 L210 118 L290 72" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="2 8"/>
          </g>
        )}
      </svg>
    </div>
  );
}
