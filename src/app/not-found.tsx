import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container-x">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for has moved or no longer exists.</p>
        <p style={{ marginTop: 28 }}>
          <Link href="/" className="btn-primary">Back to home <span aria-hidden>→</span></Link>
        </p>
      </div>
    </section>
  );
}
