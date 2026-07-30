"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Protected admin area. If you're not signed in, you get sent to /login.
// (Stage 1 shows a simple dashboard — the jobs manager and applications inbox
//  get added in the next stages.)
export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      if (!supabase) { router.replace("/login"); return; }
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        setEmail(data.session.user.email ?? "");
        setChecking(false);
      }
    })();
  }, [router]);

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checking) return <div className="auth-wrap"><p className="muted">Checking access…</p></div>;

  return (
    <div className="auth-wrap" style={{ alignItems: "flex-start", paddingTop: 140 }}>
      <div className="container-x" style={{ maxWidth: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="eyebrow">Admin</p>
            <h1 style={{ fontSize: 34, marginTop: 8 }}>Dashboard</h1>
            <p className="muted" style={{ marginTop: 8 }}>Signed in as {email}</p>
          </div>
          <button onClick={signOut} className="btn-ghost" style={{ border: "1px solid var(--ghostbd)", cursor: "pointer" }}>Sign out</button>
        </div>

        <div className="grid-2" style={{ marginTop: 40 }}>
          <div className="panel">
            <h3 style={{ fontSize: 18 }}>Jobs manager</h3>
            <p className="muted" style={{ marginTop: 10 }}>Coming in the next step — post, edit and publish jobs here.</p>
          </div>
          <div className="panel">
            <h3 style={{ fontSize: 18 }}>Applications inbox</h3>
            <p className="muted" style={{ marginTop: 10 }}>Coming soon — view applicants and download CVs here.</p>
          </div>
        </div>

        <p className="muted" style={{ marginTop: 40, fontSize: 13 }}>
          You&apos;re logged in successfully. This confirms the secure area works. 🎉
        </p>
      </div>
    </div>
  );
}
