'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import React, { useEffect, useState, useCallback } from 'react'

// Animation variants with more refined, subtle effects
const PAGE_VARIANTS = {
    // Different transition types for more flexibility
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },
    slide: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    },
    scale: {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 }
    },
    fadeSlideUp: {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 }
    },
    slideLeft: {
        initial: { opacity: 0, x: 10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 }
    },
    slideRight: {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 10 }
    }
}

// Transition presets for different needs
const TRANSITIONS = {
    snappy: {
        duration: 0.2,
        ease: [0.33, 1, 0.68, 1]
    },
    smooth: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
    },
    gentle: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
    },
    bounce: {
        type: "spring",
        stiffness: 300,
        damping: 20
    }
}

export type TransitionType = keyof typeof PAGE_VARIANTS
export type TransitionPreset = keyof typeof TRANSITIONS

export interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
    transitionKey?: string; // Optional override for animation key
    mode?: "wait" | "sync" | "popLayout"; // Animation mode
    type?: TransitionType; // Animation type from variants
    transition?: TransitionPreset | Record<string, any>; // Transition preset or custom config
    onAnimationComplete?: () => void; // Callback when animation completes
    resetScroll?: boolean; // Whether to reset scroll on page change
    layoutId?: string; // Optional layoutId for shared element transitions
}

/**
 * PageTransition - Enhanced page transitions with configurable animations and accessibility features
 *
 * @param children - Content to be animated
 * @param className - Additional CSS classes to apply
 * @param transitionKey - Optional key to control animation timing
 * @param mode - AnimatePresence mode (defaults to "wait")
 * @param type - Animation type from predefined variants
 * @param transition - Transition preset or custom configuration
 * @param onAnimationComplete - Callback function for animation completion
 * @param resetScroll - Whether to reset scroll on page change (defaults to true)
 * @param layoutId - Optional layoutId for shared element transitions
 */
const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    className = "",
    transitionKey,
    mode = "wait",
    type = "fadeSlideUp",
    transition = "smooth",
    onAnimationComplete,
    resetScroll = true,
    layoutId
}) => {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true)

    // Create the animation key
    const animationKey = transitionKey || pathname

    // Get the appropriate transition settings
    const transitionSettings = typeof transition === 'string'
        ? TRANSITIONS[transition as TransitionPreset]
        : transition

    // Get the appropriate variants
    const selectedVariants = PAGE_VARIANTS[type]

    // Handle scroll restoration on page change if enabled
    useEffect(() => {
        if (resetScroll) {
            window.scrollTo({ top: 0, behavior: 'auto' })
        }
    }, [pathname, resetScroll])

    // Handle animation completion callback
    const handleAnimationComplete = useCallback(() => {
        if (onAnimationComplete && isVisible) {
            onAnimationComplete()
        }
    }, [onAnimationComplete, isVisible])



    return (
        <MotionConfig>
            <AnimatePresence mode={mode} onExitComplete={() => setIsVisible(true)}>
                <motion.div
                    key={animationKey}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={selectedVariants}
                    transition={transitionSettings}
                    className={`page-transition ${className}`}
                    onAnimationStart={() => setIsVisible(false)}
                    onAnimationComplete={handleAnimationComplete}
                    layoutId={layoutId}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </MotionConfig>
    )
}

export default PageTransition

