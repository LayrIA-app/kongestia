import { useEffect, useState } from 'react'
import { showToast } from './Toast'

const EVENT = 'kongestia-modal'

/* ════ Emisor global ════ */
export function showModal(config) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { ...config, id: Date.now() + Math.random() } }))
}

export function closeModal() {
  window.dispatchEvent(new CustomEvent('kongestia-modal-close'))
}

/* ════ Host que escucha y pinta el modal activo ════ */
export function ActionModalHost() {
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const onOpen = e => setModal(e.detail)
    const onClose = () => setModal(null)
    window.addEventListener(EVENT, onOpen)
    window.addEventListener('kongestia-modal-close', onClose)
    return () => {
      window.removeEventListener(EVENT, onOpen)
      window.removeEventListener('kongestia-modal-close', onClose)
    }
  }, [])

  if (!modal) return null
  return <ModalView {...modal} onClose={() => setModal(null)} />
}

/* ════ Vista ════ */
function ModalView({
  type = 'doc',
  accent = '#1A78FF',
  title,
  subtitle,
  eyebrow,
  badges = [],
  fields = [],
  sections = [],
  editLabel = 'Editar',
  onEdit,
  email,
  whatsapp,
  onClose,
}) {
  const [sendOpen, setSendOpen] = useState(false)

  const doEmail = () => {
    const e = email || {}
    const to = e.to ? encodeURIComponent(e.to) : ''
    const subj = encodeURIComponent(e.subject || title || '')
    const body = encodeURIComponent(e.body || '')
    window.open(`mailto:${to}?subject=${subj}&body=${body}`, '_blank')
    showToast(`Email abierto · destinatario ${e.to || '(elige)'} · asunto prerrellenado`, 'ok')
  }
  const doWhatsApp = () => {
    const w = whatsapp || {}
    const phone = (w.phone || '').replace(/[^\d]/g, '')
    const txt = encodeURIComponent(w.text || '')
    window.open(`https://wa.me/${phone}?text=${txt}`, '_blank')
    showToast(`WhatsApp abierto · ${phone ? '+'+phone : '(elige destinatario)'} · texto prerrellenado`, 'ok')
  }
  const doEdit = () => {
    if (onEdit) onEdit()
    else showToast(`Abriendo editor · ${title}`, 'info')
  }

  return (
    <div className="demo-overlay" onClick={onClose} style={{zIndex:9998}}>
      <div className="am-modal" onClick={e => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <div className="am-head" style={{background:`linear-gradient(135deg,${accent},${darken(accent)})`}}>
          <div className="am-head-icon">{iconFor(type, accent)}</div>
          <div className="am-head-body">
            {eyebrow && <div className="am-eyebrow">{eyebrow}</div>}
            <div className="am-title">{title}</div>
            {subtitle && <div className="am-subtitle">{subtitle}</div>}
            {badges.length > 0 && (
              <div className="am-badges">
                {badges.map((b, i) => <span key={i} className={`badge ${b.cls || 'b-blue'}`}>{b.txt}</span>)}
              </div>
            )}
          </div>
        </div>

        <div className="am-body">
          {fields.length > 0 && (
            <div className="am-fields">
              {fields.map((f, i) => (
                <div key={i} className={`am-field${f.span === 'full' ? ' am-field-full' : ''}`}>
                  <div className="am-field-label">{f.label}</div>
                  <div className="am-field-value" style={f.color ? {color:f.color} : undefined}>{f.value}</div>
                </div>
              ))}
            </div>
          )}

          {sections.map((s, i) => (
            <div key={i} className="am-section">
              <div className="am-section-title">{s.title}</div>
              {s.rows && (
                <div className="am-rows">
                  {s.rows.map((r, j) => (
                    <div key={j} className="am-row">
                      <span>{r[0]}</span>
                      <span style={r[2] ? {color:r[2],fontWeight:700} : {fontWeight:600}}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              )}
              {s.note && <div className="am-note">{s.note}</div>}
              {s.chips && (
                <div className="am-chips">
                  {s.chips.map((c, j) => (
                    <span key={j} className="am-chip" style={{background:c.bg||'#F4F7FC',color:c.col||'#1A78FF',border:`1px solid ${c.border||'rgba(26,120,255,.2)'}`}}>
                      {c.txt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="am-footer">
          <button className="btn btn-outline" onClick={doEdit}>Editar</button>
          {!sendOpen ? (
            <button className="btn btn-blue" onClick={() => setSendOpen(true)}>
              Enviar como está →
            </button>
          ) : (
            <>
              <button className="btn btn-outline am-send-email" onClick={doEmail} disabled={!email}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email {email?.to ? `· ${truncate(email.to, 22)}` : ''}
              </button>
              <button className="btn am-send-wa" onClick={doWhatsApp} disabled={!whatsapp}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                WhatsApp {whatsapp?.phone ? `· +${whatsapp.phone}` : ''}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .am-modal{background:#fff;border-radius:16px;overflow:hidden;width:min(640px,95vw);max-height:90vh;display:flex;flex-direction:column;position:relative;box-shadow:0 32px 80px rgba(7,24,48,.28);animation:slideUp .28s cubic-bezier(.4,0,.2,1);}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:none;}}
        .am-head{padding:22px 24px 18px;color:#fff;display:flex;gap:14px;align-items:flex-start;position:relative;overflow:hidden;}
        .am-head::after{content:'';position:absolute;top:-80px;right:-80px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.12),transparent 70%);pointer-events:none;}
        .am-head-icon{width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .am-head-body{flex:1;min-width:0;position:relative;z-index:1;}
        .am-eyebrow{font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:3px;}
        .am-title{font-family:'Barlow Condensed',sans-serif;font-size:1.45rem;font-weight:900;line-height:1.15;letter-spacing:.01em;}
        .am-subtitle{font-size:.82rem;color:rgba(255,255,255,.78);margin-top:3px;}
        .am-badges{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;}
        .am-body{padding:20px 24px;overflow-y:auto;flex:1;}
        .am-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;margin-bottom:16px;}
        .am-field{min-width:0;}
        .am-field-full{grid-column:1 / -1;}
        .am-field-label{font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7a8899;margin-bottom:3px;}
        .am-field-value{font-size:.84rem;color:#071830;font-weight:600;word-break:break-word;}
        .am-section{margin-top:14px;padding-top:14px;border-top:1px solid #F0F4F8;}
        .am-section:first-child{margin-top:0;padding-top:0;border-top:none;}
        .am-section-title{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7a8899;margin-bottom:10px;}
        .am-rows{display:flex;flex-direction:column;gap:2px;}
        .am-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F4F7FC;font-size:.78rem;color:#1a2a3a;gap:12px;flex-wrap:wrap;}
        .am-row:last-child{border-bottom:none;}
        .am-note{font-size:.74rem;color:#4a5468;line-height:1.55;background:rgba(26,120,255,.04);border:1px solid rgba(26,120,255,.15);border-radius:8px;padding:10px 12px;margin-top:8px;}
        .am-chips{display:flex;gap:6px;flex-wrap:wrap;}
        .am-chip{font-size:.66rem;font-weight:600;padding:3px 10px;border-radius:20px;}
        .am-footer{padding:14px 20px;display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;border-top:1px solid #F0F4F8;background:#FAFBFD;}
        .am-footer .btn{font-size:.78rem;padding:9px 16px;}
        .am-send-email{background:#F4F7FC !important;color:#1A78FF !important;border:1px solid rgba(26,120,255,.25) !important;display:inline-flex;align-items:center;gap:6px;}
        .am-send-email:hover{background:#EEF5FF !important;}
        .am-send-wa{background:#25D366 !important;color:#fff !important;border:none !important;display:inline-flex;align-items:center;gap:6px;}
        .am-send-wa:hover{background:#1fa851 !important;}
        @media (max-width:640px){
          .am-fields{grid-template-columns:1fr;}
          .am-footer{flex-direction:column;}
          .am-footer .btn{width:100%;justify-content:center;}
        }
      `}</style>
    </div>
  )
}

/* ════ Utils ════ */
function darken(hex) {
  // Oscurece ~18% para gradiente del header
  const h = hex.replace('#','')
  const n = parseInt(h, 16)
  const r = Math.max(0, ((n >> 16) & 0xff) - 35)
  const g = Math.max(0, ((n >> 8) & 0xff) - 35)
  const b = Math.max(0, (n & 0xff) - 35)
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}

function truncate(s, n) {
  if (!s) return ''
  return s.length > n ? s.slice(0, n-1) + '…' : s
}

function iconFor(type, accent) {
  const c = '#fff'
  const common = { width:22, height:22, viewBox:'0 0 24 24', fill:'none', stroke:c, strokeWidth:'2', strokeLinecap:'round', strokeLinejoin:'round' }
  switch(type) {
    case 'modelo':   return <svg {...common}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    case 'factura':  return <svg {...common}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/></svg>
    case 'cliente':  return <svg {...common}><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>
    case 'propuesta':return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
    case 'alerta':   return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'riesgo':   return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'precio':   return <svg {...common}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    case 'anomalia': return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    case 'vencim':   return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    case 'equipo':   return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
    default:         return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
  }
}
