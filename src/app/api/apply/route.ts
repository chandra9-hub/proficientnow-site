import { createRecord, deleteRecord, fetchRecord, isConfigured, uploadAttachment } from "@/lib/airtable";
import { safeUrl } from "@/lib/safeUrl";
import { careers } from "@content/careers";

export const dynamic = "force-dynamic";

// Airtable's upload endpoint takes at most 5 MB per file.
const MAX_CV_BYTES = Math.min(careers.upload.maxSizeMB, 5) * 1024 * 1024;
const MIN_FILL_MS = 3000;

// Extension and leading bytes must agree, so a renamed executable is rejected.
const CV_TYPES: Record<string, { contentType: string; magic: number[] }> = {
  pdf: { contentType: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  doc: { contentType: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
  docx: { contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b, 0x03, 0x04] },
};

// ponytail: per-instance memory, so each serverless instance counts separately; move to Upstash/KV if abuse gets past it.
const WINDOW_MS = 10 * 60 * 1000, MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.size > 5000) hits.clear();
  hits.set(ip, [...recent, now]);
  return recent.length >= MAX_PER_WINDOW;
}

const fail = (status: number, error: string) => Response.json({ error }, { status });
const GENERIC = "We couldn't submit your application. Please try again or email us your CV.";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// [form name, Airtable field, max length, required]
const TEXT_FIELDS: [string, string, number, boolean][] = [
  ["firstName", "First Name", 100, true],
  ["lastName", "Last Name", 100, true],
  ["email", "Email", 254, true],
  ["phone", "Phone", 40, true],
  ["expectedSalary", "Expected Salary", 100, true],
  ["noticePeriod", "Notice Period", 100, true],
  ["currentLocation", "Current Location", 100, false],
  ["currentSalary", "Current Salary", 100, false],
  ["yearsExperience", "Years Experience", 50, false],
  ["coverLetter", "Cover Letter", 5000, false],
];
const URL_FIELDS: [string, string][] = [["linkedin", "LinkedIn URL"], ["portfolio", "Portfolio URL"]];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "Too many applications from your connection. Please try again later.");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, GENERIC);
  }
  const str = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string).trim() : "");

  // Bots fill the hidden field or submit faster than a person can type.
  const started = Number(str("startedAt"));
  if (str("website") || !started || Date.now() - started < MIN_FILL_MS) return fail(400, GENERIC);
  if (str("consent") !== "yes") return fail(400, "Please confirm you consent to us storing your details.");

  const fields: Record<string, unknown> = {};
  for (const [key, field, max, required] of TEXT_FIELDS) {
    const v = str(key);
    if (required && !v) return fail(400, "Please fill in all required fields.");
    if (v.length > max) return fail(400, "One of your answers is too long. Please shorten it and try again.");
    if (v) fields[field] = v;
  }
  if (!EMAIL.test(str("email"))) return fail(400, "Please enter a valid email address.");
  for (const [key, field] of URL_FIELDS) {
    const raw = str(key);
    if (!raw) continue;
    const url = raw.length <= 500 ? safeUrl(raw) : null;
    if (!url) return fail(400, "Links must start with http:// or https://.");
    fields[field] = url;
  }

  const cv = form.get("cv");
  if (!(cv instanceof Blob) || cv.size === 0) return fail(400, "Please attach your CV.");
  if (cv.size > MAX_CV_BYTES) return fail(400, `Your CV is larger than ${MAX_CV_BYTES / 1024 / 1024} MB. Please upload a smaller file.`);
  const ext = ((cv as File).name || "").split(".").pop()?.toLowerCase() ?? "";
  const kind = CV_TYPES[ext];
  const bytes = Buffer.from(await cv.arrayBuffer());
  if (!kind || !kind.magic.every((b, i) => bytes[i] === b)) return fail(400, "Please upload your CV as a PDF, DOC or DOCX file.");

  if (!isConfigured()) return fail(503, GENERIC);
  const jobId = str("jobId");
  const job = await fetchRecord("Jobs", jobId);
  if (!job || job.fields["Published"] !== true) return fail(400, "This role is no longer open.");

  const first = fields["First Name"] as string, last = fields["Last Name"] as string;
  const recordId = await createRecord("Applications", {
    ...fields,
    Name: `${first} ${last}`,
    Job: [job.id],
    "Job Title": typeof job.fields["Title"] === "string" ? job.fields["Title"] : "",
    Status: "Applied",
    Source: "Website",
  });
  if (!recordId) return fail(502, GENERIC);

  const filename = `${`${first}-${last}`.replace(/[^\w-]+/g, "_").slice(0, 80)}-CV.${ext}`;
  if (!(await uploadAttachment(recordId, "CV", { contentType: kind.contentType, filename, bytes }))) {
    // No half-saved applications: without the CV the candidate should simply retry.
    await deleteRecord("Applications", recordId);
    return fail(502, GENERIC);
  }
  return Response.json({ ok: true });
}
