"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "Game Engine Prototype",
        description: "A minimal 2D physics engine built from scratch using C++ and standard libraries. Focuses on custom data structures and collision detection algorithms.",
        tags: ["C++", "Physics", "Data Structures"],
        link: "#",
    },
    {
        title: "Pathfinder Algorithm Visualizer",
        description: "Interactive application designed to help compute shortest paths in a grid. Implements A*, Dijkstra's, and Breadth-First Search algorithms visually.",
        tags: ["C++", "Algorithms", "GUI"],
        link: "#",
    },
    {
        title: "Terminal Chess AI",
        description: "A terminal-based chess engine leveraging Minimax with Alpha-Beta pruning to provide a challenging opponent. Optimized board evaluation function.",
        tags: ["C++", "AI", "Game Dev"],
        link: "#",
    },
    {
        title: "Personal Portfolio",
        description: "This very website. Built with React and Framer Motion to explore modern web development, UI/UX design, and cinematic scroll experiences.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
        link: "#",
    },
];

export function ProjectsSection() {
    return (
        <section className="min-h-screen py-32 px-6 bg-[#050505]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
                    >
                        Engineering Proof
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-lg"
                    >
                        Selected academic programs and private practice projects.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 group relative overflow-hidden flex flex-col justify-between min-h-[350px]"
                        >
                            {/* Subtle hover gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-glow transition-all duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed font-light mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="mt-auto space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-semibold text-gray-300 bg-white/5 rounded block border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        className="inline-flex items-center gap-2 text-white font-medium hover:text-[#ff0033] hover:accent-glow transition-all duration-300"
                                    >
                                        View Project <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
