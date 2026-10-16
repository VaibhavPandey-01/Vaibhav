"use client";

import { useEffect, useRef } from "react";

export function SignalOrb({ mode = 0 }: { mode?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, width = 0, height = 0, visible = true;
    const pointer = { x: 0, y: 0 };
    let targetX = 0, targetY = 0;
    let morph = 0;
    const particles = Array.from({ length: 950 }, (_, i) => {
      const y = 1 - (i / 949) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
    });
    const draw = (time: number) => {
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      pointer.x += (targetX - pointer.x) * 0.035;
      pointer.y += (targetY - pointer.y) * 0.035;
      const angle = (media.matches ? 0.6 : time * 0.00009) + pointer.x * 0.3;
      const tilt = 0.32 + pointer.y * 0.2;
      const r = Math.min(width, height) * 0.34;
      const cx = width / 2, cy = height / 2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.6);
      glow.addColorStop(0, "rgba(255,106,80,0.09)"); glow.addColorStop(1, "rgba(255,106,80,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      morph += (modeRef.current - morph) * (media.matches ? 1 : 0.045);
      const projected = particles.map((p, i) => {
        const u = (i % 38) / 38 * Math.PI * 2, v = Math.floor(i / 38) / 25 * Math.PI * 2;
        const torus = { x: (0.78 + 0.29 * Math.cos(v)) * Math.cos(u), y: (0.78 + 0.29 * Math.cos(v)) * Math.sin(u), z: 0.29 * Math.sin(v) };
        const wave = { x: ((i % 38) / 37 - 0.5) * 2.3, y: Math.sin(u * 1.5 + (media.matches ? 0 : time * 0.001)) * 0.24 + Math.cos(v * 1.5) * 0.18, z: (Math.floor(i / 38) / 24 - 0.5) * 2 };
        const a = morph <= 1 ? p : torus, b = morph <= 1 ? torus : wave, mix = morph <= 1 ? morph : morph - 1;
        const point = { x:a.x+(b.x-a.x)*mix, y:a.y+(b.y-a.y)*mix, z:a.z+(b.z-a.z)*mix };
        const x = point.x * Math.cos(angle) - point.z * Math.sin(angle);
        const z = point.x * Math.sin(angle) + point.z * Math.cos(angle);
        return { x, y: point.y * Math.cos(tilt) - z * Math.sin(tilt), z: point.y * Math.sin(tilt) + z * Math.cos(tilt) };
      }).sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const s = 1 + p.z * 0.12;
        const alpha = 0.12 + ((p.z + 1) / 2) * 0.8;
        ctx.fillStyle = p.x > 0.25 ? `rgba(255,183,147,${alpha})` : `rgba(255,103,78,${alpha})`;
        ctx.beginPath(); ctx.arc(cx + p.x * r * s, cy + p.y * r * s, (0.7 + (p.z + 1) * 0.65), 0, Math.PI * 2); ctx.fill();
      }
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.4);
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(255,130,100,${0.18 - i * 0.04})`; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.ellipse(0, 0, r * (1.22 + i * 0.12), r * (0.34 + i * 0.025), 0, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.restore();
      if (!media.matches) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (media.matches) draw(0);
    };
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); targetX = (event.clientX - rect.left) / rect.width - 0.5; targetY = (event.clientY - rect.top) / rect.height - 0.5; };
    const start = () => { cancelAnimationFrame(frame); if (visible) frame = requestAnimationFrame(draw); };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }); intersection.observe(canvas);
    const modeChange = () => { if (media.matches) draw(0); };
    canvas.addEventListener("pointermove", move); media.addEventListener("change", start);
    canvas.addEventListener("shapechange", modeChange);
    resize(); start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); canvas.removeEventListener("pointermove", move); media.removeEventListener("change", start); canvas.removeEventListener("shapechange", modeChange); };
  }, []);
  useEffect(() => { ref.current?.dispatchEvent(new Event("shapechange")); }, [mode]);
  return <canvas ref={ref} className="signal-orb" aria-hidden="true" />;
}
