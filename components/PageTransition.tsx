'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'

// Define transition variants for more complex animations
const variants = {
    initial: {
        opacity: 0,
        y: 8,
        scale: 0.98
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.98
    }
}

// Define transition settings
const transition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1]
}

export interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
    disableTransition?: boolean;
    transitionKey?: string; // Optional override for animation key
    mode?: "wait" | "sync" | "popLayout"; // Animation mode
}

/**
 * PageTransition - Provides smooth page transitions with configurable animation
 * 
 * @param children - Content to be animated
 * @param className - Additional CSS classes to apply
 * @param disableTransition - Option to disable animations (for accessibility)
 * @param transitionKey - Optional key to control animation timing
 * @param mode - AnimatePresence mode (defaults to "wait")
 */
const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    className = "",
    disableTransition = false,
    transitionKey,
    mode = "wait"
}) => {
    const pathname = usePathname()
    const animationKey = transitionKey || pathname

    // Handle scroll restoration on page change
    useEffect(() => {
        // Scroll to top when pathname changes
        window.scrollTo(0, 0)
    }, [pathname])

    // Skip animations if disabled
    if (disableTransition) {
        return <div className={`w-full ${className}`}>{children}</div>
    }

    return (
        <AnimatePresence mode={mode}>
            <motion.div
                key={animationKey}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={transition}
                className={`w-full ${className}`}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition