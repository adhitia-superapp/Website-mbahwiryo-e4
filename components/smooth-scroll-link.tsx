"use client"

import type React from "react"

import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import type { SmoothScrollOptions } from "@/lib/smooth-scroll"

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  scrollOptions?: SmoothScrollOptions
}

export default function SmoothScrollLink({ href, children, className = "", scrollOptions }: SmoothScrollLinkProps) {
  const { scrollToSection } = useSmoothScroll()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(href, scrollOptions)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
