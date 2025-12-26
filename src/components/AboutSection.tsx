"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/lib/data";

// Animated line reveal
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
            >
                {text}
            </motion.div>
        </div>
    );
}

// Strength card with hover effect
function StrengthCard({
    strength,
    index,
}: {
    strength: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="group flex items-center gap-4 p-4 rounded-lg bg-bg-light/50 border border-accent/5 hover:border-accent/20 transition-all duration-300"
        >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="w-2 h-2 rounded-full bg-accent"
                />
            </div>
            <span className="text-text-muted group-hover:text-text transition-colors">
                {strength}
            </span>
        </motion.div>
    );
}

export function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section
            id="about"
            ref={containerRef}
            className="section-padding relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-light via-bg to-bg-light opacity-50" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-16 lg:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        About Me
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text">
                        <AnimatedText text="From Spreadsheets" />
                        <AnimatedText text="to Systems" delay={0.1} />
                    </h2>
                </div>

                {/* Split layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Story */}
                    <div className="space-y-8">
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-text leading-relaxed"
                        >
                            {portfolioData.about.intro}
                        </motion.p>

                        <div className="space-y-6">
                            {portfolioData.about.story.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={
                                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                                    }
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="text-text-muted leading-relaxed"
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>

                        {/* Education highlight */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: 0.7 }}
                            className="pt-8 border-t border-accent/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 14l9-5-9-5-9 5 9 5z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-text">
                                        {portfolioData.education.degree}
                                    </h3>
                                    <p className="text-text-muted">
                                        {portfolioData.education.institution}
                                    </p>
                                    <p className="text-sm text-accent mt-1">
                                        Graduated {portfolioData.education.graduation}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Strengths */}
                    <div className="space-y-8">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl font-display font-bold text-text"
                        >
                            Core Strengths
                        </motion.h3>

                        <div className="space-y-3">
                            {portfolioData.about.strengths.map((strength, index) => (
                                <StrengthCard
                                    key={index}
                                    strength={strength}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Languages */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: 0.8 }}
                            className="pt-8 border-t border-accent/10"
                        >
                            <h4 className="text-lg font-semibold text-text mb-6">
                                Languages
                            </h4>
                            <div className="space-y-4">
                                {portfolioData.languages.map((lang, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text">{lang.name}</span>
                                            <span className="text-text-muted">{lang.level}</span>
                                        </div>
                                        <div className="h-1 bg-bg-lighter rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={
                                                    isInView
                                                        ? { width: `${lang.percentage}%` }
                                                        : { width: 0 }
                                                }
                                                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                                                className="h-full bg-accent rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none"
            />
        </section>
    );
}
