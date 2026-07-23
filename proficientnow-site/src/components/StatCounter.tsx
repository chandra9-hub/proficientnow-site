"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Animated counter that ticks up from 0 to `value` when it scrolls into view.
export default function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const formatted =
    value >= 1000 ? display.toLocaleString("en-GB") : display.toString();

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-extrabold text-navy md:text-5xl">
        {formatted}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-slate">{label}</p>
    </div>
  );
}
