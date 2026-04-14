'use client'
import { useEffect, useState } from 'react'

const links = ['Properties', 'Digital Assets', 'Stake & Earn']

export default function Navbar({ onSignUp }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5%', height: 66,
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'rgba(10,14,26,0)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,.35)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background .4s, border-color .4s, box-shadow .4s',
        }}
      >
        {/* LOGO */}
        <a href="#" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        {/* Icon mark */}
        <div style={{ position:'relative', width:34, height:34, flexShrink:0 }}>
          {/* outer ring */}
          <div style={{ position:'absolute', inset:0, borderRadius:10, background:'linear-gradient(135deg, #F97316, #EA580C)', boxShadow:'0 0 16px rgba(249,115,22,.5), inset 0 1px 0 rgba(255,255,255,.2)' }} />
          {/* inner S shape */}
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 5.5C13 4.1 11.9 3 10.5 3H7C5.3 3 4 4.3 4 6C4 7.7 5.3 9 7 9H11C12.7 9 14 10.3 14 12C14 13.7 12.7 15 11 15H7.5C6.1 15 5 13.9 5 12.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {/* shine dot */}
          <div style={{ position:'absolute', top:5, right:5, width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,.6)' }} />
        </div>

        {/* Wordmark */}
        <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.15rem', color:'#fff', letterSpacing:'-.02em' }}>
            Sta<span style={{ color:'var(--orange)' }}>ke</span>
          </span>
          <span style={{ fontSize:'.5rem', fontWeight:600, color:'rgba(255,255,255,.4)', letterSpacing:'.12em', textTransform:'uppercase', marginTop:1 }}>
            Property
          </span>
        </div>
      </a>

        {/* DESKTOP LINKS */}
        <ul style={{ display:'flex', alignItems:'center', gap:'2rem', listStyle:'none', margin:0 }} className="hide-mobile">
          {links.map(l => (
            <li key={l}>
              <a href="#" className="nav-link-underline" style={{ color:'var(--muted)', textDecoration:'none', fontSize:'.875rem', fontWeight:500, transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>{l}</a>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <button className="hide-mobile" style={{ background:'none', border:'none', cursor:'none', color:'var(--muted)', fontSize:'.875rem', fontFamily:'inherit', fontWeight:500, transition:'color .2s' }}
            onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>Login</button>
          <button onClick={onSignUp} style={{ background:'var(--orange)', border:'none', cursor:'none', color:'#fff', fontSize:'.875rem', fontFamily:'inherit', fontWeight:600, borderRadius:50, padding:'10px 22px', transition:'background .2s, transform .15s, box-shadow .2s' }}
            onMouseEnter={e=>{e.target.style.background='var(--orange-dark)';e.target.style.transform='translateY(-1px)';e.target.style.boxShadow='0 6px 24px var(--orange-glow)'}}
            onMouseLeave={e=>{e.target.style.background='var(--orange)';e.target.style.transform='none';e.target.style.boxShadow='none'}}>
            Sign Up
          </button>
          {/* BURGER */}
          <button className="show-mobile" onClick={() => setMenuOpen(o=>!o)}
            style={{ display:'none', flexDirection:'column', gap:5, background:'none', border:'none', cursor:'pointer', padding:4 }}
            id="burger-btn">
            {[0,1,2].map(i=>(
              <span key={i} style={{ display:'block', width:22, height:2, background:'#fff', borderRadius:2,
                transform: menuOpen ? (i===0?'translateY(7px) rotate(45deg)':i===2?'translateY(-7px) rotate(-45deg)':'none'):'none',
                opacity: menuOpen && i===1 ? 0 : 1,
                transition:'transform .3s, opacity .3s' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ display:'flex', position:'fixed', top:66, left:0, right:0, background:'rgba(10,14,26,.97)', backdropFilter:'blur(20px)', padding:'1.5rem 5%', flexDirection:'column', gap:'1.2rem', zIndex:199, borderBottom:'1px solid var(--border)' }}>
          {links.map(l=><a key={l} href="#" style={{ color:'var(--muted)', textDecoration:'none', fontSize:'1rem', fontWeight:500 }}>{l}</a>)}
          <a href="#" style={{ color:'var(--muted)', textDecoration:'none', fontSize:'1rem', fontWeight:500 }}>Login</a>
          <button onClick={onSignUp} style={{ width:'fit-content', background:'var(--orange)', border:'none', cursor:'pointer', color:'#fff', fontSize:'.875rem', fontFamily:'inherit', fontWeight:600, borderRadius:50, padding:'10px 22px' }}>Sign Up</button>
        </div>
      )}

      <style>{`
        @media(max-width:950px){.hide-mobile{display:none!important}}
        @media(max-width:950px){#burger-btn{display:flex!important}}
      `}</style>
    </>
  )
}
