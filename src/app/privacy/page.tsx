import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@content/legal";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta("/privacy", "Privacy Policy", "How ProficientNow Ltd collects, uses and protects personal data about clients, candidates and website visitors under UK data protection law.");
export default function PrivacyPage() { return <LegalPage doc={privacyPolicy} />; }
