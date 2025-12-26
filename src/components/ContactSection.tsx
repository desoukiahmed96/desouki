"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/lib/data";

// Animated underline link
function AnimatedLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="relative inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors group"
        >
            <span className="relative">
                {children}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-light group-hover:w-full transition-all duration-300" />
            </span>
            <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                →
            </motion.span>
        </a>
    );
}

// Contact method card
function ContactMethod({
    icon,
    label,
    value,
    href,
    index,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    index: number;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.a
            ref={ref}
            href={href}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group flex items-center gap-4 p-5 rounded-xl bg-bg-light/50 border border-accent/10 hover:border-accent/30 transition-all duration-300 card-glow"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg transition-colors duration-300">
                {icon}
            </div>
            <div>
                <div className="text-sm text-text-muted">{label}</div>
                <div className="text-text font-medium group-hover:text-accent transition-colors">
                    {value}
                </div>
            </div>
        </motion.a>
    );
}

export function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    const [isCopied, setIsCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(portfolioData.personal.email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className="section-padding relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-bg to-bg" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        Connect
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-6"
                    >
                        {portfolioData.cta.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-text-muted max-w-2xl mx-auto"
                    >
                        {portfolioData.cta.subheadline}
                    </motion.p>
                </div>

                {/* Contact grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    <ContactMethod
                        icon={
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        }
                        label="Email"
                        value={portfolioData.personal.email}
                        href={`mailto:${portfolioData.personal.email}`}
                        index={0}
                    />
                    <ContactMethod
                        icon={
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        }
                        label="Phone"
                        value={portfolioData.personal.phone}
                        href={`tel:${portfolioData.personal.phone.replace(/\s/g, "")}`}
                        index={1}
                    />
                    <ContactMethod
                        icon={
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        }
                        label="Location"
                        value={portfolioData.personal.location}
                        href="#"
                        index={2}
                    />
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={copyEmail}
                        className="group flex items-center gap-4 p-5 rounded-xl bg-bg-light/50 border border-accent/10 hover:border-accent/30 transition-all duration-300 card-glow text-left"
                    >
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg transition-colors duration-300">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-text-muted">Quick Action</div>
                            <div className="text-text font-medium group-hover:text-accent transition-colors">
                                {isCopied ? "Copied!" : "Copy Email"}
                            </div>
                        </div>
                    </motion.button>
                </div>

                {/* Primary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                >
                    <a
                        href={`mailto:${portfolioData.personal.email}?subject=Let's%20Connect`}
                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-accent text-bg text-lg font-semibold rounded-xl overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Send Me a Message</span>
                        <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                        <div className="absolute inset-0 bg-accent-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
                className="relative z-10 mt-24 pt-8 border-t border-accent/10"
            >
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-display font-bold text-text">
                                De<span className="text-accent">.</span>
                            </span>
                            <span className="text-text-muted text-sm">
                                © {new Date().getFullYear()} {portfolioData.personal.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <AnimatedLink href="#hero">Back to Top</AnimatedLink>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </section>
    );
}
