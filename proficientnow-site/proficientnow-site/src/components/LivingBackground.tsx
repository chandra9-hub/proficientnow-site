"use client";

import { useEffect, useRef } from "react";

// The single living background behind the whole site: drifting particles that
// react to the mouse, a soft aurora, plus the scroll tracer line and top progress bar.
export default function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    let parts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    function build() {
      const c = Math.min(Math.floor((W * H) / 12000), 150);
      parts = [];
      for (let i = 0; i < c; i++)
        parts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32, r: Math.random() * 1.6 + 0.5 });
    }
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }
    function onMove(e: MouseEvent) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }
    function onOut() { mouse.active = false; mouse.x = -9999; mouse.y = -9999; }

    function loop() {
      const light = document.documentElement.classList.contains("light");
      const dotC = light ? "rgba(31,79,208,.34)" : "rgba(130,165,255,.5)";
      const lineBase = light ? "rgba(31,79,208," : "rgba(90,140,255,";
      const glow = light ? "rgba(46,107,255,.10)" : "rgba(46,107,255,.14)";
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) { const f = (150 - d) / 150; p.x += (dx / d) * f * 2.4; p.y += (dy / d) * f * 2.4; }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fillStyle = dotC; ctx.fill();
      }
      for (let i = 0; i < parts.length; i++)
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = lineBase + (0.13 * (1 - d / 130)).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.stroke(); }
        }
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 170);
        g.addColorStop(0, glow); g.addColorStop(1, "rgba(46,107,255,0)");
        ctx.fillStyle = g; ctx.fillRect(mouse.x - 170, mouse.y - 170, 340, 340);
      }
      raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const r = h > 0 ? y / h : 0;
      if (progRef.current) progRef.current.style.width = r * 100 + "%";
      if (dotRef.current) dotRef.current.style.top = r * (window.innerHeight - 12) + "px";
    }

    size(); loop();
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div id="bg" />
      <div id="bgLight" />
      <div id="bgAurora" />
      <canvas id="bgCanvas" ref={canvasRef} />
      <div id="tracer" />
      <div id="tracerDot" ref={dotRef} />
      <div id="progress" ref={progRef} />
    </>
  );
}
