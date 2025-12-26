"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Navigation,
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ContactSection,
  LoadingSkeleton,
} from "@/components";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
} as const;

// Section transition wrapper
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate initial load and ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Mark as ready after a small delay
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-bg"
        >
          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main>
            {/* Hero Section */}
            <Section>
              <HeroSection />
            </Section>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="divider" />
            </div>

            {/* About Section */}
            <Section>
              <AboutSection />
            </Section>

            {/* Skills Section */}
            <Section>
              <SkillsSection />
            </Section>

            {/* Experience Section */}
            <Section>
              <ExperienceSection />
            </Section>

            {/* Contact Section */}
            <Section>
              <ContactSection />
            </Section>
          </main>

          {/* Smooth scroll indicator at bottom */}
          {isReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="fixed bottom-6 right-6 z-40"
            >
              <motion.button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-bg transition-colors duration-300"
                aria-label="Scroll to top"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
