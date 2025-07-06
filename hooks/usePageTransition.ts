// hooks/usePageTransition.ts
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'

export function usePageTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const previousPathname = useRef(pathname)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstRender = useRef(true)

  // Clear any existing timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Handle route changes
  useEffect(() => {
    // Skip transition on first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      previousPathname.current = pathname
      return
    }

    // Only transition when pathname actually changes
    if (pathname !== previousPathname.current) {
      clearTimeouts()

      setIsTransitioning(true)
      setIsLoading(true)

      // Reset states after transition
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setIsLoading(false)
      }, 500) // Slightly longer than CSS transition

      previousPathname.current = pathname
    }
  }, [pathname, clearTimeouts])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeouts()
    }
  }, [clearTimeouts])

  return {
    isTransitioning,
    isLoading,
    pathname,
    previousPathname: previousPathname.current
  }
}