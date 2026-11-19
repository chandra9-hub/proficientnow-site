import { pageMeta } from "@/lib/seo";

// Metadata lives here because the calculator page is a client component.
export const metadata = pageMeta(
  "/salary-calculator",
  "UK Salary Calculator 2026",
  "Free UK salary calculator: benchmark low, median and high base pay by industry and level, from graduate to director, using ONS ASHE and 2026 guides.",
);

export default function SalaryCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
