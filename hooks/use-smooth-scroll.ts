"use client"

import { useCallback } from "react"
import { smoothScrollTo, type SmoothScrollOptions } from "@/lib/smooth-scroll"

export function useSmoothScroll() {
  const scrollToSection = useCallback((targetId: string, options?: SmoothScrollOptions) => {
    // Remove hash if present
    const cleanId = targetId.replace("#", "")
    smoothScrollTo(cleanId, options)
  }, [])

  const scrollToTop = useCallback((options?: Omit<SmoothScrollOptions, "offset">) => {
    const startPosition = window.pageYOffset
    const duration = options?.duration || 600
    const easing = options?.easing || "easeOut"
    let startTime: number | null = null

    const easingFunctions = {
      linear: (t: number) => t,
      easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      easeIn: (t: number) => t * t,
      easeOut: (t: number) => t * (2 - t),
      bounce: (t: number) => {
        const n1 = 7.5625
        const d1 = 2.75
        if (t < 1 / d1) {
          return n1 * t * t
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375
        }
      },
    }

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      const easedProgress = easingFunctions[easing](progress)
      const currentPosition = startPosition * (1 - easedProgress)

      window.scrollTo(0, currentPosition)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }, [])

  return { scrollToSection, scrollToTop }
}
