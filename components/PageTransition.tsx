// components/PageTransition.tsx
'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

interface PageTransitionProps {
    children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const pathname = usePathname()

    const variants = {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 20 }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition