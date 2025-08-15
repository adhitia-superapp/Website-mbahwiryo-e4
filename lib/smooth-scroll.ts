// Smooth scroll utility with custom easing and offset
export interface SmoothScrollOptions {
  duration?: number
  offset?: number
  easing?: "linear" | "easeInOut" | "easeIn" | "easeOut" | "bounce"
}

export function smoothScrollTo(targetId: string, options: SmoothScrollOptions = {}): void {
  const {
    duration = 800,
    offset = 80, // Account for fixed header
    easing = "easeInOut",
  } = options

  const target = document.getElementById(targetId.replace("#", ""))
  if (!target) return

  const startPosition = window.pageYOffset
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Easing functions
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
    const currentPosition = startPosition + distance * easedProgress

    window.scrollTo(0, currentPosition)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    } else {
      // Ensure we end up exactly at the target
      window.scrollTo(0, targetPosition)

      // Add fade-in animation to the target section
      target.classList.add("scroll-fade-in")
      setTimeout(() => {
        target.classList.remove("scroll-fade-in")
      }, 600)
    }
  }

  requestAnimationFrame(animation)
}

// Hook for smooth scroll navigation
export function useSmoothScroll() {
  const scrollToSection = (targetId: string, options?: SmoothScrollOptions) => {
    smoothScrollTo(targetId, options)
  }

  const scrollToTop = (options?: Omit<SmoothScrollOptions, "offset">) => {
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
  }

  return { scrollToSection, scrollToTop }
}

// Intersection Observer for scroll animations
export function useScrollAnimation() {
  const observeElements = (selector: string, animationClass = "scroll-fade-in") => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }

  return { observeElements }
}
