import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@content/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import LivingBackground from "@/components/LivingBackground";
import SiteScripts from "@/components/SiteScripts";
import CursorFX from "@/components/CursorFX";
import JsonLd from "@/components/JsonLd";
import { organizationLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Specialist Recruitment Agency UK | ProficientNow", template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "en_GB", type: "website" },
  twitter: { card: "summary_large_image" },
};

// Applies the saved light/dark choice before first paint (no flash of wrong theme).
const themeInit = `(function(){try{if(localStorage.getItem('pn-theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <JsonLd data={organizationLd} />
      </head>
      <body>
        <Loader />
        <LivingBackground />
        <CursorFX />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SiteScripts />
      </body>
    </html>
  );
}
