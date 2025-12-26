"use client";

import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/lib/data";

// Experience card with tilt effect
function ExperienceCard({
    experience,
    index,
}: {
    experience: (typeof portfolioData.experience)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });
    const [isExpanded, setIsExpanded] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isTraining = experience.type === "training";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000"
        >
            <div
                className={`relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 card-glow ${isExpanded
                        ? "bg-bg-light border-accent/30"
                        : "bg-bg-light/50 border-accent/10 hover:border-accent/20"
                    }`}
            >
                {/* Type badge */}
                <div className="absolute top-6 right-6">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${isTraining
                                ? "bg-accent/10 text-accent"
                                : "bg-bg-lighter text-text-muted"
                            }`}
                    >
                        {isTraining ? "Training" : "Work Experience"}
                    </span>
                </div>

                {/* Header */}
                <div className="mb-6 pr-24">
                    <h3 className="text-xl lg:text-2xl font-display font-bold text-text mb-2">
                        {experience.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                        <span>{experience.organization}</span>
                        <span className="w-1 h-1 rounded-full bg-accent/50" />
                        <span className="text-accent">{experience.period}</span>
                    </div>
                </div>

                {/* Problem → Solution → Impact */}
                <div className="space-y-6">
                    {/* Problem */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-xs text-accent">?</span>
                            </div>
                            <span className="text-sm font-medium text-accent">Challenge</span>
                        </div>
                        <p className="text-text-muted pl-8">{experience.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-xs text-accent">→</span>
                            </div>
                            <span className="text-sm font-medium text-accent">Approach</span>
                        </div>
                        <p className="text-text-muted pl-8">{experience.solution}</p>
                    </div>

                    {/* Impact - Expandable */}
                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? "auto" : 0 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                    <span className="text-xs text-accent">★</span>
                                </div>
                                <span className="text-sm font-medium text-accent">Impact</span>
                            </div>
                            <p className="text-text-muted pl-8">{experience.impact}</p>

                            {/* Highlights */}
                            <div className="pt-4 pl-8">
                                <div className="flex flex-wrap gap-2">
                                    {experience.highlights.map((highlight, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="px-3 py-1 rounded-full bg-bg text-xs text-text-muted border border-accent/10"
                                        >
                                            {highlight}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Expand button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors group"
                >
                    <span>{isExpanded ? "Show less" : "View impact & highlights"}</span>
                    <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        ↓
                    </motion.span>
                </button>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-2xl pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full transform translate-x-16 translate-y-16" />
                </div>
            </div>
        </motion.div>
    );
}

// Timeline connector
function TimelineConnector({ isLast }: { isLast: boolean }) {
    if (isLast) return null;

    return (
        <div className="hidden lg:flex flex-col items-center py-4">
            <div className="w-[2px] h-16 bg-gradient-to-b from-accent/30 to-transparent" />
        </div>
    );
}

export function ExperienceSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section
            id="experience"
            ref={containerRef}
            className="section-padding relative overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/30 to-bg" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        Journey
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text"
                    >
                        Experience & Training
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-text-muted max-w-2xl mx-auto"
                    >
                        A progression from traditional accounting foundations to modern ERP
                        systems and digital business solutions.
                    </motion.p>
                </div>

                {/* Experience cards */}
                <div className="space-y-8">
                    {portfolioData.experience.map((exp, index) => (
                        <div key={exp.id}>
                            <ExperienceCard experience={exp} index={index} />
                            <TimelineConnector
                                isLast={index === portfolioData.experience.length - 1}
                            />
                        </div>
                    ))}
                </div>

                {/* Education callout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 p-8 rounded-2xl bg-accent/5 border border-accent/20"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-accent"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-display font-bold text-text mb-2">
                                Academic Foundation
                            </h3>
                            <p className="text-text-muted">
                                {portfolioData.education.degree} from{" "}
                                {portfolioData.education.institution}, graduated{" "}
                                {portfolioData.education.graduation}. Studied{" "}
                                {portfolioData.education.focus.slice(0, 3).join(", ")}, and
                                more.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
