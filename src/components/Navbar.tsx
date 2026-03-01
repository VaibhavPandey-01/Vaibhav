"use client";

import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Zap } from "lucide-react";

export function Navbar() {
    const { scrollY } = useScroll();
    const [blurred, setBlurred] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setBlurred(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${blurred
                    ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
                    : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Minimal lightning-style SVG icon */}
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#ff0033]" />
                </div>

                {/* Center: Vaibhav Pandey (gradient text) */}
                <div className="hidden md:block">
                    <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                        VAIBHAV PANDEY
                    </span>
                </div>

                {/* Right: "Hire Me" button with glow hover */}
                <div>
                    <button className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:accent-glow hover:text-[#ff0033] hover:shadow-[0_0_15px_rgba(255,0,51,0.6)] transition-all duration-300">
                        Hire Me
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
