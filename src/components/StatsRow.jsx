'use client'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'

function StatCard({ target, prefix='', suffix='', decimals=0, label, delay=0 }) {
  const { ref, inView } = useInView()
  const value = useCounter(target, { decimals, start: inView })

  const display = prefix + (decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) + suffix

  return (
    <div ref={ref}
      style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:10, padding:'16px 20px', textAlign:'center',
        opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity .65s ${delay}s ease, transform .65s ${delay}s ease` }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(249,115,22,.3)';e.currentTarget.style.transform='translateY(-3px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}>
      <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.65rem', fontWeight:800, color:'var(--orange)', lineHeight:1 }}>
        {display}
      </div>
      <div style={{ fontSize:'.76rem', color:'var(--muted)', marginTop:5, fontWeight:500 }}>{label}</div>
    </div>
  )
}

export default function StatsRow() {
  return (
    <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:1120, margin:'1.6rem auto 0', padding:'0 4%',
      display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }} className="stats-grid">
      <StatCard target={12400} suffix="+" label="Active Investors" delay={0} />
      <StatCard target={2.4} prefix="$" suffix="M" decimals={1} label="Returns Paid" delay={0.12} />
      <StatCard target={48} label="Global Properties" delay={0.24} />
      <style>{`@media(max-width:600px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}
