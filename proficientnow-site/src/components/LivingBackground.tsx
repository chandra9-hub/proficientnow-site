"use client";
import { useEffect, useRef } from "react";

// Continuous particle network over the solid page background.
// Particles are brand-blue on light, light-blue on dark. Reacts to the mouse.
export default function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!; const x = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    let P: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const m = { x: -9999, y: -9999, a: false };
    function size() {
      W = innerWidth; H = innerHeight; canvas.width = W * DPR; canvas.height = H * DPR; x.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(Math.floor((W * H) / 14000), 120); P = [];
      for (let i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.5 + 0.5 });
    }
    const onMove = (e: MouseEvent) => { m.x = e.clientX; m.y = e.clientY; m.a = true; };
    const onOut = () => { m.a = false; };
    function loop() {
      const dk = document.documentElement.classList.contains("dark");
      const dc = dk ? "rgba(130,165,255,.5)" : "rgba(61,107,228,.30)";
      const lc = dk ? "rgba(90,140,255," : "rgba(61,107,228,";
      x.clearRect(0, 0, W, H);
      for (let i = 0; i < P.length; i++) { const p = P[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; if (m.a) { const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy); if (d < 140) { const f = (140 - d) / 140; p.x += (dx / d) * f * 2; p.y += (dy / d) * f * 2; } } x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.28); x.fillStyle = dc; x.fill(); }
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy); if (d < 120) { x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.strokeStyle = lc + (0.1 * (1 - d / 120)).toFixed(3) + ")"; x.lineWidth = 1; x.stroke(); } }
      raf = requestAnimationFrame(loop);
    }
    function onScroll() { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight, r = h > 0 ? y / h : 0; if (progRef.current) progRef.current.style.width = r * 100 + "%"; if (dotRef.current) dotRef.current.style.top = r * (innerHeight - 12) + "px"; }
    size(); loop(); onScroll();
    addEventListener("resize", size); addEventListener("mousemove", onMove); addEventListener("mouseout", onOut); addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("mousemove", onMove); removeEventListener("mouseout", onOut); removeEventListener("scroll", onScroll); };
  }, []);

  return (<><canvas id="bgCanvas" ref={canvasRef} /><div id="tracer" /><div id="tracerDot" ref={dotRef} /><div id="progress" ref={progRef} /></>);
}
