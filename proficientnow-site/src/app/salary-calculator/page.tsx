"use client";

import { useState } from "react";
import Link from "next/link";
import { salaryFamilies, salaryIndustries, salaryGroups, salaryMeta } from "@content/salaries";

const gbp = (n: number) => "£" + n.toLocaleString("en-GB");

export default function SalaryCalculatorPage() {
  const [industrySlug, setIndustrySlug] = useState("");
  const [levelIdx, setLevelIdx] = useState<number | "">("");

  const industry = salaryIndustries.find((i) => i.slug === industrySlug) || null;
  const family = industry ? salaryFamilies[industry.family] : null;
  const levels = family?.levels || [];
  const level = family && levelIdx !== "" ? levels[levelIdx] : null;

  const [pick, setPick] = useState<number | null>(null);
  const sliderVal = level ? (pick ?? level.median) : 0;
  const pct = level ? Math.round(((sliderVal - level.low) / (level.high - level.low)) * 100) : 0;

  function onIndustry(slug: string) { setIndustrySlug(slug); setLevelIdx(""); setPick(null); }
  function onLevel(v: string) { setLevelIdx(v === "" ? "" : Number(v)); setPick(null); }

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 40 }}>
        <div className="container-x">
          <div className="pill-badge">Free tool · UK 2026 data</div>
          <h1 style={{ marginTop: 14 }}>UK Salary Calculator</h1>
          <p>Benchmark pay across every industry we recruit in — from graduate to director level. Based on real UK market data, updated {salaryMeta.updated}.</p>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 10 }}>
        <div className="container-x">
          <div className="salary-grid">
            {/* controls */}
            <div>
              <label className="label" style={{ fontWeight: 700 }}>1. Select industry</label>
              <select className="field" value={industrySlug} onChange={(e) => onIndustry(e.target.value)} style={{ marginTop: 6 }}>
                <option value="">Select industry…</option>
                {salaryGroups.map((g) => (
                  <optgroup key={g} label={g}>
                    {salaryIndustries.filter((i) => i.group === g).map((i) => (
                      <option key={i.slug} value={i.slug}>{i.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <label className="label" style={{ fontWeight: 700, marginTop: 26 }}>2. Select level</label>
              <select className="field" value={levelIdx} onChange={(e) => onLevel(e.target.value)} disabled={!family} style={{ marginTop: 6, opacity: family ? 1 : 0.6 }}>
                <option value="">{family ? "Select level…" : "Select an industry first…"}</option>
                {levels.map((l, i) => (<option key={i} value={i}>{l.title}</option>))}
              </select>

              <div className="src-note">
                <b>Data source:</b> {salaryMeta.note}
              </div>
            </div>

            {/* live benchmark card */}
            <div className={`salary-card ${level ? "on" : ""}`}>
              {!level ? (
                <div className="salary-empty">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
                  <p>Select an industry and level<br />to see salary benchmarks</p>
                </div>
              ) : (
                <>
                  <div className="salary-card-head">{industry!.name} · {level.title}</div>
                  <div className="lmh">
                    <div><span>Low</span><b>{gbp(level.low)}</b></div>
                    <div className="mid"><span>Median</span><b>{gbp(level.median)}</b></div>
                    <div><span>High</span><b>{gbp(level.high)}</b></div>
                  </div>
                  <input type="range" className="salary-slider" min={level.low} max={level.high} step={1000}
                    value={sliderVal} onChange={(e) => setPick(Number(e.target.value))}
                    style={{ background: `linear-gradient(to right, var(--accent) ${pct}%, var(--line) ${pct}%)` }} />
                  <div className="slider-read">Base salary range: {gbp(level.low)} – {gbp(level.high)} · <b>Selected: {gbp(sliderVal)}</b></div>
                  <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                    Hire at this level — no fee until placed →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* full table for the selected industry's family */}
          {family && (
            <div style={{ marginTop: 70 }}>
              <h2 style={{ fontSize: 30 }}>All levels: {industry!.name}</h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Benchmarks based on {family.name} roles.</p>
              <div className="salary-table-wrap">
                <table className="salary-table">
                  <thead><tr><th>Level</th><th>Low</th><th>Median</th><th>High</th></tr></thead>
                  <tbody>
                    {levels.map((l, i) => (
                      <tr key={i} className={levelIdx === i ? "active" : ""} onClick={() => { setLevelIdx(i); setPick(null); }}>
                        <td>{l.title}</td><td>{gbp(l.low)}</td><td className="mid">{gbp(l.median)}</td><td>{gbp(l.high)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="muted" style={{ fontSize: 12, marginTop: 14 }}>
                Figures are indicative UK base salaries and exclude bonus, benefits and London weighting. For a precise, role-specific benchmark, <Link href="/contact" className="accent">talk to our team</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
