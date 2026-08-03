"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, type Post } from "@/lib/supabase";

function fmtDate(iso: string | null) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
}

export default function PostsBrowser({ type }: { type: "news" | "blog" }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      if (!supabase) { setLoading(false); return; }
      setLoading(true);
      const { data } = await supabase
        .from("posts").select("*")
        .eq("type", type).eq("status", "published")
        .order("published_at", { ascending: false });
      setPosts((data as Post[]) || []);
      setLoading(false);
    })();
  }, [type]);

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

        <div className="post-layout">
          <div className="post-grid">
            {loading ? (
              <p className="muted">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="muted">No {type === "news" ? "news" : "blog posts"} yet — check back soon.</p>
            ) : (
              posts.map((p) => (
                <Link key={p.id} href={`/${type}/${p.slug}`} className="post-card" onMouseEnter={() => setSide(p)}>
                  <div className="hd" style={p.cover_image ? { backgroundImage: `url(${p.cover_image})` } : undefined}>
                    {p.category && <span className="cat">{p.category}</span>}
                  </div>
                  <div className="bd">
                    <div className="date">{fmtDate(p.published_at)}</div>
                    <h3>{p.title}</h3>
                    {p.excerpt && <div className="ex">{p.excerpt}</div>}
                  </div>
                </Link>
              ))
            )}
          </div>

          <aside className="post-side">
            {side ? (
              <>
                {side.category && <div className="cat">{side.category}</div>}
                <h4>{side.title}</h4>
                {side.excerpt && <p>{side.excerpt}</p>}
                <Link href={`/${type}/${side.slug}`} className="go">Read full article →</Link>
              </>
            ) : (
              <div className="ph">Hover a story to preview it here — or click to read the full article.</div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
