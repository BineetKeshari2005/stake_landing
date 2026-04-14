'use client'
import { useEffect, useRef, useState } from 'react'

export function useCounter(target, { duration = 1900, decimals = 0, start = false } = {}) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true
    const t0 = performance.now()

    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(parseFloat((target * ease).toFixed(decimals)))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else setValue(target)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, target, duration, decimals])

  return value
}
