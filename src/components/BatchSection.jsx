'use client'
import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const BATCHES = [
  { label:'Batch 1', price:'$4,000', sold:true,   fill:100, tokens:200 },
  { label:'Batch 2', price:'$4,250', sold:true,   fill:100, tokens:200 },
  { label:'Batch 3', price:'$4,500', sold:true,   fill:100, tokens:200 },
  { label:'Batch 4', price:'$4,750', active:true, fill:78,  tokens:156 },
  { label:'Batch 5', price:'$5,000', sold:false,  fill:0,   tokens:0   },
  { label:'Batch 6', price:'$5,250', sold:false,  fill:0,   tokens:0   },
]

function BatchItem({ batch, isActive, onSelect, onInvest, barsGo }) {
  const isSold = batch.sold && !batch.active
  const barRef = useRef(null)

  useEffect(() => {
    if (barsGo && barRef.current) {
      setTimeout(() => { barRef.current.style.width = batch.fill + '%' }, 400)
    }
  }, [barsGo])

  return (
    <div
      className="batch-item"
      onClick={() => onSelect(batch)}
      style={{
        background: isActive ? 'rgba(249,115,22,.08)' : 'rgba(255,255,255,.03)',
        border: isActive ? '1px solid var(--orange)' : '1px solid var(--border)',
        borderRadius: 11, padding:'14px 16px', cursor:'none',
        transition:'background .2s,border-color .2s,transform .18s',
        position:'relative', overflow:'visible',
      }}
      onMouseEnter={e=>{if(!isActive){e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor='rgba(255,255,255,.18)'}}}
      onMouseLeave={e=>{if(!isActive){e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--border)'}}}
    >
      <div style={{ fontSize:'.72rem', color:'var(--muted)', marginBottom:4, fontWeight:500 }}>{batch.label}</div>
      <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.95rem', fontWeight:700, color: isActive ? 'var(--orange)' : '#fff' }}>{batch.price}</div>
      <div style={{ height:3, background:'rgba(255,255,255,.08)', borderRadius:2, marginTop:8, overflow:'hidden' }}>
        <div ref={barRef} className="batch-bar-fill" />
      </div>

      {/* TOOLTIP */}
      <div className="batch-tooltip">
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.72rem', marginBottom:5 }}>
          <span style={{ color:'var(--muted)' }}>Price</span><span style={{ fontWeight:600 }}>{batch.price}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.72rem', marginBottom:5 }}>
          <span style={{ color:'var(--muted)' }}>Tokens</span><span style={{ fontWeight:600 }}>{batch.tokens}/200</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.72rem', marginBottom:5 }}>
          <span style={{ color:'var(--muted)' }}>Filled</span><span style={{ fontWeight:600 }}>{batch.fill}%</span>
        </div>
        <button
          disabled={isSold}
          onClick={e=>{e.stopPropagation();if(!isSold) onInvest(batch)}}
          style={{ width:'100%', marginTop:8, background:'var(--orange)', border:'none', color:'#fff', fontSize:'.74rem', fontWeight:700, fontFamily:'inherit', borderRadius:50, padding:7, cursor: isSold ? 'not-allowed' : 'pointer', opacity: isSold ? .4 : 1, transition:'background .2s' }}
          onMouseEnter={e=>{if(!isSold) e.target.style.background='var(--orange-dark)'}}
          onMouseLeave={e=>{e.target.style.background='var(--orange)'}}>
          {isSold ? 'Sold Out' : batch.active ? 'Invest Now →' : 'Coming Soon'}
        </button>
        <div className="tooltip-arrow" style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:10, height:6, overflow:'hidden' }} />
      </div>
    </div>
  )
}

export default function BatchSection({ activeIdx, setActiveIdx, showToast }) {
  const { ref, inView } = useInView()

  return (
    <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:1120, margin:'1.6rem auto 0', padding:'0 4% 3.5rem' }}>
      <div ref={ref}
        style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:20, padding:'1.6rem 2rem',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition:'opacity .7s ease, transform .7s ease' }}>

        {/* HEADER */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.4rem', flexWrap:'wrap', gap:'.8rem' }}>
          <span style={{ fontFamily:'Syne,sans-serif', fontSize:'1.05rem', fontWeight:700, color:'var(--orange)' }}>Price Progression (200 Tokens)</span>
          <div style={{ display:'flex', gap:8 }}>
            <span style={{ fontSize:'.7rem', fontWeight:600, padding:'4px 12px', borderRadius:50, background:'rgba(255,255,255,.06)', color:'var(--muted)', border:'1px solid var(--border)', letterSpacing:'.03em' }}>SOLD OUT 1–3</span>
            <span style={{ fontSize:'.7rem', fontWeight:600, padding:'4px 12px', borderRadius:50, background:'var(--green-bg)', color:'var(--green)', border:'1px solid var(--green-border)', letterSpacing:'.03em' }}>ACTIVE 4</span>
          </div>
        </div>

        {/* GRID */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10 }} className="batch-grid-resp">
          {BATCHES.map((b, i) => (
            <BatchItem key={i} batch={b} isActive={activeIdx===i} barsGo={inView}
              onSelect={(batch) => { setActiveIdx(i); showToast('📊','Batch Selected',`${batch.label} — ${batch.sold&&!batch.active?'Sold out':'Available now'} at ${batch.price}`) }}
              onInvest={(batch) => showToast('💰',batch.label+' Selected',`Securing tokens at ${batch.price} each…`)} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:950px){.batch-grid-resp{grid-template-columns:repeat(3,1fr)!important}}
        @media(max-width:600px){.batch-grid-resp{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </div>
  )
}
