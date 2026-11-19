import LegalPage from "@/components/LegalPage";
import { termsConditions } from "@content/legal";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta("/terms", "Terms & Conditions", "The terms that govern use of the ProficientNow Ltd website by clients, candidates and visitors. Paid recruitment services have a separate agreement.");
export default function TermsPage() { return <LegalPage doc={termsConditions} />; }
