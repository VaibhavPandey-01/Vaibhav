"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Phone } from "lucide-react";

export function CTASection() {
    return (
        <section id="contact" className="relative min-h-[80vh] flex items-center justify-center bg-black py-24">
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
                    <div className="relative group">
                        {/* Much stronger and larger Ambient Rainbow Glow Behind the Button */}
                        <div className="absolute inset-[-10px] z-0 bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3,#ff0000)] rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-115" />
                        <div className="absolute inset-[-5px] z-0 bg-[conic-gradient(from_180deg_at_50%_50%,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3,#ff0000)] rounded-full blur-xl opacity-50 group-hover:opacity-90 transition-all duration-500 scale-100 group-hover:scale-110" />

                        <a
                            href="mailto:contact@vaibhavpandey.dev"
                            className="relative z-10 inline-flex items-center gap-4 px-12 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                        >
                            {/* Animated Rainbow Background Layer */}
                            <div className="absolute inset-[-1000%] z-0 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3,#ff0000)] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Inner Dark Background (inset-[5px] makes the spinning border much thicker and bolder) */}
                            <div className="absolute inset-[5px] z-0 bg-black/95 backdrop-blur-md rounded-full transition-colors duration-500 group-hover:bg-black/90" />

                            <span className="relative z-10 text-xl font-black tracking-widest uppercase text-white transition-colors duration-300">
                                Contact Me
                            </span>
                            <ArrowRight className="relative z-10 w-6 h-6 text-white group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <a
                        href="https://www.linkedin.com/in/vaibhav-pandey-a9006338b/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                    <a
                        href="tel:+919369868977"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                        <Phone className="h-4 w-4" /> +91 9369868977
                    </a>
                    <a
                        href="https://github.com/VaibhavPandey-01"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                        <Github className="h-4 w-4" /> GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
