const ROLES = [
  {
    id: 'director',
    card: 'director',
    name: 'Director',
    desc: 'Rentabilidad, cartera y KPIs del despacho en tiempo real',
    cta: 'Entrar',
    ctaClass: 'rs-cta-1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="#1A78FF"/>
        <rect x="10" y="7" width="4" height="14" rx="1" fill="#1A78FF" opacity=".8"/>
        <rect x="17" y="3" width="4" height="18" rx="1" fill="#1A78FF" opacity=".6"/>
        <path d="M3 8L7 5L12 7L17 3" stroke="#00C8FF" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'asesor',
    card: 'asesor',
    name: 'Asesor',
    desc: 'Modelos AEAT, contabilización autónoma y plazos fiscales IA',
    cta: 'Entrar',
    ctaClass: 'rs-cta-2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#fff" strokeWidth="1.8" fill="none"/>
        <rect x="7" y="7" width="10" height="2" rx="1" fill="#fff"/>
        <rect x="7" y="11" width="8" height="2" rx="1" fill="#fff" opacity=".7"/>
        <rect x="7" y="15" width="6" height="2" rx="1" fill="#fff" opacity=".5"/>
        <circle cx="18" cy="18" r="4" fill="#fff" opacity=".9"/>
        <path d="M16.5 18L17.5 19L19.5 17" stroke="#1A78FF" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'cliente',
    card: 'cliente',
    name: 'Cliente',
    desc: 'Mi situación fiscal en tiempo real y previsión trimestral IA',
    cta: 'Entrar',
    ctaClass: 'rs-cta-3',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#1A78FF" strokeWidth="1.8" fill="none"/>
        <path d="M3 9h18" stroke="#1A78FF" strokeWidth="1.5"/>
        <rect x="7" y="13" width="4" height="3" rx="1" fill="#1A78FF" opacity=".7"/>
        <rect x="13" y="13" width="4" height="3" rx="1" fill="#00C8FF" opacity=".7"/>
      </svg>
    ),
  },
]

export function RolePicker({ onSelect }) {
  return (
    <div id="roleScreen">
      <div className="rs-split"/>
      <div className="rs-inner">
        <div className="rs-logo-wrap">
          <div className="rs-logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".3"/>
              <rect x="9" y="9" width="6" height="14" rx="1.5" fill="#fff"/>
              <rect x="17" y="13" width="6" height="10" rx="1.5" fill="#fff" opacity=".75"/>
            </svg>
          </div>
          <div className="rs-logo-text">Kon<em>Gest</em><span style={{color:'#00C8FF'}}> IA</span></div>
        </div>
        <div className="rs-tagline">— Gestión Fiscal · Contable · IA 4ª Generación —</div>
        <div className="rs-subtitle">Selecciona el perfil que deseas ver</div>

        <div className="rs-canales">
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#FF6B2B'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 5.91 5.91l.27-.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#FF6B2B'}}>VOZ IA</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#25D366'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#25D366'}}>WHATSAPP</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#378ADD'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#378ADD'}}>EMAIL</span>
          </div>
        </div>
        <div className="rs-canal-sub">KonGest IA gestiona todos tus canales</div>

        <div className="rs-cards">
          {ROLES.map(r => (
            <div key={r.id} className={`rs-card rs-card-${r.card}`} onClick={() => onSelect(r.id)}
                 role="button" aria-label={`Entrar como ${r.name}`}>
              <div className="rs-card-body">
                <div className="rs-card-ico">{r.icon}</div>
                <div className={r.card === 'director' ? 'rs-cn-dark' : 'rs-cn-light'}>{r.name}</div>
                <div className={r.card === 'director' ? 'rs-cd-dark' : 'rs-cd-light'}>{r.desc}</div>
              </div>
              <div className={r.ctaClass}>{r.cta} →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
