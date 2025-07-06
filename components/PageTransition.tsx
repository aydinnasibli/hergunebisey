// components/PageTransition.tsx
'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState, useRef } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true)
    const [displayChildren, setDisplayChildren] = useState(children)
    const previousPathname = useRef(pathname)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        // Skip transition on first render
        if (isFirstRender.current) {
            isFirstRender.current = false
            previousPathname.current = pathname
            setDisplayChildren(children)
            return
        }

        // Only transition when pathname changes
        if (pathname !== previousPathname.current) {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            // Start exit animation
            setIsVisible(false)

            // Update content and start enter animation
            timeoutRef.current = setTimeout(() => {
                setDisplayChildren(children)
                setIsVisible(true)
            }, 200) // Half of transition duration

            previousPathname.current = pathname
        } else if (children !== displayChildren) {
            // Handle content changes without route changes
            setDisplayChildren(children)
        }
    }, [pathname, children, displayChildren])

    // Cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <div
            className={`
        transition-all duration-400 ease-out
        ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1'
                }
      `}
            style={{
                willChange: 'opacity, transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitPerspective: 1000,
            }}
        >
            {displayChildren}
        </div>
    )
}