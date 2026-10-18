"use client";

import { useEffect } from "react";
import { Code2, Cpu, Sparkles } from "lucide-react";

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

export function OrbitDetails() {
  return <div className="orbit-details" aria-hidden="true">
    <div className="orb-ring ring-one" /><div className="orb-ring ring-two" />
    <div className="orbit-badge badge-code"><Code2 size={19} /><span>BUILD WITH PURPOSE<small>Ideas → working software</small></span></div>
    <div className="orbit-badge badge-ai"><Cpu size={19} /><span>INTELLIGENCE, LOCAL<small>Beyond the cloud</small></span></div>
    <div className="orbit-spark"><Sparkles size={23} /></div>
  </div>;
}
