
// src/components/PreloadFix.tsx
import { useEffect } from 'react'

export function PreloadFix() {
  useEffect(() => {
    // Remove preload class after a brief delay to prevent animation flash
    const timer = setTimeout(() => {
      document.body.classList.remove('preload')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
