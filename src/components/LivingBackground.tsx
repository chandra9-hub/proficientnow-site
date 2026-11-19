"use client";
import { useEffect, useRef } from "react";

// Background animation removed per request. We keep only a slim scroll-progress
// bar at the very top (no particles, no moving background).
export default function LivingBackground() {
  const progRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY, h = document.documentElement.scrollHeight - innerHeight, r = h > 0 ? y / h : 0;
      if (progRef.current) progRef.current.style.width = r * 100 + "%";
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div id="progress" ref={progRef} />;
}
