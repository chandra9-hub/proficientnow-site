import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { termsConditions } from "@content/legal";
export const metadata: Metadata = { title: "Terms & Conditions" };
export default function TermsPage() { return <LegalPage doc={termsConditions} />; }
