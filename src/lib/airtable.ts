import "server-only";

// AIRTABLE_API_URL / AIRTABLE_CONTENT_URL exist only so tests can point at a mock server.
const API = process.env.AIRTABLE_API_URL || "https://api.airtable.com";
const CONTENT = process.env.AIRTABLE_CONTENT_URL || "https://content.airtable.com";
const TIMEOUT_MS = 5000;

export type Attachment = { id: string; url: string; filename?: string; type?: string; size?: number };
export type AirtableRecord = { id: string; createdTime?: string; fields: Record<string, unknown> };

type Query = { filterByFormula?: string; sort?: { field: string; direction?: "asc" | "desc" }[]; maxRecords?: number };

function creds() {
  const { AIRTABLE_PAT: pat, AIRTABLE_BASE_ID: base } = process.env;
  return pat && base ? { pat, base } : null;
}

// Airtable allows 5 req/s per base, so 429s back off and retry; every attempt has a hard timeout.
async function request(url: string, init: RequestInit = {}, timeoutMs = TIMEOUT_MS, attempts = 3): Promise<Response> {
  const c = creds()!;
  for (let i = 1; ; i++) {
    const res = await fetch(url, {
      ...init,
      headers: { Authorization: `Bearer ${c.pat}`, "Content-Type": "application/json", ...init.headers },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.status !== 429 || i >= attempts) return res;
    await new Promise((r) => setTimeout(r, 1000 * i));
  }
}

// Formula string literal; Airtable uses backslash escapes inside double quotes.
export const quote = (v: string) => `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

// All matching records across pages; null when env is missing or Airtable fails, so pages render empty states.
export async function fetchRecords(table: string, { filterByFormula, sort = [], maxRecords }: Query = {}): Promise<AirtableRecord[] | null> {
  const c = creds();
  if (!c) return null;
  const params = new URLSearchParams({ pageSize: "100" });
  if (filterByFormula) params.set("filterByFormula", filterByFormula);
  sort.forEach((s, i) => {
    params.set(`sort[${i}][field]`, s.field);
    params.set(`sort[${i}][direction]`, s.direction ?? "asc");
  });
  if (maxRecords) params.set("maxRecords", String(maxRecords));

  try {
    const records: AirtableRecord[] = [];
    let offset: string | undefined;
    do {
      if (offset) params.set("offset", offset);
      const res = await request(`${API}/v0/${c.base}/${encodeURIComponent(table)}?${params}`);
      if (!res.ok) throw new Error(`Airtable ${table} ${res.status}`);
      const page: { records: AirtableRecord[]; offset?: string } = await res.json();
      records.push(...page.records);
      offset = page.offset;
    } while (offset);
    return records;
  } catch (err) {
    console.error("[airtable] read failed:", (err as Error).message);
    return null;
  }
}

// One record by id; null when env is missing, the record doesn't exist or Airtable fails.
export async function fetchRecord(table: string, id: string): Promise<AirtableRecord | null> {
  const c = creds();
  if (!c || !/^rec\w{14}$/.test(id)) return null;
  try {
    const res = await request(`${API}/v0/${c.base}/${encodeURIComponent(table)}/${id}`, { cache: "no-store" });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("[airtable] record read failed:", (err as Error).message);
    return null;
  }
}

// Creates one record; returns its id or null. typecast lets new select options (e.g. Status) be created.
export async function createRecord(table: string, fields: Record<string, unknown>): Promise<string | null> {
  const c = creds();
  if (!c) return null;
  try {
    const res = await request(`${API}/v0/${c.base}/${encodeURIComponent(table)}`, {
      method: "POST",
      body: JSON.stringify({ fields, typecast: true }),
    });
    if (!res.ok) throw new Error(`Airtable create ${table} ${res.status}`);
    return ((await res.json()) as AirtableRecord).id;
  } catch (err) {
    console.error("[airtable] create failed:", (err as Error).message);
    return null;
  }
}

export async function deleteRecord(table: string, id: string): Promise<void> {
  const c = creds();
  if (!c) return;
  await request(`${API}/v0/${c.base}/${encodeURIComponent(table)}/${id}`, { method: "DELETE" }).catch(() => {});
}

// Uploads a file (max 5 MB) straight into an attachment field.
export async function uploadAttachment(recordId: string, field: string, file: { contentType: string; filename: string; bytes: Buffer }): Promise<boolean> {
  const c = creds();
  if (!c) return false;
  try {
    const res = await request(`${CONTENT}/v0/${c.base}/${recordId}/${encodeURIComponent(field)}/uploadAttachment`, {
      method: "POST",
      body: JSON.stringify({ contentType: file.contentType, filename: file.filename, file: file.bytes.toString("base64") }),
    }, 20_000);
    if (!res.ok) throw new Error(`Airtable upload ${res.status}`);
    return true;
  } catch (err) {
    console.error("[airtable] upload failed:", (err as Error).message);
    return false;
  }
}

export const isConfigured = () => creds() !== null;
