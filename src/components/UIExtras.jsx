'use client'
import { useEffect, useState } from 'react'

// ── ANIMATED MESH BACKGROUND ──
export function MeshBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* orb 1 — orange top left */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 70%)', top: '-10%', left: '-10%', animation: 'orbFloat1 12s ease-in-out infinite' }} />
      {/* orb 2 — blue/teal top right */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.05) 0%,transparent 70%)', top: '5%', right: '-5%', animation: 'orbFloat2 15s ease-in-out infinite' }} />
      {/* orb 3 — orange bottom right */}
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,0.05) 0%,transparent 70%)', bottom: '-20%', right: '10%', animation: 'orbFloat3 18s ease-in-out infinite' }} />
      {/* orb 4 — purple bottom left */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 70%)', bottom: '10%', left: '5%', animation: 'orbFloat1 20s ease-in-out infinite reverse' }} />

      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-40px) scale(1.05); }
          66%      { transform: translate(-20px,20px) scale(.97); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-40px,30px) scale(1.08); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(20px,-30px) scale(1.03); }
          80%      { transform: translate(-30px,10px) scale(.95); }
        }
      `}</style>
    </div>
  )
}

// ── STICKY MOBILE CTA ──
export function StickyCTA({ onInvest }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
        background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        transform: show ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
      }} className="sticky-cta-mobile">
        <div>
          <div style={{ fontSize: '.78rem', fontWeight: 700, color: '#fff' }}>🏠 Batch 4 Active</div>
          <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>78% filled — limited tokens left</div>
        </div>
        <button onClick={onInvest} style={{ background: 'var(--orange)', border: 'none', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '.85rem', borderRadius: 50, padding: '11px 22px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Invest Now →
        </button>
      </div>
      {/* only show on mobile */}
      <style>{`@media(min-width:768px){ .sticky-cta-mobile{ display:none!important } }`}</style>
    </>
  )
}
