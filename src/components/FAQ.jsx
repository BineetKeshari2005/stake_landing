'use client'
import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const FAQS = [
  { q: 'How do I earn returns on my investment?', a: 'You earn in two ways: rental income distributions paid monthly to your wallet, and capital appreciation when the property value rises. Both are proportional to your token holdings.' },
  { q: 'What is the minimum investment amount?', a: 'You can start investing with as little as $150 per token. Each token represents a fractional equity share in a real property asset.' },
  { q: 'Is my investment safe and regulated?', a: 'Yes. Stake is regulated by the Dubai Financial Services Authority (DFSA). All properties are legally structured, fully insured, and held in dedicated SPVs (Special Purpose Vehicles) for investor protection.' },
  { q: 'Can I sell my tokens anytime?', a: 'Yes. Tokens are tradeable on our secondary marketplace. Liquidity depends on market demand, but our platform actively matches buyers and sellers 24/7.' },
  { q: 'How are properties selected?', a: 'Our expert team evaluates hundreds of properties monthly. Only those meeting strict criteria — projected yield above 8%, premium location, strong rental demand — are listed on the platform.' },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useInView()

  return (
    <div ref={ref} style={{
      borderBottom: '1px solid var(--border)',
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity .6s ${index * 0.08}s ease, transform .6s ${index * 0.08}s ease`,
    }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
        <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '1rem', fontWeight: 600, color: open ? 'var(--orange)' : '#fff', transition: 'color .25s', lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${open ? 'var(--orange)' : 'var(--border)'}`, background: open ? 'rgba(249,115,22,.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem', color: open ? 'var(--orange)' : 'var(--muted)', transition: 'all .3s', transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>

      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height .4s cubic-bezier(.22,1,.36,1)' }}>
        <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.75, paddingBottom: '1.2rem' }}>{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { ref: headRef, inView: headInView } = useInView()

  return (
    <section style={{ width: '100%', maxWidth: 720, margin: '5rem auto 0', padding: '0 4% 5rem' }}>
      <div ref={headRef} style={{ textAlign: 'center', marginBottom: '2.5rem', opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.25)', borderRadius: 50, padding: '6px 16px', fontSize: '.76rem', fontWeight: 600, color: 'var(--orange)', marginBottom: '1rem', letterSpacing: '.05em', textTransform: 'uppercase' }}>
          Got Questions?
        </div>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em' }}>
          Frequently asked{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--orange),#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>questions</span>
        </h2>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '0 2rem' }}>
        {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
      </div>
    </section>
  )
}
