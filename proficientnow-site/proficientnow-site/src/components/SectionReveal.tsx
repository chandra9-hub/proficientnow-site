// Wraps content so it fades/rises into view on scroll (wired by SiteScripts).
export default function SectionReveal({
  children, className = "",
}: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
