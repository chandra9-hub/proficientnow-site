"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Wraps every admin page: checks you're logged in (else sends you to /login),
// and shows a simple admin top bar with navigation + sign out.
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!supabase) { router.replace("/login"); return; }
      const { data } = await supabase.auth.getSession();
      if (!data.session) { router.replace("/login"); return; }
      setEmail(data.session.user.email ?? "");
      setReady(true);
    })();
  }, [router]);

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/login");
  }

  if (!ready) return <div className="auth-wrap"><p className="muted">Checking access…</p></div>;

  return (
    <div style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>
      <div style={{ borderBottom: "1px solid var(--line)", background: "var(--navglass)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="container-x" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <Link href="/admin" className="logo" style={{ fontSize: 20 }}>Proficient<span className="now">Now.</span></Link>
            <nav style={{ display: "flex", gap: 20 }}>
              <Link href="/admin" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>Dashboard</Link>
              <Link href="/admin/jobs" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>Jobs</Link>
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="muted" style={{ fontSize: 13 }}>{email}</span>
            <button onClick={signOut} className="btn-ghost" style={{ padding: "8px 18px", border: "1px solid var(--ghostbd)", cursor: "pointer" }}>Sign out</button>
          </div>
        </div>
      </div>
      <div className="container-x" style={{ paddingTop: 48, paddingBottom: 80 }}>{children}</div>
    </div>
  );
}
