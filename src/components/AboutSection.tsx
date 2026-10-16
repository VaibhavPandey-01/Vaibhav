"use client";

import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section className="min-h-screen py-32 px-6 flex items-center bg-gradient-to-b from-black to-charcoal">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white m-0 tracking-tighter">
                        I build structured thinking <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                            into digital systems.
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-2xl mx-auto space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed text-center"
                >
                    <p>
                        As a C++ developer, I approach software engineering as an exercise in logic.
                        I thrive on complex data structures, algorithmic challenges, and designing
                        solutions that operate with deep performance and reliability.
                    </p>
                    <p>
                        My curiosity extends well beyond the compiler—I&apos;m actively exploring AI
                        tools and modern frontend environments, treating every technical layer as
                        a new foundation for problem-solving.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
