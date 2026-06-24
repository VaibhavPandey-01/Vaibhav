"use client";

import { motion } from "framer-motion";
import { Terminal, Brain, Binary, Layout, GitBranch } from "lucide-react";

const skillCards = [
    {
        name: "C++",
        proficiency: "Advanced",
        icon: Terminal,
        tags: ["STL", "OOP", "Algorithms", "Competitive Programming"],
        className: "md:col-span-2",
    },
    {
        name: "AI / Machine Learning",
        proficiency: "Learning",
        icon: Brain,
        tags: ["Python", "TensorFlow", "OpenCV", "LLMs"],
        className: "md:col-span-1",
    },
    {
        name: "Data Structures & Algorithms",
        proficiency: "Strong Foundation",
        icon: Binary,
        tags: ["Trees", "Graphs", "DP", "Problem Solving"],
        className: "md:col-span-1",
    },
    {
        name: "Frontend Development",
        proficiency: "Intermediate",
        icon: Layout,
        tags: ["React", "Tailwind", "HTML", "CSS"],
        className: "md:col-span-1",
    },
    {
        name: "Developer Tools",
        icon: GitBranch,
        tags: ["Git", "GitHub"],
        className: "md:col-span-1",
    },
];

export function SkillsSection() {
    return (
        <section className="min-h-screen py-32 px-6 bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-[#ff0033] font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Core Competencies
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Technical Stack
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skillCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#ff0033]/40 hover:shadow-[0_0_30px_rgba(255,0,51,0.1)] ${card.className}`}
                            >
                                <div>
                                    {/* Icon container */}
                                    <div className="p-3 bg-white/[0.03] rounded-xl w-fit mb-6 border border-white/[0.05] group-hover:border-[#ff0033]/30 group-hover:bg-[#ff0033]/10 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#ff0033] transition-colors duration-300" />
                                    </div>

                                    {/* Name and Proficiency */}
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white tracking-tight">{card.name}</h3>
                                        {card.proficiency && (
                                            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#ff0033]/80 bg-[#ff0033]/5 px-2.5 py-1 rounded-md border border-[#ff0033]/10">
                                                {card.proficiency}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="mt-8 flex flex-wrap gap-2 min-h-[32px]">
                                    {card.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs text-gray-400 bg-white/[0.03] border border-white/[0.05] rounded-full transition-all duration-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:text-white group-hover:border-[#ff0033]/30 group-hover:bg-[#ff0033]/5 transform origin-center"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
