"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import RichEditor from "@/components/RichEditor";
import { supabase, type Post } from "@/lib/supabase";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

type Form = {
  id?: string;
  type: string; title: string; slug: string; category: string;
  excerpt: string; body: string; cover_image: string;
  author: string; source_name: string; source_url: string;
  status: string; featured: boolean;
};

const blank: Form = {
  type: "news", title: "", slug: "", category: "", excerpt: "", body: "",
  cover_image: "", author: "ProficientNow", source_name: "", source_url: "",
  status: "draft", featured: false,
};

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "news" | "blog">("all");
  const [mode, setMode] = useState<"list" | "form">("list");
  const [form, setForm] = useState<Form>(blank);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts((data as Post[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function newPost() { setForm(blank); setSlugTouched(false); setMode("form"); setMsg(""); }
  function editPost(p: Post) {
    setForm({
      id: p.id, type: p.type || "news", title: p.title || "", slug: p.slug || "", category: p.category || "",
      excerpt: p.excerpt || "", body: p.body || "", cover_image: p.cover_image || "",
      author: p.author || "ProficientNow", source_name: p.source_name || "", source_url: p.source_url || "",
      status: p.status || "draft", featured: !!p.featured,
    });
    setSlugTouched(true); setMode("form"); setMsg("");
  }

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "title" && !slugTouched) next.slug = slugify(String(v));
      return next;
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!form.title.trim()) { setMsg("Please enter a title."); return; }
    if (!form.slug.trim()) { setMsg("Please enter a slug (web address)."); return; }
    setSaving(true); setMsg("");
    const payload: any = { ...form };
    delete payload.id;
    // stamp published_at the first time it goes live
    if (form.status === "published") payload.published_at = payload.published_at || new Date().toISOString();
    const res = form.id
      ? await supabase.from("posts").update(payload).eq("id", form.id)
      : await supabase.from("posts").insert(payload);
    setSaving(false);
    if (res.error) { setMsg(res.error.message.includes("duplicate") ? "That slug is already used — choose a different one." : res.error.message); return; }
    await load();
    setMode("list");
  }

  async function quickStatus(p: Post, status: string) {
    if (!supabase) return;
    const patch: any = { status };
    if (status === "published" && !p.published_at) patch.published_at = new Date().toISOString();
    await supabase.from("posts").update(patch).eq("id", p.id);
    load();
  }
  async function del(p: Post) {
    if (!supabase) return;
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await supabase.from("posts").delete().eq("id", p.id);
    load();
  }

  const shown = posts.filter((p) => filter === "all" ? true : p.type === filter);
  const fld = { display: "flex", flexDirection: "column" as const, gap: 6 };

  return (
    <AdminShell>
      {mode === "list" ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div><p className="eyebrow">News &amp; Blog</p><h1 style={{ fontSize: 32, marginTop: 8 }}>Posts manager</h1></div>
            <button onClick={newPost} className="btn-primary" style={{ border: 0, cursor: "pointer" }}>+ New post</button>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
            {(["all", "news", "blog"] as const).map((t) => (
              <button key={t} onClick={() => setFilter(t)} className="btn-ghost"
                style={{ padding: "8px 16px", cursor: "pointer", textTransform: "capitalize",
                  borderColor: filter === t ? "var(--accent)" : "var(--line)", color: filter === t ? "var(--accent)" : "var(--muted)" }}>
                {t}
              </button>
            ))}
          </div>

          {loading ? <p className="muted" style={{ marginTop: 30 }}>Loading…</p> : shown.length === 0 ? (
            <p className="muted" style={{ marginTop: 30 }}>No posts yet. Click &ldquo;New post&rdquo; to write your first article.</p>
          ) : (
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {shown.map((p) => (
                <div key={p.id} className="panel" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 8px", borderRadius: 999, background: "rgba(61,107,228,.12)", color: "var(--accent)" }}>{p.type}</span>
                      <h3 style={{ fontSize: 17 }}>{p.title}</h3>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 8px", borderRadius: 999,
                        background: p.status === "published" ? "rgba(46,200,120,.15)" : "rgba(120,130,150,.14)",
                        color: p.status === "published" ? "#2ea86a" : "var(--muted)" }}>{p.status}</span>
                    </div>
                    <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{p.category ? p.category + " · " : ""}/{p.type}/{p.slug}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => editPost(p)} className="btn-ghost" style={{ padding: "8px 16px", cursor: "pointer" }}>Edit</button>
                    {p.status !== "published"
                      ? <button onClick={() => quickStatus(p, "published")} className="btn-ghost" style={{ padding: "8px 16px", cursor: "pointer", color: "#2ea86a", borderColor: "#2ea86a" }}>Publish</button>
                      : <button onClick={() => quickStatus(p, "draft")} className="btn-ghost" style={{ padding: "8px 16px", cursor: "pointer" }}>Unpublish</button>}
                    <button onClick={() => del(p)} className="btn-ghost" style={{ padding: "8px 16px", cursor: "pointer", color: "#d15", borderColor: "#d15" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <form onSubmit={save}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <h1 style={{ fontSize: 28 }}>{form.id ? "Edit post" : "New post"}</h1>
            <button type="button" onClick={() => setMode("list")} className="btn-ghost" style={{ padding: "8px 18px", cursor: "pointer" }}>← Back</button>
          </div>

          <div className="panel" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="grid-2">
              <div style={fld}><label className="label">Type</label>
                <select className="field" value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="news">News</option><option value="blog">Blog</option>
                </select>
              </div>
              <div style={fld}><label className="label">Status</label>
                <select className="field" value={form.status} onChange={(e) => set("status", e.target.value)}>
                  <option value="draft">Draft (hidden)</option><option value="published">Published (live)</option>
                </select>
              </div>
            </div>

            <div style={fld}><label className="label">Title</label>
              <input className="field" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. UK hiring cools as employers chase AI skills" />
            </div>

            <div className="grid-2">
              <div style={fld}><label className="label">Slug (web address)</label>
                <input className="field" value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} placeholder="uk-hiring-cools" />
              </div>
              <div style={fld}><label className="label">Category</label>
                <input className="field" value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Labour market" />
              </div>
            </div>

            <div style={fld}><label className="label">Short brief (shows on cards &amp; hover)</label>
              <textarea className="field" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="One or two sentences summarising the article." />
            </div>

            <div style={fld}><label className="label">Full article</label>
              <RichEditor value={form.body} onChange={(html) => set("body", html)} />
            </div>

            <div style={fld}><label className="label">Cover image URL (optional — real images only)</label>
              <input className="field" value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://… (leave blank to use a brand header)" />
            </div>

            <div className="grid-2">
              <div style={fld}><label className="label">Source name (optional)</label>
                <input className="field" value={form.source_name} onChange={(e) => set("source_name", e.target.value)} placeholder="e.g. Reuters" />
              </div>
              <div style={fld}><label className="label">Source URL (optional)</label>
                <input className="field" value={form.source_url} onChange={(e) => set("source_url", e.target.value)} placeholder="https://…" />
              </div>
            </div>

            {msg && <p style={{ color: "#d15", fontSize: 14 }}>{msg}</p>}
            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ border: 0, cursor: "pointer" }}>{saving ? "Saving…" : "Save post"}</button>
              <button type="button" onClick={() => setMode("list")} className="btn-ghost" style={{ cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
