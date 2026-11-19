import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { gdprStatement } from "@content/legal";
export const metadata: Metadata = { title: "GDPR & Data Protection" };
export default function GdprPage() { return <LegalPage doc={gdprStatement} />; }
