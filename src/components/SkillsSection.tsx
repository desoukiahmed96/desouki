"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/lib/data";

// 3D tilt card component
function TiltCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
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
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <motion.div
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

// Skill progress bar
function SkillProgress({
    skill,
    index,
    isInView,
}: {
    skill: { name: string; level: number };
    index: number;
    isInView: boolean;
}) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">{skill.name}</span>
                <span className="text-xs text-accent">{skill.level}%</span>
            </div>
            <div className="h-1 bg-bg rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                />
            </div>
        </div>
    );
}

// Skill category card
function SkillCard({
    category,
    categoryKey,
    index,
}: {
    category: {
        title: string;
        description: string;
        items: { name: string; level: number }[];
    };
    categoryKey: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    const icons: Record<string, React.ReactNode> = {
        accounting: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        erp: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        technical: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <TiltCard>
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-bg-light border border-accent/10 card-glow">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            {icons[categoryKey]}
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-text">
                                {category.title}
                            </h3>
                            <p className="text-sm text-text-muted mt-1">
                                {category.description}
                            </p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                        {category.items.map((skill, skillIndex) => (
                            <SkillProgress
                                key={skill.name}
                                skill={skill}
                                index={skillIndex}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
}

export function SkillsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const categories = Object.entries(portfolioData.skills);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="section-padding relative overflow-hidden bg-bg"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #d4a853 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text"
                    >
                        Skills & Capabilities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-text-muted max-w-2xl mx-auto"
                    >
                        A unique blend of financial expertise and technical proficiency,
                        enabling end-to-end business system solutions.
                    </motion.p>
                </div>

                {/* Skills grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {categories.map(([key, category], index) => (
                        <SkillCard
                            key={key}
                            category={category}
                            categoryKey={key}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-16 lg:mt-24 divider"
                />
            </div>
        </section>
    );
}
