import LegalPage from "@/components/LegalPage";
import { cookiePolicy } from "@content/legal";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta("/cookies", "Cookie Policy", "How ProficientNow Ltd uses cookies and similar technologies on its website, in line with PECR and UK data protection law.");
export default function CookiesPage() { return <LegalPage doc={cookiePolicy} />; }
