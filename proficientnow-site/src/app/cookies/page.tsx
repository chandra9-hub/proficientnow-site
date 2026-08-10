import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { cookiePolicy } from "@content/legal";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage doc={cookiePolicy} />; }
