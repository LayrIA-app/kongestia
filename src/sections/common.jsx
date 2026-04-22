import { useEffect, useState } from 'react'
import { showToast } from '../components/Toast'

export function PageHdr({ title, sub, badge, actions }) {
  return (
    <div className="page-hdr">
      <div className="page-hdr-line">
        <h2>{title}</h2>
        {badge && <span className={`badge ${badge.cls || 'b-blue'}`}>{badge.txt}</span>}
        {actions && <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{actions}</div>}
      </div>
      {sub && <p>{sub}</p>}
    </div>
  )
}

export function Kpi({ value, label, delta, deltaDir, kc, grad }) {
  return (
    <div className={`kpi risen${grad ? ' kpi-grad' : ''}`} style={kc ? { '--kc': kc } : undefined}>
      <div className="kpi-val">{value}</div>
      <div className="kpi-label">{label}</div>
      {delta && <div className={`kpi-delta ${deltaDir || 'up'}`}>{delta}</div>}
    </div>
  )
}

export function KpiGrid({ items }) {
  return (
    <div className="g4 mb14">
      {items.map((k, i) => <Kpi key={i} {...k} />)}
    </div>
  )
}

export function Card({ title, ia, children, style }) {
  return (
    <div className="card" style={style}>
      {title && (
        <div className="card-title">
          <span>{title}</span>
          {ia && <span className="card-title-ia">IA</span>}
        </div>
      )}
      {children}
    </div>
  )
}

export function IaBox({ children, style }) {
  return (
    <div className="ia-box" style={style}>
      <div className="ia-box-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A78FF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      </div>
      <div className="ia-box-text">{children}</div>
    </div>
  )
}

export function TblBtn({ label, onClick, variant = 'blue' }) {
  return (
    <button className={`tbl-btn tbl-btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  )
}

export function Alert({ tone = 'blue', title, sub, actions }) {
  return (
    <div className={`alert alert-${tone}`}>
      <div className="alert-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div className="alert-title">{title}</div>
        {sub && <div className="alert-sub">{sub}</div>}
      </div>
      {actions}
    </div>
  )
}

export function IaTicker({ messages }) {
  const items = Array.isArray(messages) ? messages : [messages]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 4200)
    return () => clearInterval(t)
  }, [items.length])
  return (
    <div style={{background:'#F4F7FC',borderRadius:8,padding:'7px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:10,overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#1A78FF',animation:'dotPulse 1.2s infinite'}}/>
        <span style={{fontSize:'.54rem',fontWeight:800,color:'#1A78FF',letterSpacing:'.1em',textTransform:'uppercase'}}>IA LIVE</span>
      </div>
      <div className="dir-ticker-text" style={{fontSize:'.66rem',color:'var(--text2)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',flex:1}}>
        {items[idx]}
      </div>
    </div>
  )
}

export function InfoRow({ label, value, color }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #F0F4F8'}}>
      <span style={{fontSize:'.73rem',color:'#1a2a3a'}}>{label}</span>
      <span style={{fontSize:'.76rem',fontWeight:700,color:color || '#071830'}}>{value}</span>
    </div>
  )
}

export function Pbar({ pct, color }) {
  const c = color || '#1A78FF'
  return (
    <div className="pbar">
      <div className="pbar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${c},${c}88)`}}/>
    </div>
  )
}

export function Placeholder({ title, sub, summary, actions = [], alerts = [], kpis = null }) {
  return (
    <>
      <PageHdr title={title} sub={sub} />
      {kpis && <KpiGrid items={kpis} />}
      <Card title="Resumen IA" ia style={{marginBottom:14}}>
        <IaBox>{summary}</IaBox>
      </Card>
      {alerts.length > 0 && (
        <Card title="Alertas activas IA" ia style={{marginBottom:14}}>
          {alerts.map((a, i) => <Alert key={i} {...a} />)}
        </Card>
      )}
      {actions.length > 0 && (
        <Card title="Acciones disponibles" ia>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {actions.map((a, i) => (
              <button key={i} className={`btn ${a.variant === 'outline' ? 'btn-outline' : 'btn-blue'}`}
                      onClick={() => showToast(a.toast, a.type || 'info')}>
                {a.label}
              </button>
            ))}
          </div>
        </Card>
      )}
    </>
  )
}
