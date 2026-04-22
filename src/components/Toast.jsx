import { useEffect, useState } from 'react'

const EVENT = 'kongestia-toast'

export function showToast(msg, type = 'info') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, {
    detail: { msg, type, id: Date.now() + Math.random() }
  }))
}

export function Toaster() {
  const [current, setCurrent] = useState(null)
  useEffect(() => {
    let hideTimer
    function onToast(e) {
      const { msg, id } = e.detail
      setCurrent({ msg, id, show: false })
      requestAnimationFrame(() => setCurrent(c => c && c.id === id ? { ...c, show: true } : c))
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setCurrent(c => c && c.id === id ? null : c), 3200)
    }
    window.addEventListener(EVENT, onToast)
    return () => { window.removeEventListener(EVENT, onToast); clearTimeout(hideTimer) }
  }, [])
  if (!current) return null
  return (
    <div className={`action-toast${current.show ? ' show' : ''}`}>
      <span className="toast-icon">⚡</span>
      <span dangerouslySetInnerHTML={{ __html: current.msg }} />
    </div>
  )
}
