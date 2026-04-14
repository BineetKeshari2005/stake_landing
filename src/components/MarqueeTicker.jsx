'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'

const PROPERTIES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
    piece1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80',
    piece2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&q=80',
    bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    piece1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80',
    piece2: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&q=80',
    bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85',
    piece1: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&q=80',
    piece2: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80',
    bg: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=80',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
    piece1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80',
    piece2: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80',
    bg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80',
  },
]

export default function HeroSection({ onCTA }) {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const cardRef = useRef(null)
  const timerRef = useRef(null)
  const p = PROPERTIES[active]

  const { ref: returnsRef, inView: returnsInView } = useInView()
  const aedValue = useCounter(165000, { duration: 2200, start: returnsInView })
  const pctValue = useCounter(111, { duration: 1800, start: returnsInView })

  const goTo = useCallback((idx) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setActive(idx)
      setTransitioning(false)
    }, 400)
  }, [transitioning])

  const next = useCallback(() => goTo((active + 1) % PROPERTIES.length), [active, goTo])
  const prev = useCallback(() => goTo((active - 1 + PROPERTIES.length) % PROPERTIES.length), [active, goTo])

  // ← 5000ms = 5 seconds gap between auto slides
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  // 3D tilt
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12
      const y = -((e.clientY - r.top) / r.height - 0.5) * 7
      card.style.transition = 'transform .08s ease'
      card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale(1.015)`
    }
    const onLeave = () => {
      card.style.transition = 'transform .7s ease'
      card.style.transform = 'perspective(1200px) rotateY(0) rotateX(0) scale(1)'
      startTimer()
    }
    const onEnter = () => clearInterval(timerRef.current)
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mouseenter', onEnter)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      card.removeEventListener('mouseenter', onEnter)
    }
  }, [startTimer])

  return (
    <section style={{
      position: 'relative',
      paddingTop: 66,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    }}>

      {/* BACKGROUND — inside section so it scrolls away naturally */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {PROPERTIES.map((prop, i) => (
          <div key={prop.id} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${prop.bg}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(.42) saturate(.65)',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.2s ease', // smooth bg crossfade
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,14,26,.4) 0%, rgba(10,14,26,.02) 30%, rgba(10,14,26,.65) 72%, rgba(10,14,26,1) 100%)',
        }} />
      </div>

      {/* HERO TEXT */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '5rem 4% 2.5rem', maxWidth: 820, width: '100%' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.28)',
          borderRadius: 50, padding: '6px 18px',
          fontSize: '.76rem', fontWeight: 600, color: 'var(--orange)',
          marginBottom: '1.5rem', letterSpacing: '.05em', textTransform: 'uppercase',
          animation: 'fadeUp .7s .1s ease both',
        }}>
          <span style={{ width: 7, height: 7, background: 'var(--orange)', borderRadius: '50%', display: 'inline-block', flexShrink: 0, animation: 'pulseDot 1.6s ease-in-out infinite' }} />
          CEG Equity Token — Batch 4 Active
        </div>

        <h1 style={{
          fontFamily: 'Syne,sans-serif',
          fontSize: 'clamp(2.6rem,5.8vw,4.2rem)',
          fontWeight: 800, lineHeight: 1.07, letterSpacing: '-.03em',
          marginBottom: '1.2rem',
          animation: 'fadeUp .75s .25s ease both',
        }}>
          Discover{' '}
          <span style={{ color: 'var(--orange)', position: 'relative' }}>
            high-growth
            <span style={{ position: 'absolute', bottom: 2, left: 0, right: 0, height: 3, background: 'var(--orange)', borderRadius: 2, opacity: .3 }} />
          </span>
          <br />property investments
        </h1>

        <p style={{
          color: 'var(--muted)', fontSize: 'clamp(.95rem,2vw,1.08rem)',
          maxWidth: 480, margin: '0 auto 2.2rem', lineHeight: 1.75,
          animation: 'fadeUp .75s .4s ease both',
        }}>
          Join the CEG Equity Token batch. Start building your portfolio with
          fractional ownership of global assets.
        </p>

        <button onClick={onCTA} style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--orange)', color: '#fff', fontFamily: 'inherit',
          fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: 50,
          padding: '15px 36px', cursor: 'pointer',
          transition: 'background .2s, transform .15s, box-shadow .25s',
          animation: 'fadeUp .75s .55s ease both',
        }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'var(--orange-dark)'; b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 10px 36px var(--orange-glow)'; b.querySelector('.arr').style.transform = 'translateX(6px)' }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'var(--orange)'; b.style.transform = 'none'; b.style.boxShadow = 'none'; b.querySelector('.arr').style.transform = 'translateX(0)' }}>
          Start Earning Now
          <span className="arr" style={{ display: 'inline-block', transition: 'transform .22s' }}>→</span>
        </button>
      </div>

      {/* CAROUSEL + RIGHT PANEL */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 1120,
        padding: '0 4%',
        display: 'grid',
        gridTemplateColumns: '1fr 260px',
        gap: '2.5rem',
        alignItems: 'center',
        animation: 'fadeUp .85s .7s ease both',
      }} className="hero-grid">

        {/* TILT CARD */}
        <div ref={cardRef} style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',        // ← clips everything inside including chevrons
          transformStyle: 'preserve-3d',
          boxShadow: '0 28px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.07)',
        }}>

          {/* SLIDES */}
          <div style={{ position: 'relative', aspectRatio: '16/8', width: '100%' }}>
            {PROPERTIES.map((prop, i) => (
              <div key={prop.id} style={{
                position: 'absolute', inset: 0,
                opacity: i === active ? (transitioning ? 0 : 1) : 0,
                transform: i === active ? 'scale(1)' : 'scale(1.03)',
                transition: 'opacity .6s ease, transform .8s ease',
              }}>
                <img
                  src={prop.image}
                  alt="Property"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}

            {/* PUZZLE GRID LINES */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,.1) 79px, rgba(255,255,255,.1) 80px),
                repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,.1) 79px, rgba(255,255,255,.1) 80px)
              `,
            }} />

            {/* VIGNETTE */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.55) 100%)', zIndex: 2, pointerEvents: 'none' }} />

            {/* FLOATING PIECE 1 */}
            <div style={{
              position: 'absolute',
              width: 110, height: 110,
              bottom: '22%', left: '40%',
              zIndex: 10,
              borderRadius: 8,
              border: '2.5px solid rgba(255,255,255,.5)',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,.7)',
              animation: 'floatPiece1 4s ease-in-out infinite',
              transform: 'rotate(-10deg)',
            }}>
              <img src={p.piece1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* FLOATING PIECE 2 */}
            <div style={{
              position: 'absolute',
              width: 78, height: 78,
              bottom: '10%', left: '54%',
              zIndex: 10,
              borderRadius: 6,
              border: '2px solid rgba(255,255,255,.45)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,.65)',
              animation: 'floatPiece2 4.6s ease-in-out infinite',
              transform: 'rotate(7deg)',
            }}>
              <img src={p.piece2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* CHEVRONS — inside card, on the right side */}
            <div style={{
              position: 'absolute',
              right: 24,           // inside the card
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              zIndex: 10,
              animation: 'chevronPulse 1.8s ease-in-out infinite',
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 0, height: 0,
                  borderTop: '28px solid transparent',
                  borderBottom: '28px solid transparent',
                  borderLeft: `24px solid var(--orange)`,
                  opacity: 1 - i * 0.3,
                  filter: i === 0 ? 'drop-shadow(0 0 10px rgba(249,115,22,0.8))' : 'none',
                }} />
              ))}
            </div>

            {/* PREV / NEXT buttons */}
            <button onClick={prev} style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(10,14,26,.7)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.15)', color: '#fff',
              fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .2s, border-color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.borderColor = 'var(--orange)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,14,26,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)' }}>
              ←
            </button>
            <button onClick={next} style={{
              position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(10,14,26,.7)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.15)', color: '#fff',
              fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .2s, border-color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.borderColor = 'var(--orange)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,14,26,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)' }}>
              →
            </button>

            {/* DOTS */}
            <div style={{
              position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 7, zIndex: 10,
            }}>
              {PROPERTIES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === active ? 22 : 7, height: 7,
                  borderRadius: 50, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? 'var(--orange)' : 'rgba(255,255,255,.35)',
                  transition: 'all .35s ease',
                  boxShadow: i === active ? '0 0 8px rgba(249,115,22,.6)' : 'none',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          <h2 style={{
            fontFamily: 'Syne,sans-serif',
            fontSize: 'clamp(1.8rem,3vw,2.4rem)',
            fontWeight: 800, lineHeight: 1.12, color: '#fff',
          }}>
            Access premium<br />property ownership<br />
            for <span style={{ color: 'var(--orange)' }}>$150</span>
          </h2>

          <div ref={returnsRef} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14, padding: '16px 18px',
            display: 'flex', flexDirection: 'column', gap: 6,
            transition: 'box-shadow .5s',
            boxShadow: returnsInView ? '0 0 28px rgba(249,115,22,.13)' : 'none',
          }}>
            <div style={{ fontSize: '.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 15, height: 15, background: 'var(--orange)', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#fff', flexShrink: 0 }}>S</span>
              All Time Returns
            </div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>AED {Math.floor(aedValue).toLocaleString()}</span>
              <span style={{
                fontSize: '.78rem', fontWeight: 700, color: 'var(--green)',
                background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                padding: '3px 10px', borderRadius: 50,
                opacity: returnsInView ? 1 : 0, transition: 'opacity .4s .5s',
              }}>
                +{Math.floor(pctValue)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '3rem' }} />

      <style>{`
        @keyframes fadeUp       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot     { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.6)} 50%{box-shadow:0 0 0 6px rgba(249,115,22,0)} }
        @keyframes floatPiece1  { 0%,100%{transform:rotate(-10deg) translateY(0)} 50%{transform:rotate(-10deg) translateY(-12px)} }
        @keyframes floatPiece2  { 0%,100%{transform:rotate(7deg) translateY(0)}  50%{transform:rotate(7deg) translateY(-9px)} }
        @keyframes chevronPulse { 0%,100%{transform:translateY(-50%) translateX(0)} 50%{transform:translateY(-50%) translateX(8px)} }
        @media(max-width:950px) { .hero-grid{ grid-template-columns:1fr !important } }
      `}</style>
    </section>
  )
}