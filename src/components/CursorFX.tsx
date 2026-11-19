"use client";
import { useEffect } from "react";
export default function CursorFX() {
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0;
    const sel = "a,button,.tgl,.card,.pill,.mrow,.scard,.themeToggle,[role=button],[onclick]";
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; };
    const over = (e: MouseEvent) => { if ((e.target as Element).closest?.(sel)) ring.classList.add("hovering"); };
    const out = (e: MouseEvent) => { if ((e.target as Element).closest?.(sel)) ring.classList.remove("hovering"); };
    addEventListener("mousemove", move); addEventListener("mouseover", over); addEventListener("mouseout", out);
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", move); removeEventListener("mouseover", over); removeEventListener("mouseout", out); dot.remove(); ring.remove(); };
  }, []);
  return null;
}
