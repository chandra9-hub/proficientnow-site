import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@content/legal";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <LegalPage doc={privacyPolicy} />; }
