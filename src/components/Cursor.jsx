'use client'
import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { dotRef, glowRef, hovered, setHovered } = useCursor()

  return (
    <>
      <div ref={dotRef} className={`cursor-dot${hovered ? ' hovered' : ''}`} />
      <div ref={glowRef} className="cursor-glow" />
      <style>{`@media(max-width:600px){.cursor-dot,.cursor-glow{display:none!important}}`}</style>
    </>
  )
}
