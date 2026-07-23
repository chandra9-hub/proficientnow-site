import Link from "next/link";
import { site } from "@content/site";
import { sectors } from "@content/sectors";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        {/* Brand + blurb */}
        <div className="md:col-span-1">
          <Link href="/" className="font-display text-xl font-extrabold text-white">
            Proficient<span className="text-accent">Now</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {site.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            {site.socials.linkedin !== "#" && (
              <a href={site.socials.linkedin} className="text-sm text-white/60 hover:text-white" aria-label="LinkedIn">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-white/60 hover:text-white">About us</Link></li>
            <li><Link href="/services" className="text-white/60 hover:text-white">Services</Link></li>
            <li><Link href="/sectors" className="text-white/60 hover:text-white">Sectors</Link></li>
            <li><Link href="/careers" className="text-white/60 hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="text-white/60 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Sectors (first 6) */}
        <div>
          <h3 className="text-sm font-semibold text-white">Sectors</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {sectors.slice(0, 6).map((s) => (
              <li key={s.name}>
                <Link href="/sectors" className="text-white/60 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
            </li>
            <li className="pt-2">
              {site.contact.address.line1}<br />
              {site.contact.address.city}, {site.contact.address.postcode}<br />
              {site.contact.address.country}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
