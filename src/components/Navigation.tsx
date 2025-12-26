"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isScrolled, setIsScrolled] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Handle scroll for background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle active section detection
    useEffect(() => {
        const sections = navItems.map((item) => item.href.replace("#", ""));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -60% 0px" }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Update indicator position
    useEffect(() => {
        const updateIndicator = () => {
            const activeLink = document.querySelector(
                `[data-nav="${activeSection}"]`
            ) as HTMLElement;
            if (activeLink) {
                setIndicatorStyle({
                    left: activeLink.offsetLeft,
                    width: activeLink.offsetWidth,
                });
            }
        };

        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [activeSection]);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "bg-bg/90 backdrop-blur-xl border-b border-accent/10"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <motion.a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, "#hero")}
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-2xl font-display font-bold text-text">
                                De<span className="text-accent">.</span>
                            </span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1 relative">
                            {/* Magic Indicator */}
                            <motion.div
                                className="absolute bottom-0 h-[2px] bg-accent rounded-full"
                                animate={{
                                    left: indicatorStyle.left,
                                    width: indicatorStyle.width,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    data-nav={item.href.replace("#", "")}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === item.href.replace("#", "")
                                            ? "text-accent"
                                            : "text-text-muted hover:text-text"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text-muted hover:text-accent transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? 45 : 0,
                                        y: mobileMenuOpen ? 9 : 0,
                                    }}
                                    className="w-full h-[2px] bg-current origin-left"
                                />
                                <motion.span
                                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                                    className="w-full h-[2px] bg-current"
                                />
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? -45 : 0,
                                        y: mobileMenuOpen ? -9 : 0,
                                    }}
                                    className="w-full h-[2px] bg-current origin-left"
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{
                        height: mobileMenuOpen ? "auto" : 0,
                        opacity: mobileMenuOpen ? 1 : 0,
                    }}
                    className="md:hidden overflow-hidden bg-bg-light/95 backdrop-blur-xl border-t border-accent/10"
                >
                    <div className="px-6 py-4 space-y-2">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                    x: mobileMenuOpen ? 0 : -20,
                                    opacity: mobileMenuOpen ? 1 : 0,
                                }}
                                transition={{ delay: index * 0.1 }}
                                className={`block py-3 text-lg font-medium ${activeSection === item.href.replace("#", "")
                                        ? "text-accent"
                                        : "text-text-muted"
                                    }`}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.nav>
        </>
    );
}
