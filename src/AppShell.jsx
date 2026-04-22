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
  const [active, setActive] = useState(config[0].id)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const user = USERS[role] || USERS.director

  const goTo = (id) => { setActive(id); setDrawerOpen(false) }
  const ActiveSection = config.find(s => s.id === active)?.Component

  return (
    <>
      <div className={`sidebar-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div id="appShell">
        <div className="topbar">
          <button className="tb-hamburger" onClick={() => setDrawerOpen(v => !v)} aria-label="Menú">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="tb-logo">
            <div className="tb-logo-icon">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect x="9" y="9" width="6" height="14" rx="1.5" fill="#fff"/>
                <rect x="17" y="13" width="6" height="10" rx="1.5" fill="#fff" opacity=".75"/>
              </svg>
            </div>
            <div className="tb-logo-text">KonGest<em> IA</em></div>
          </div>
          <div className="tb-divider"/>
          <div className="tb-tagline">{user.tagline}</div>
          <div className="tb-right">
            <div className="tb-role-pill">{user.rolePill}</div>
            <BellAlerts role={role} />
            <div className="tb-user">
              <div className="tb-avatar">{user.av}</div>
              <span>{user.name}</span>
            </div>
            <button className="tb-switch" onClick={onLogout}>↩ Cambiar perfil</button>
          </div>
        </div>
        <div className="app-body">
          <aside className={`sidebar${drawerOpen ? ' open' : ''}`}>
            <div className="sb-user-header">
              <div className="sb-av">{user.av}</div>
              <div className="sb-info">
                <div className="sb-name">{user.name}</div>
                <div className="sb-role">{user.rolePill}</div>
              </div>
            </div>
            {config.map((s, i) => {
              if (s.section) return <div key={'sec-'+i} className="sb-section">{s.section}</div>
              return (
                <button key={s.id} className={`sb-btn${active === s.id ? ' active' : ''}`}
                        onClick={() => goTo(s.id)}>
                  <span className="sb-icon">{s.icon}</span>
                  <span style={{flex:1}}>{s.label}</span>
                  {s.ia && <span className="sb-ia-badge">IA</span>}
                </button>
              )
            })}
            <div className="sb-footer">
              <button className="sb-footer-btn exit" onClick={onLogout}>↩ Cambiar perfil</button>
            </div>
          </aside>
          <main className="content">
            <div className="section-panel" key={active}>
              {ActiveSection ? <ActiveSection goTo={goTo} /> : <div>Sección en desarrollo</div>}
            </div>
          </main>
        </div>
      </div>
      <PushNotifications role={role} />
    </>
  )
}
