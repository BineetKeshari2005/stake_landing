'use client'
import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const glow = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)

    const loop = () => {
      glow.current.x += (mouse.current.x - glow.current.x) * 0.055
      glow.current.y += (mouse.current.y - glow.current.y) * 0.055
      if (glowRef.current) {
        glowRef.current.style.left = glow.current.x + 'px'
        glowRef.current.style.top  = glow.current.y + 'px'
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { dotRef, glowRef, hovered, setHovered }
}
