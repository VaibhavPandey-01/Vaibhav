"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ from, to }: { from: number; to: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(from, { stiffness: 60, damping: 20 });
    const value = useTransform(spring, (current) => Math.floor(current));

    useEffect(() => {
        if (inView) {
            spring.set(to);
        }
    }, [inView, spring, to]);

    return <motion.span ref={ref}>{value}</motion.span>;
}

export function StatsSection() {
    return (
        <section className="min-h-[70vh] py-24 px-6 flex items-center justify-center bg-black">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center flex flex-col items-center justify-center gap-4"
                >
                    <div className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-gray-800 to-white">
                        <Counter from={0} to={500} />+
                    </div>
                    <div className="text-gray-400 font-medium tracking-widest uppercase text-lg">
                        Problems Solved
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center flex flex-col items-center justify-center gap-4"
                >
                    <div className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-[#ff0033]/60 to-white accent-glow">
                        <Counter from={0} to={20} />+
                    </div>
                    <div className="text-gray-400 font-medium tracking-widest uppercase text-lg">
                        Projects Built
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center flex flex-col items-center justify-center gap-4"
                >
                    <div className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-blue-800 to-white shadow-blue-500/50">
                        <Counter from={0} to={100} />%
                    </div>
                    <div className="text-gray-400 font-medium tracking-widest uppercase text-lg">
                        Curiosity
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
