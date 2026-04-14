'use client'
import { useState, useCallback } from 'react'

let _addToast = null

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((icon, title, msg) => {
    const id = Date.now()
    setToasts(t => [...t, { id, icon, title, msg, exiting: false }])
    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x))
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320)
    }, 3800)
  }, [])

  return { toasts, addToast }
}

export function ToastContainer({ toasts }) {
  return (
    <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, display:'flex', flexDirection:'column', gap:10, pointerEvents:'none' }}>
      {toasts.map(t => (
        <div key={t.id} className={t.exiting ? 'toast-exit' : 'toast-enter'}
          style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderLeft:'3px solid var(--orange)', borderRadius:12, padding:'14px 18px', minWidth:250, maxWidth:310, boxShadow:'0 12px 40px rgba(0,0,0,.5)', display:'flex', gap:12, alignItems:'flex-start', pointerEvents:'auto' }}>
          <div style={{ width:32, height:32, background:'rgba(249,115,22,.15)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:15 }}>{t.icon}</div>
          <div>
            <div style={{ fontWeight:700, fontSize:'.84rem', marginBottom:3 }}>{t.title}</div>
            <div style={{ fontSize:'.76rem', color:'var(--muted)', lineHeight:1.45 }}>{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
