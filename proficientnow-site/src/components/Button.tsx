import Link from "next/link";

// A link styled as a button. Use variant="primary" (filled) or "secondary" (outline).
export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-dark hover:-translate-y-0.5 shadow-sm hover:shadow-md"
      : "border border-line text-navy hover:border-accent hover:text-accent";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
