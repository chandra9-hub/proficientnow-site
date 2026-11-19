import LegalPage from "@/components/LegalPage";
import { gdprStatement } from "@content/legal";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta("/gdpr", "GDPR & Data Protection", "How ProficientNow Ltd complies with UK GDPR and the Data Protection Act 2018 for clients, candidates and visitors, and how to exercise your rights.");
export default function GdprPage() { return <LegalPage doc={gdprStatement} />; }
