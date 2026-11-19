"use client";

import Link from "next/link";
import AdminShell from "@/components/AdminShell";

export default function AdminDashboard() {
  return (
    <AdminShell>
      <p className="eyebrow">Admin</p>
      <h1 style={{ fontSize: 34, marginTop: 8 }}>Dashboard</h1>
      <p className="muted" style={{ marginTop: 8 }}>Manage your careers portal here.</p>

      <div className="grid-2" style={{ marginTop: 40 }}>
        <Link href="/admin/jobs" className="panel tilt" style={{ display: "block" }}>
          <h3 style={{ fontSize: 18 }}>Jobs manager →</h3>
          <p className="muted" style={{ marginTop: 10 }}>Create, edit and publish job listings.</p>
        </Link>
        <Link href="/admin/applications" className="panel tilt" style={{ display: "block" }}>
          <h3 style={{ fontSize: 18 }}>Applications inbox →</h3>
          <p className="muted" style={{ marginTop: 10 }}>View applicants, download CVs, track status.</p>
        </Link>
      </div>
    </AdminShell>
  );
}
