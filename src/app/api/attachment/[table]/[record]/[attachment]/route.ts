import { fetchRecord, type Attachment } from "@/lib/airtable";

export const dynamic = "force-dynamic";

// Only public image fields are served; Applications (CVs) can never be reached through here.
const PUBLIC_FIELDS: Record<string, string> = { Posts: "Cover Image" };
// Vercel caps function responses at 4.5 MB; larger files fall back to a short-lived redirect.
const MAX_BYTES = 4_000_000;

const empty = (status: number, maxAge = 60) =>
  new Response(null, { status, headers: { "Cache-Control": `public, s-maxage=${maxAge}` } });

// Stable URL for an Airtable image: resolves the current signed URL and serves the bytes from our CDN.
export async function GET(_req: Request, { params }: { params: { table: string; record: string; attachment: string } }) {
  const field = PUBLIC_FIELDS[params.table];
  if (!field || !/^rec\w{14}$/.test(params.record) || !/^att\w{14}$/.test(params.attachment)) return empty(404, 3600);

  const record = await fetchRecord(params.table, params.record);
  const list = record?.fields[field];
  const att = Array.isArray(list) ? (list as Attachment[]).find((a) => a?.id === params.attachment && typeof a.url === "string") : undefined;
  if (!att) return empty(404);

  const upstream = await fetch(att.url, { cache: "no-store", signal: AbortSignal.timeout(10_000) }).catch(() => null);
  const type = upstream?.headers.get("content-type") ?? "";
  if (!upstream?.ok || !type.startsWith("image/")) {
    upstream?.body?.cancel().catch(() => {});
    return empty(upstream?.ok ? 415 : 502);
  }

  const tooBig = () => {
    upstream.body?.cancel().catch(() => {});
    return new Response(null, { status: 302, headers: { Location: att.url, "Cache-Control": "public, s-maxage=600" } });
  };
  const declared = Number(upstream.headers.get("content-length"));
  if (!declared || declared > MAX_BYTES) return tooBig();
  const body = await upstream.arrayBuffer();
  if (body.byteLength > MAX_BYTES) return tooBig();

  return new Response(body, {
    headers: {
      "Content-Type": type,
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
