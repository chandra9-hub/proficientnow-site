"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@content/site";
import { sectors } from "@content/sectors";

export default function Footer() {
  const pathname = usePathname();
  // Hide the public footer on the private admin/login pages.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) return null;

  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container-x">
        <div className="foot-grid">
          <div>
            <div className="logo"><img className="lg-light" src="/brand/logo-light.png" alt="ProficientNow" /><img className="lg-dark" src="/brand/logo-dark.png" alt="ProficientNow" /></div>
            <p className="blurb">{site.tagline}</p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/sectors">Sectors</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Sectors</h4>
            <ul>
              {sectors.slice(0, 6).map((s) => (
                <li key={s.name}><Link href="/sectors">{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={site.contact.phoneHref}>{site.contact.phone}</a></li>
              <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              <li style={{ paddingTop: 8 }}>
                {site.contact.address.line1}<br />
                {site.contact.address.city}, {site.contact.address.postcode}<br />
                {site.contact.address.country}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="container-x">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
