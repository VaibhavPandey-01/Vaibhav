"use client";

import { MotionConfig } from "framer-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
    );
}
