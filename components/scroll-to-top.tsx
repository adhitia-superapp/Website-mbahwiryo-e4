"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollToTop } = useSmoothScroll()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleScrollToTop = () => {
    scrollToTop({
      duration: 800,
      easing: "easeOut",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </Button>
  )
}
