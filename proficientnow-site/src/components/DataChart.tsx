// UK job vacancies chart — real ONS data (2022 peak ~1.30m -> 712k Apr–Jun 2026).
const PTS: [string, number][] = [
  ["2022", 1300], ["", 1230], ["2023", 1050], ["", 920],
  ["2024", 890], ["", 840], ["2025", 790], ["", 745], ["2026", 712],
];
const X0 = 44, X1 = 384, Y0 = 54, Y1 = 250, VMAX = 1400;
const n = PTS.length;
const X = (i: number) => X0 + ((X1 - X0) * i) / (n - 1);
const Y = (v: number) => Y1 - (Y1 - Y0) * (v / VMAX);

export default function DataChart() {
  const line = PTS.map(([, v], i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${X(n - 1).toFixed(1)},${Y1} L${X(0).toFixed(1)},${Y1} Z`;
  const grids = [0, 350, 700, 1050, 1400];
  return (
    <div className="chartcard">
      <div className="chart-h">
        <span className="eyebrow">UK labour market</span>
        <h4>Job vacancies are near a four-year low</h4>
      </div>
      <svg viewBox="0 0 400 300" fill="none" className="chart-svg">
        {grids.map((gv) => (
          <g key={gv}>
            <line x1={X0} y1={Y(gv)} x2={X1} y2={Y(gv)} stroke="var(--line)" strokeWidth="1" />
            <text x={X0 - 8} y={Y(gv) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{gv}</text>
          </g>
        ))}
        <path d={area} fill="var(--accent)" fillOpacity="0.08" />
        <path d={line} stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={X(0)} cy={Y(1300)} r="5" fill="var(--accent)" />
        <circle cx={X(n - 1)} cy={Y(712)} r="5" fill="var(--navy)" />
        <text x={X(0) + 6} y={Y(1300) - 8} fontSize="12" fontWeight="700" fill="var(--ink)">1.30m peak</text>
        <text x={X(n - 1) - 6} y={Y(712) - 10} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--ink)">712k</text>
        {PTS.map(([lbl], i) => lbl ? (<text key={i} x={X(i)} y={Y1 + 20} textAnchor="middle" fontSize="12" fill="var(--muted)">{lbl}</text>) : null)}
      </svg>
      <div className="chart-stats">
        <div><b>712,000</b><span>vacancies · Apr–Jun 2026</span></div>
        <div><b>4.9%</b><span>UK unemployment</span></div>
        <div><b>2.5</b><span>jobseekers per vacancy</span></div>
      </div>
      <div className="chart-src">Source: Office for National Statistics (ONS), UK labour market, 2026 — vacancies ~54% below the mid-2022 peak.</div>
    </div>
  );
}
