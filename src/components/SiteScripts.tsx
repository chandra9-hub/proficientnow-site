"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Wires up the on-scroll animations: section reveals, the zooming logo watermark,
// stat counters, heading parallax, and 3D card tilt. Re-runs on page change.
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // reveal on scroll
    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    // zooming logo watermark
    const markIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".secmark").forEach((el) => markIO.observe(el));
    cleanups.push(() => markIO.disconnect());

    // stat counters
    const numIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (!e.isIntersecting || el.dataset.counted) return;
        el.dataset.counted = "1";
        const to = +(el.dataset.to || "0");
        const suf = el.dataset.suffix || "";
        const start = performance.now(), dur = 1500;
        const tick = (now: number) => {
          const pr = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - pr, 3);
          const val = Math.round(eased * to);
          el.textContent = (to >= 1000 ? val.toLocaleString("en-GB") : String(val)) + suf;
          if (pr < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll<HTMLElement>(".num").forEach((el) => numIO.observe(el));
    cleanups.push(() => numIO.disconnect());

    // heading parallax
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".parallax"));
    const onScroll = () => {
      const vh = window.innerHeight;
      heads.forEach((h) => {
        const r = h.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          const o = (vh / 2 - (r.top + r.height / 2)) * 0.04;
          h.style.transform = `translateY(${-o}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // card tilt toward cursor
    document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-py * 7}deg) rotateY(${px * 7}deg)`;
      };
      const leave = () => { card.style.transform = ""; };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
