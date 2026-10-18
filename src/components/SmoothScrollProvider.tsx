"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        let lenis: Lenis | undefined;
        const configure = () => {
            lenis?.destroy();
            lenis = undefined;
            if (!preference.matches) {
                lenis = new Lenis({ autoRaf: true, duration: 1.1, smoothWheel: true, prevent: (node) => node.tagName === "DIALOG" });
            }
        };
        configure();
        preference.addEventListener("change", configure);
        return () => { lenis?.destroy(); preference.removeEventListener("change", configure); };
    }, []);
    return (
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
    );
}
