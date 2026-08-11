// Topic-matched REAL photos (keyword-relevant, license-free demo source).
// Swap any post's photo by setting its "Cover image" URL in the admin editor.
const CAT: Record<string, string> = {
  "economy": "london,finance,skyline",
  "labour market": "office,corporate,business",
  "vacancies": "office,workplace,desk",
  "policy": "london,westminster,government",
  "regulation": "office,documents,business",
  "skills": "technology,training,computer",
  "hiring strategy": "business,meeting,handshake",
  "workforce": "team,office,collaboration",
  "sectors": "industry,factory,engineering",
  "talent": "office,business,professional",
  "compliance": "office,documents,paperwork",
};
const SECTORS: Record<string, string> = {
  "engineering": "engineering,machinery,industrial",
  "construction": "construction,site,crane",
  "manufacturing": "factory,manufacturing,production",
  "medical-devices": "medical,laboratory,equipment",
  "healthcare": "hospital,healthcare,clinic",
  "automotive": "automotive,car,factory",
  "renewable-energy": "wind,turbine,solar,energy",
  "finance": "finance,office,charts",
  "legal": "law,books,office",
  "sales-commercial": "business,meeting,office",
  "operations": "warehouse,operations,logistics",
  "supply-chain": "shipping,containers,port",
  "electrical": "electrical,power,industrial",
  "civil": "bridge,infrastructure,construction",
  "facilities-management": "building,facility,commercial",
  "commercial-services": "office,building,corporate",
};
const base = (kw: string, lock: number, w: number, h: number) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${lock}`;

export function topicPhoto(category: string | null, lock = 1, w = 1200, h = 800) {
  const kw = CAT[(category || "").toLowerCase()] || "office,corporate,business";
  return base(kw, lock, w, h);
}
export function sectorPhoto(slug: string, lock = 1, w = 1200, h = 800) {
  const kw = SECTORS[slug] || "industry,business,professional";
  return base(kw, lock, w, h);
}
