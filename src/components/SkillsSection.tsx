"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "C++", percent: 90 },
    { name: "Data Structures & Algorithms", percent: 85 },
    { name: "Problem Solving", percent: 95 },
    { name: "Object-Oriented Programming", percent: 90 },
    { name: "Frontend Development", percent: 70 },
    { name: "AI Tools", percent: 80 },
];

export function SkillsSection() {
    return (
        <section className="min-h-screen py-32 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-[#ff0033] font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Core Compétences
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Technical Stack
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {skills.map((skill, i) => (
                        <div key={skill.name} className="flex flex-col gap-3">
                            <div className="flex justify-between items-end">
                                <span className="text-white text-lg font-medium">{skill.name}</span>
                                <span className="text-gray-500 text-sm font-mono">{skill.percent}%</span>
                            </div>

                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percent}%` }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-gray-500 to-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
