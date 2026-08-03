"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, type Post } from "@/lib/supabase";

function fmtDate(iso: string | null) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
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
              <div className="cover" style={post.cover_image ? { backgroundImage: `url(${post.cover_image})` } : undefined} />
              <div className="body rich" dangerouslySetInnerHTML={{ __html: post.body || "" }} />
              {(post.source_name || post.source_url) && (
                <div className="article-src">
                  Source: {post.source_name}{post.source_url ? " — " : ""}
                  {post.source_url && <a href={post.source_url} target="_blank" rel="noreferrer">{post.source_url}</a>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
