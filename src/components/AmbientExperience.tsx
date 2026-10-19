"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";

export function AmbientExperience() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (event.target as HTMLElement).closest<HTMLElement>(".project-card, .skill-card, .contact-cards > a");
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => { document.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, []);
  return <div className="ambient-world" aria-hidden="true"><div className="ambient-cloud cloud-one" /><div className="ambient-cloud cloud-two" /><div className="ambient-grid" /></div>;
}

export function OrbitDetails({ mode = 0 }: { mode?: number }) {
  return <div className="orbit-details particle-details" aria-hidden="true">
    <div className="stage-heading"><span>THE ART OF BECOMING</span><span>4,200 POINTS / ONE IDEA</span></div>
    <i className="stage-corner corner-a" /><i className="stage-corner corner-b" />
    <div className="constellation-track" />
    <div className="code-fragment" key={mode}><span>{mode === 0 ? "01 / C++" : "02 / PYTHON"}</span><code>{mode === 0 ? "while (curious) { build(); }" : "for idea in curiosity: build(idea)"}</code></div>
    <div className="particle-invitation"><Sparkles size={13} /><span>Small pieces.<br /><strong>Infinite possibilities.</strong></span></div>
  </div>;
}
