"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Frame Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen transition-all duration-1000"
                style={{ backgroundImage: `url('/images/resume/120.jpg')` }}
            ></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter text-glow"
                >
                    Let’s Build Something Meaningful.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <a
                        href="mailto:contact@vaibhavpandey.dev"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-[#ff0033] hover:bg-[#ff0033]/10 hover:shadow-[0_0_30px_rgba(255,0,51,0.5)]"
                    >
                        <span className="relative z-10 text-xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff0033] transition-colors duration-300">
                            Contact Me
                        </span>
                        <ArrowRight className="relative z-10 w-6 h-6 text-white group-hover:text-[#ff0033] group-hover:translate-x-1 transition-all duration-300" />

                        {/* Subtle glow effect behind button text */}
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
