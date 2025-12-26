"use client";

import { motion } from "framer-motion";

function SkeletonBlock({
    className = "",
    delay = 0,
}: {
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className={`shimmer rounded-lg ${className}`}
        />
    );
}

export function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-bg">
            {/* Navigation skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-bg/80 backdrop-blur-xl border-b border-accent/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
                    <SkeletonBlock className="w-12 h-8" />
                    <div className="hidden md:flex gap-4">
                        {[...Array(5)].map((_, i) => (
                            <SkeletonBlock key={i} className="w-16 h-6" delay={i * 0.05} />
                        ))}
                    </div>
                    <SkeletonBlock className="w-8 h-8 md:hidden" />
                </div>
            </div>

            {/* Hero skeleton */}
            <div className="min-h-screen flex items-center pt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <SkeletonBlock className="w-48 h-10 rounded-full" delay={0.1} />
                            <div className="space-y-4">
                                <SkeletonBlock className="w-full h-16 lg:h-24" delay={0.2} />
                                <SkeletonBlock className="w-4/5 h-16 lg:h-24" delay={0.3} />
                                <SkeletonBlock className="w-3/4 h-16 lg:h-24" delay={0.4} />
                            </div>
                            <SkeletonBlock className="w-full h-20" delay={0.5} />
                            <div className="flex gap-4">
                                <SkeletonBlock className="w-40 h-14 rounded-lg" delay={0.6} />
                                <SkeletonBlock className="w-40 h-14 rounded-lg" delay={0.7} />
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center justify-center">
                            <SkeletonBlock className="w-80 h-80 rounded-full" delay={0.3} />
                        </div>
                    </div>
                </div>
            </div>

            {/* About skeleton */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <SkeletonBlock className="w-24 h-6 mb-4" />
                        <SkeletonBlock className="w-72 h-12" />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonBlock key={i} className="w-full h-24" delay={i * 0.1} />
                            ))}
                        </div>
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <SkeletonBlock key={i} className="w-full h-16" delay={i * 0.05} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills skeleton */}
            <div className="py-24 bg-bg-light/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <SkeletonBlock className="w-24 h-6 mx-auto mb-4" />
                        <SkeletonBlock className="w-64 h-12 mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <SkeletonBlock key={i} className="w-full h-80 rounded-2xl" delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
