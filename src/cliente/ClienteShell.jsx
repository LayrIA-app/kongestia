import { useState } from 'react'
import { BellAlerts } from '../components/BellAlerts'
import { PushNotifications } from '../components/PushNotifications'
import { SECTIONS_CLIENTE } from './sectionsCliente'

export function ClienteShell({ onLogout }) {
  const [active, setActive] = useState(SECTIONS_CLIENTE.find(s => !s.section)?.id || SECTIONS_CLIENTE[0].id)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const goTo = (id) => { setActive(id); setDrawerOpen(false) }
  const ActiveSection = SECTIONS_CLIENTE.find(s => s.id === active)?.Component
  const navItems = SECTIONS_CLIENTE.filter(s => !s.section).slice(0, 5)

  return (
    <>
      <div className={`drawer-overlay${drawerOpen ? ' show' : ''}`} id="drawerOverlay" onClick={() => setDrawerOpen(false)} />
      <div id="appShell" style={{display:'flex'}}>
        <div className="topbar">
          <div className="tb-left">
            <div className="tb-logo">
              <div className="tb-logo-icon">
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <rect x="9" y="9" width="6" height="14" rx="1.5" fill="#fff"/>
                  <rect x="17" y="13" width="6" height="10" rx="1.5" fill="#fff" opacity=".75"/>
                </svg>
              </div>
              <div className="tb-logo-text">
                <span className="tb-logo-dark">KonGest</span><span className="tb-logo-blue"> IA</span>
              </div>
            </div>
            <div className="tb-divider"></div>
            <div className="tb-tagline">"Tu fiscal al día, sin llamar al asesor"</div>
          </div>
          <div className="tb-right">
            <div className="tb-role-pill">TechPyme S.L.</div>
            <BellAlerts role="cliente" />
            <div className="tb-user">
              <div className="tb-avatar">TP</div>
              <span>TechPyme S.L.</span>
            </div>
            <button className="tb-switch" onClick={onLogout}>↩ Cambiar perfil</button>
            <button className="tb-hamburger" onClick={() => setDrawerOpen(v => !v)} aria-label="Menú">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="app-body">
          <div className={`sidebar${drawerOpen ? ' drawer-open' : ''}`} id="sidebar">
            <div className="drawer-header">
              <div className="drawer-header-av">TP</div>
              <div className="drawer-header-info">
                <div className="drawer-header-name">TechPyme S.L.</div>
                <div className="drawer-header-role">Cliente</div>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            {SECTIONS_CLIENTE.map((s, i) => {
              if (s.section) return <div key={'sec-'+i} className="sb-section">{s.section}</div>
              return (
                <button key={s.id} className={`sb-btn${active === s.id ? ' active' : ''}`} onClick={() => goTo(s.id)}>
                  <span className="sb-icon">{s.icon}</span>
                  {s.label}
                  {s.ia && <span className="sb-ia-badge">IA</span>}
                </button>
              )
            })}
            <div className="sb-footer">
              <button className="sb-footer-btn exit" onClick={onLogout}>↩ Cambiar perfil</button>
            </div>
          </div>
          <div className="content" id="mainContent">
            {ActiveSection
              ? <div className="screen active" key={active}><ActiveSection goTo={goTo} /></div>
              : <div>Sección en desarrollo</div>}
          </div>
        </div>
        <div id="bottomNav" style={{display:'none'}}>
          {navItems.map(s => (
            <button key={s.id} className={`bn-item${active === s.id ? ' active' : ''}`} onClick={() => goTo(s.id)}>
              <span className="sb-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <PushNotifications role="cliente" />
    </>
  )
}
