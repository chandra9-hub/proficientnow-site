"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ArticleArt from "@/components/ArticleArt";
import { supabase, type Post } from "@/lib/supabase";

function fmtDate(iso: string | null) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
}

type Section = { heading: string; html: string };
function parseBody(html: string): { intro: string; sections: Section[] } {
  if (typeof window === "undefined") return { intro: html, sections: [] };
  const el = document.createElement("div"); el.innerHTML = html || "";
  let intro = ""; const sections: Section[] = []; let cur: Section | null = null;
  el.childNodes.forEach((node) => {
    const e = node as HTMLElement;
    if (e.tagName === "H2" || e.tagName === "H3") {
      cur = { heading: e.textContent || "", html: "" }; sections.push(cur);
    } else {
      const frag = (e.outerHTML ?? (node.textContent ? `<p>${node.textContent}</p>` : "")) || "";
      if (cur) cur.html += frag; else intro += frag;
    }
  });
  return { intro, sections };
}

export default function PostArticle({ type, slug }: { type: "news" | "blog"; slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from("posts").select("*")
        .eq("type", type).eq("slug", slug).eq("status", "published").maybeSingle();
      setPost((data as Post) || null);
      setLoading(false);
    })();
  }, [type, slug]);

  const parsed = useMemo(() => parseBody(post?.body || ""), [post?.body]);

  return (
    <section className="page-header">
      <div className="container-x">
        <div className="article-wrap">
          <Link href={`/${type}`} className="backlink">← Back to {type === "news" ? "News" : "Blog"}</Link>
          {loading ? (
            <p className="muted">Loading…</p>
          ) : !post ? (
            <>
              <h1>Article not found</h1>
              <p className="muted" style={{ marginTop: 12 }}>This article may have been moved or unpublished.</p>
            </>
          ) : (
            <>
              {post.category && <div className="cat">{post.category}</div>}
              <h1>{post.title}</h1>
              <div className="meta">{fmtDate(post.published_at)} · {post.author || "ProficientNow"}</div>

              {/* cover: real photo if provided, otherwise an on-brand banner */}
              {post.cover_image
                ? <div className="cover" style={{ backgroundImage: `url(${post.cover_image})` }} />
                : <div className="cover cover-art"><ArticleArt variant={0} /></div>}

              {/* intro */}
              {parsed.intro && <div className="body rich" dangerouslySetInnerHTML={{ __html: parsed.intro }} />}

              {/* sections: side heading + themed band + text */}
              {parsed.sections.map((s, i) => (
                <div className="article-section" key={i}>
                  <div className="article-band-wrap"><ArticleArt variant={i + 1} /></div>
                  <h2>{s.heading}</h2>
                  <div className="body rich" dangerouslySetInnerHTML={{ __html: s.html }} />
                </div>
              ))}

              {(post.source_name || post.source_url) && (
                <div className="article-src">
                  Source: {post.source_name}{post.source_url ? " — " : ""}
                  {post.source_url && <a href={post.source_url} target="_blank" rel="noreferrer">{post.source_url}</a>}
                </div>
              )}
              <div className="article-cta">
                <div>
                  <h3>{type === "news" ? "Hiring in this market?" : "Put this into practice"}</h3>
                  <p>Tell us the role and we'll show you specialist talent that generalist agencies never reach — usually within a week.</p>
                </div>
                <Link href="/contact" className="btn-primary">Start a search →</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
