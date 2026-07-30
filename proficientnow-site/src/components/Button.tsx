import Link from "next/link";

export default function Button({
  href, children, variant = "primary",
}: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link href={href} className={variant === "primary" ? "btn-primary" : "btn-ghost"}>
      {children} <span aria-hidden>→</span>
    </Link>
  );
}
