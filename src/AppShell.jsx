import { useState } from 'react'
import { BellAlerts } from './components/BellAlerts'
import { PushNotifications } from './components/PushNotifications'
import { SECTIONS_DIRECTOR, SECTIONS_ASESOR } from './sections/registry'

const USERS = {
  director:{name:'Carlos Mendoza',av:'CM',rolePill:'Director / Socio',tagline:'"Rentabilidad, control y crecimiento"'},
  asesor:{name:'Laura Sánchez',av:'LS',rolePill:'Gestor / Asesor',tagline:'"Operativa fiscal al 100% con IA"'},
}

export function AppShell({ role, onLogout }) {
  const config = role === 'asesor' ? SECTIONS_ASESOR : SECTIONS_DIRECTOR
  const [active, setActive] = useState(config.find(s => !s.section)?.id || config[0].id)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const user = USERS[role] || USERS.director

  const goTo = (id) => { setActive(id); setDrawerOpen(false) }
  const ActiveSection = config.find(s => s.id === active)?.Component
  const navItems = config.filter(s => !s.section).slice(0, 5)

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
            <div className="tb-tagline">{user.tagline}</div>
          </div>
          <div className="tb-right">
            <div className="tb-role-pill">{user.rolePill}</div>
            <BellAlerts role={role} />
            <div className="tb-user">
              <div className="tb-avatar">{user.av}</div>
              <span>{user.name}</span>
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
              <div className="drawer-header-av">{user.av}</div>
              <div className="drawer-header-info">
                <div className="drawer-header-name">{user.name}</div>
                <div className="drawer-header-role">{user.rolePill}</div>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            {config.map((s, i) => {
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
      <PushNotifications role={role} />
    </>
  )
}
