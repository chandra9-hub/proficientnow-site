// Curated, VERIFIED people-free photos, hosted locally in /public/photos.
// (Unsplash — free for commercial use, no attribution required.)
// Posts without a "Cover Image" in Airtable fall back to these.
const P = (n: string) => `/photos/${n}.jpg`;

const CAT: Record<string, string[]> = {
  "economy": ["skyline", "towers", "data"],
  "labour market": ["office-corridor", "office", "boardroom"],
  "vacancies": ["office", "office-lounge", "workspace"],
  "policy": ["building", "towers", "boardroom"],
  "regulation": ["boardroom", "data", "office"],
  "skills": ["circuit", "data", "workspace"],
  "hiring strategy": ["boardroom", "office-lounge", "office"],
  "workforce": ["office-lounge", "office-corridor", "office"],
  "sectors": ["towers", "building", "data"],
  "talent": ["office-lounge", "office", "boardroom"],
  "compliance": ["data", "boardroom", "office"],
};
const SEC: Record<string, string[]> = {
  "engineering": ["circuit", "data", "towers"],
  "construction": ["building", "towers", "office-corridor"],
  "manufacturing": ["energy", "circuit", "data"],
  "medical-devices": ["data", "workspace", "office"],
  "healthcare": ["office-corridor", "office", "building"],
  "automotive": ["cars", "building", "workspace"],
  "renewable-energy": ["energy", "nature", "towers"],
  "finance": ["skyline", "data", "boardroom"],
  "legal": ["boardroom", "building", "office"],
  "sales-commercial": ["boardroom", "office-lounge", "workspace"],
  "operations": ["office-corridor", "office", "workspace"],
  "supply-chain": ["towers", "building", "energy"],
  "electrical": ["circuit", "energy", "data"],
  "civil": ["building", "towers", "office-corridor"],
  "facilities-management": ["office", "building", "office-corridor"],
  "commercial-services": ["office-lounge", "boardroom", "office"],
};
const pick = (arr: string[] | undefined, i: number, fb: string) =>
  P(arr && arr.length ? arr[((i % arr.length) + arr.length) % arr.length] : fb);

export function topicPhoto(category: string | null, i = 0) {
  return pick(CAT[(category || "").toLowerCase()], i, "office");
}
export function sectorPhoto(slug: string, i = 0) {
  return pick(SEC[slug], i, "building");
}
