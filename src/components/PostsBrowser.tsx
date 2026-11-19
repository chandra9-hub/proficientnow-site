import Link from "next/link";
import type { Post } from "@/lib/supabase";
import { topicPhoto } from "@/lib/photos";

function fmtDate(iso: string | null) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
}
function stripHtml(html: string | null, n = 240) {
  if (!html) return "";
  const t = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n).trimEnd() + "…" : t;
}

// Server-rendered list; `posts` is null when the backend is unreachable.
export default function PostsBrowser({ type, posts }: { type: "news" | "blog"; posts: Post[] | null }) {
  const heading = type === "news" ? "News & insights" : "Blog";
  const sub = type === "news"
    ? "The latest UK labour-market news and hiring insight from the ProficientNow team."
    : "Guides and perspective on hiring, talent and the UK job market.";

  return (
    <section className="page-header" style={{ paddingBottom: 0 }}>
      <div className="secmark">{type === "news" ? "News" : "Blog"}</div>
      <div className="container-x">
        <p className="eyebrow">Insights</p>
        <h1>{heading}</h1>
        <p>{sub}</p>

        <div className="insights-tabs">
          <Link href="/news" className={type === "news" ? "on" : ""}>News</Link>
          <Link href="/blog" className={type === "blog" ? "on" : ""}>Blog</Link>
        </div>

        <div className="post-grid-3" style={{ padding: "40px 0 90px" }}>
          {!posts?.length ? (
            <p className="muted">
              No {type === "news" ? "news" : "blog posts"} right now. Check back soon, or{" "}
              <Link href="/contact" className="accent">contact us</Link> to talk about your hiring plans.
            </p>
          ) : (
            posts.map((p) => (
              <Link key={p.id} href={`/${type}/${p.slug}`} className="post-card zoom">
                <div className="hd" style={{ backgroundImage: `url(${p.cover_image || topicPhoto(p.category, 0)})` }}>
                  {p.category && <span className="cat">{p.category}</span>}
                </div>
                <div className="bd">
                  <div className="date">{fmtDate(p.published_at)}</div>
                  <h3>{p.title}</h3>
                  {p.excerpt && <div className="ex">{p.excerpt}</div>}
                </div>
                {/* hover preview — zooms in with more of the article text */}
                <div className="post-preview">
                  {p.category && <span className="cat">{p.category}</span>}
                  <h3>{p.title}</h3>
                  <p>{stripHtml(p.body) || p.excerpt}</p>
                  <span className="go">Read article →</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
