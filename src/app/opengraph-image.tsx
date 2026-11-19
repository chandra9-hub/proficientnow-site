import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@content/site";
import { theme } from "@content/theme";

export const alt = "ProficientNow: specialist recruitment agency in the UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card for every page; built once at build time.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-dark.png"));
  const c = theme.colors;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: c.navy, color: c.white }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={560} height={64} alt="" />
        <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>{site.tagline}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, color: c.line }}>
          <div style={{ width: 48, height: 6, borderRadius: 3, background: c.accent }} />
          Specialist recruitment agency UK · No fee until you hire
        </div>
      </div>
    ),
    size,
  );
}
