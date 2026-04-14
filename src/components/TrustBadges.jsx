'use client'
import { useInView } from '../hooks/useInView'

const BADGES = [
  {
    label: 'DFSA Regulated',
    sub: 'Dubai Financial Services Authority',
    accent: '#F97316',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L3 6V11C3 15.4 6.4 19.5 11 20.9C15.6 19.5 19 15.4 19 11V6L11 2Z" stroke="#F97316" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 11L10 13L14 9" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: '256-bit Encryption',
    sub: 'Bank-grade SSL security',
    accent: '#8B5CF6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="5" y="10" width="12" height="9" rx="2" stroke="#8B5CF6" strokeWidth="1.8"/>
        <path d="M8 10V7C8 5.3 9.3 4 11 4C12.7 4 14 5.3 14 7V10" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="11" cy="14.5" r="1.5" fill="#8B5CF6"/>
      </svg>
    ),
  },
  {
    label: 'Forbes Featured',
    sub: 'Top PropTech 2024',
    accent: '#FBBF24',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.2 8.5H19L14.4 11.9L16.2 17.5L11 14L5.8 17.5L7.6 11.9L3 8.5H8.8L11 3Z" stroke="#FBBF24" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'KYC / AML Verified',
    sub: 'Full compliance checks',
    accent: '#22C55E',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke="#22C55E" strokeWidth="1.8"/>
        <path d="M5 19C5 16.2 7.7 14 11 14C14.3 14 17 16.2 17 19" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 6L16.5 7.5L19 5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: '40+ Countries',
    sub: 'Global investor network',
    accent: '#38BDF8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#38BDF8" strokeWidth="1.8"/>
        <path d="M3 11H19M11 3C11 3 8 7 8 11C8 15 11 19 11 19C11 19 14 15 14 11C14 7 11 3 11 3Z" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function TrustBadges() {
  const { ref, inView } = useInView()

  return (
    <div ref={ref} style={{
      width:'100%', maxWidth:1120, margin:'4rem auto 0', padding:'0 4%',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity .7s ease, transform .7s ease',
    }}>

      {/* Section label */}
      <div style={{ textAlign:'center', marginBottom:'1.8rem', display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
        <div style={{ flex:1, height:'1px', background:'linear-gradient(to right, transparent, var(--border))' }} />
        <span style={{ fontSize:'.72rem', fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.12em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Trusted & Regulated</span>
        <div style={{ flex:1, height:'1px', background:'linear-gradient(to left, transparent, var(--border))' }} />
      </div>

      {/* Badges grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:1, borderRadius:16, overflow:'hidden', border:'1px solid var(--border)' }} className="trust-grid">
        {BADGES.map((b, i) => (
          <div key={i}
            style={{
              background:'var(--bg-card)',
              padding:'20px 18px',
              display:'flex', flexDirection:'column', alignItems:'center',
              gap:10, textAlign:'center',
              transition:'background .2s, transform .2s',
              position:'relative', overflow:'hidden',
              cursor:'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(${b.accent === '#F97316' ? '249,115,22' : b.accent === '#8B5CF6' ? '139,92,246' : b.accent === '#FBBF24' ? '251,191,36' : b.accent === '#22C55E' ? '34,197,94' : '56,189,248'},.06)`; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'none' }}>

            {/* Top accent line per badge */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:b.accent, opacity:0.6 }} />

            {/* Icon container */}
            <div style={{ width:44, height:44, borderRadius:12, background:`rgba(${b.accent === '#F97316' ? '249,115,22' : b.accent === '#8B5CF6' ? '139,92,246' : b.accent === '#FBBF24' ? '251,191,36' : b.accent === '#22C55E' ? '34,197,94' : '56,189,248'},.1)`, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${b.accent}22` }}>
              {b.icon}
            </div>

            <div>
              <div style={{ fontSize:'.8rem', fontWeight:700, color:'#fff', marginBottom:3, lineHeight:1.2 }}>{b.label}</div>
              <div style={{ fontSize:'.68rem', color:'var(--muted)', lineHeight:1.4 }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){ .trust-grid{ grid-template-columns:1fr 1fr !important } }
        @media(max-width:480px){ .trust-grid{ grid-template-columns:1fr !important } }
      `}</style>
    </div>
  )
}