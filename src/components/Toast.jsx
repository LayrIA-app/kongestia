import { useEffect, useState } from 'react'

const EVENT = 'kongestia-toast'

export function showToast(msg, type = 'info') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, {
    detail: { msg, type, id: Date.now() + Math.random() }
  }))
}

const colorOf = (t) => ({ ok:'#1a9e4a', info:'#1A78FF', warn:'#e8a010', error:'#e03030' }[t] || '#1A78FF')

export function Toaster() {
  const [toasts, setToasts] = useState([])
  useEffect(() => {
    function onToast(e) {
      const { msg, type, id } = e.detail
      setToasts(prev => [...prev, { msg, type, id }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
    }
    window.addEventListener(EVENT, onToast)
    return () => window.removeEventListener(EVENT, onToast)
  }, [])
  if (!toasts.length) return null
  return (
    <div style={{position:'fixed',left:'50%',bottom:28,transform:'translateX(-50%)',
      zIndex:10000,display:'flex',flexDirection:'column',gap:8,alignItems:'center',
      pointerEvents:'none',width:'calc(100vw - 32px)'}}>
      {toasts.map(t => (
        <div key={t.id} style={{background:'#071830',color:'#fff',borderRadius:10,
          padding:'10px 18px',boxShadow:'0 8px 24px rgba(7,24,48,.35)',fontSize:'.78rem',
          display:'flex',alignItems:'center',gap:10,pointerEvents:'auto',
          maxWidth:'100%',textAlign:'center',lineHeight:1.4,
          border:'1px solid rgba(26,120,255,.3)'}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:colorOf(t.type),flexShrink:0}}/>
          <span style={{fontWeight:600}}>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
