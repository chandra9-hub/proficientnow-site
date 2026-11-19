import Link from "next/link";
import type { Post } from "@/lib/supabase";
import { topicPhoto } from "@/lib/photos";
import { safeUrl } from "@/lib/safeUrl";

function fmtDate(iso: string | null) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
}
type Section = { heading: string; html: string };
// Splits the article HTML at each <h2>/<h3> so it can be laid out as alternating rows (server-safe).
function parseBody(html: string): { intro: string; sections: Section[] } {
  const [intro, ...rest] = (html || "").split(/(?=<h[23][\s>])/i);
  const sections = rest.map((chunk) => {
    const m = chunk.match(/^<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    return m ? { heading: m[1], html: chunk.slice(m[0].length) } : { heading: "", html: chunk };
  });
  return { intro, sections };
}

export default function PostArticle({ type, post }: { type: "news" | "blog"; post: Post }) {
  const parsed = parseBody(post.body || "");
  const hero = post.cover_image || topicPhoto(post.category, 0);

  return (
    <section className="page-header">
      <div className="container-x">
        <div className="article-page">
          <Link href={`/${type}`} className="backlink">← Back to {type === "news" ? "News" : "Blog"}</Link>
          <>
              <div className="article-head">
                {post.category && <div className="cat">{post.category}</div>}
                <h1>{post.title}</h1>
                <div className="meta">{fmtDate(post.published_at)} · {post.author || "ProficientNow"}</div>
              </div>

              <img className="article-hero" src={hero} alt={post.title} loading="lazy" />

              {parsed.intro && <div className="article-lead rich" dangerouslySetInnerHTML={{ __html: parsed.intro }} />}

              {parsed.sections.map((s, i) => (
                <div className={`art-row ${i % 2 === 1 ? "flip" : ""}`} key={i}>
                  <div className="art-text">
                    <h2 dangerouslySetInnerHTML={{ __html: s.heading }} />
                    <div className="rich" dangerouslySetInnerHTML={{ __html: s.html }} />
                  </div>
                  <div className="art-photo">
                    <img src={topicPhoto(post.category, i + 1)} alt="" loading="lazy" />
                  </div>
                </div>
              ))}

              <div className="article-foot">
                {(post.source_name || post.source_url) && (
                  <div className="article-src">
                    Source: {post.source_name}{post.source_url ? " — " : ""}
                    {post.source_url && (safeUrl(post.source_url)
                      ? <a href={safeUrl(post.source_url)!} target="_blank" rel="noopener noreferrer">{post.source_url}</a>
                      : post.source_url)}
                  </div>
                )}
                <div className="article-cta">
                  <div>
                    <h3>{type === "news" ? "Hiring in this market?" : "Put this into practice"}</h3>
                    <p>Tell us the role and we'll show you specialist talent that generalist agencies never reach — usually within a week.</p>
                  </div>
                  <Link href="/contact" className="btn-primary">Start a search →</Link>
                </div>
              </div>
          </>
        </div>
      </div>
    </section>
  );
}
