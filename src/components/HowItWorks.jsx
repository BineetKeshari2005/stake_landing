'use client'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    number: '01',
    title: 'Browse Properties',
    desc: 'Explore curated high-yield properties across Dubai, London, Bali and more. Filter by location, yield, and token price.',
    color: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
    accent: '#F97316',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="7" stroke="#F97316" strokeWidth="2"/>
        <path d="M17 17L22 22" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 12H15M12 9V15" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Buy Tokens from $150',
    desc: 'Purchase fractional ownership tokens starting at just $150. Each token represents a real equity share in the property.',
    color: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    accent: '#8B5CF6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="3" stroke="#8B5CF6" strokeWidth="2"/>
        <path d="M4 12H24" stroke="#8B5CF6" strokeWidth="2"/>
        <path d="M8 16H12" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="#8B5CF6"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Earn Returns',
    desc: 'Receive rental income distributions and capital gains as your property portfolio grows. Track everything in real time.',
    color: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
    accent: '#22C55E',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 13L14 17L20 9L24 12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 9H24V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function StepCard({ step, index }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      background: 'var(--bg-card)',
      border: `1px solid ${step.border}`,
      borderRadius: 20,
      padding: '2rem 1.8rem',
      position: 'relative',
      overflow: 'hidden',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity .7s ${index * 0.15}s ease, transform .7s ${index * 0.15}s ease`,
    }}>

      {/* Top accent line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${step.accent}, transparent)`, borderRadius:'20px 20px 0 0' }} />

      {/* Number watermark */}
      <div style={{ position:'absolute', top:-14, right:16, fontFamily:'Syne,sans-serif', fontSize:'6rem', fontWeight:800, color:'rgba(255,255,255,.03)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>
        {step.number}
      </div>

      {/* Icon */}
      <div style={{ width:54, height:54, background:step.color, border:`1px solid ${step.border}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.4rem' }}>
        {step.icon}
      </div>

      {/* Step pill */}
      <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginBottom:'.7rem' }}>
        <div style={{ width:18, height:2, background:step.accent, borderRadius:2 }} />
        <span style={{ fontSize:'.68rem', fontWeight:700, color:step.accent, letterSpacing:'.1em', textTransform:'uppercase' }}>Step {step.number}</span>
      </div>

      <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1.15rem', fontWeight:700, marginBottom:'.65rem', color:'#fff', lineHeight:1.3 }}>
        {step.title}
      </h3>
      <p style={{ fontSize:'.875rem', color:'var(--muted)', lineHeight:1.75, margin:0 }}>
        {step.desc}
      </p>

      {/* Connector arrow — hidden on last */}
      {index < STEPS.length - 1 && (
        <div style={{ position:'absolute', right:-20, top:'50%', transform:'translateY(-50%)', zIndex:10, width:40, height:40, borderRadius:'50%', background:'var(--bg-card)', border:'1px solid rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center' }} className="step-connector">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M8 4L11 7L8 10" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  const { ref: headRef, inView: headInView } = useInView()

  return (
    <section style={{ position:'relative', zIndex:1, width:'100%', maxWidth:1120, margin:'5rem auto 0', padding:'0 4%' }}>

      {/* HEADING */}
      <div ref={headRef} style={{ textAlign:'center', marginBottom:'3rem', opacity:headInView?1:0, transform:headInView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>

        <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:'1rem' }}>
          <div style={{ width:32, height:1, background:'linear-gradient(to right, transparent, var(--orange))' }} />
          <span style={{ fontSize:'.72rem', fontWeight:700, color:'var(--orange)', letterSpacing:'.12em', textTransform:'uppercase' }}>How It Works</span>
          <div style={{ width:32, height:1, background:'linear-gradient(to left, transparent, var(--orange))' }} />
        </div>

        <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-.02em', margin:'0 0 .8rem' }}>
          Start investing in {''}
          <span style={{
            background: 'linear-gradient(135deg, #F97316, #FBBF24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block',
          }}>
            3 simple steps
          </span>
        </h2>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:440, margin:'0 auto', lineHeight:1.7 }}>
          No real estate expertise needed. Own premium global property in minutes.
        </p>
      </div>

      {/* STEPS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', position:'relative' }} className="steps-grid">
        {STEPS.map((step, i) => <StepCard key={i} step={step} index={i} />)}
      </div>

      <style>{`
        @media(max-width:768px){ .steps-grid{ grid-template-columns:1fr !important } .step-connector{ display:none } }
      `}</style>
    </section>
  )
}