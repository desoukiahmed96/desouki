"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/lib/data";

// Animated text reveal component
function AnimatedHeadline({ words }: { words: string[] }) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 100,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden"
        >
            {words.map((word, index) => (
                <div key={index} className="overflow-hidden">
                    <motion.div
                        variants={wordVariants}
                        className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-tight-custom ${index === 1 ? "text-gradient" : "text-text"
                            }`}
                        style={{ perspective: "1000px" }}
                    >
                        {word}
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
}

// Animated scroll indicator
function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3 text-text-muted"
            >
                <span className="text-xs font-medium tracking-widest uppercase">
                    Scroll
                </span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
        </motion.div>
    );
}

// Floating geometric shapes
function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Main accent shape */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute top-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96"
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="w-full h-full rounded-full border border-accent/20"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-accent/10"
                />
                <div className="absolute inset-16 rounded-full bg-accent/5 blur-3xl" />
            </motion.div>

            {/* Small floating dots */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                    className="absolute w-2 h-2 rounded-full bg-accent/40"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                    }}
                />
            ))}

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #d4a853 1px, transparent 1px),
            linear-gradient(to bottom, #d4a853 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
}

export function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-light" />

            {/* Floating shapes */}
            <FloatingShapes />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20"
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
                    {/* Left: Text content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-sm text-accent font-medium">
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <AnimatedHeadline words={portfolioData.hero.headline} />

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed"
                        >
                            {portfolioData.hero.subheadline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <a
                                href="#contact"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-semibold rounded-lg overflow-hidden transition-transform hover:scale-105"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <motion.span
                                    className="relative z-10"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                                <div className="absolute inset-0 bg-accent-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </a>
                            <a
                                href="#experience"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 border border-accent/30 text-text font-semibold rounded-lg overflow-hidden hover:border-accent/60 transition-colors"
                            >
                                <span>View Experience</span>
                                <span className="text-accent group-hover:translate-x-1 transition-transform">
                                    ↓
                                </span>
                            </a>
                        </motion.div>

                        {/* Quick stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="flex gap-8 pt-8 border-t border-accent/10"
                        >
                            {[
                                { value: "3+", label: "Years Experience" },
                                { value: "Odoo", label: "ERP Specialist" },
                                { value: "AI", label: "Driven Workflows" },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-2xl font-display font-bold text-accent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-text-muted">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Visual element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Abstract visual representation */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 border border-accent/20 rounded-full"
                                        style={{
                                            transform: `rotate(${i * 60}deg) scale(${1 - i * 0.15})`,
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Center content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(212, 168, 83, 0)",
                                            "0 0 0 20px rgba(212, 168, 83, 0)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/30"
                                >
                                    <span className="text-4xl font-display font-bold text-accent">
                                        AD
                                    </span>
                                </motion.div>
                            </div>

                            {/* Floating labels */}
                            {[
                                { label: "Accounting", angle: 45, distance: 180 },
                                { label: "Odoo ERP", angle: 135, distance: 160 },
                                { label: "Automation", angle: 225, distance: 170 },
                                { label: "AI Tools", angle: 315, distance: 150 },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 + i * 0.2 }}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        transform: `
                      translate(-50%, -50%)
                      rotate(${item.angle}deg)
                      translateX(${item.distance}px)
                      rotate(-${item.angle}deg)
                    `,
                                    }}
                                >
                                    <div className="px-3 py-1.5 bg-bg-light/80 backdrop-blur-sm rounded-full border border-accent/20 text-xs text-text-muted whitespace-nowrap">
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <ScrollIndicator />
        </section>
    );
}
