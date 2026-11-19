"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Admin login. There is no public sign-up — accounts are created by you in the
// Supabase dashboard, so this is the only way in.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) { setError("Login isn't connected yet. Please try again shortly."); return; }
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Incorrect email or password.");
      setBusy(false);
    } else {
      router.replace("/admin");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card panel">
        <Link href="/" className="logo" style={{ display: "block", textAlign: "center", marginBottom: 6 }}>
          Proficient<span className="now">Now.</span>
        </Link>
        <p className="muted" style={{ textAlign: "center", fontSize: 13, marginBottom: 28 }}>Team sign in</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="label">Email</label>
            <input type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required className="field" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <button type="submit" disabled={busy} className="btn-primary" style={{ justifyContent: "center", border: 0, cursor: "pointer", opacity: busy ? 0.7 : 1 }}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {error && <p style={{ color: "#ff6b6b", fontSize: 14, textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
