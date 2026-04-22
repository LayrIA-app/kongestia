import { useEffect, useRef, useState } from 'react'

const FBG_ITEMS = ['FAC-2026-0142','3.847,00 €','IVA 21%','303 · Q1','FAC-2026-0139','12.400,00 €','IRPF 15%','111 · Feb','Sociedades 25%','FAC-2026-0156','8.920,00 €','200 · 2025','1.240,00 €','FAC-2026-0161','24.800,00 €','6.320,00 €','130 · Q4','15.600,00 €','IRPF 19%','FAC-2026-0133','347,00 €']

const CFG = {
  director: {
    pill:'Director / Socio',
    h1Pre:'Panel de', h1Em:'Dirección',
    sub:'"Conoce la rentabilidad real de tu despacho. KonGest IA convierte tus datos en decisiones."',
    feats:['Rentabilidad real por cliente y hora trabajada','IA predictiva: anticipa incidencias e impagos','Business Intelligence del despacho en tiempo real','Simulador de escenarios fiscales para toda la cartera'],
    email:'director@despacho.es',
    role:'Director',
    kpis:[['38%','Tiempo liberado IA'],['13k€','Ahorro medio cliente'],['94%','Precisión modelos']],
  },
  asesor: {
    pill:'Gestor / Asesor',
    h1Pre:'Panel', h1Em:'Operativo',
    sub:'"Tus clientes, plazos y modelos fiscales. KonGest IA los gestiona de forma autónoma. Tú los revisas y firmas."',
    feats:['Calendario fiscal autogestionado por IA','Borradores de modelos AEAT listos para firmar','Motor de anomalías contables en tiempo continuo','Monitor normativo 24/7 aplicado a cada cliente'],
    email:'asesor@despacho.es',
    role:'Asesor',
    kpis:[['14h','Ahorradas por semana'],['11','Modelos auto Q1'],['0','Errores AEAT']],
  },
  cliente: {
    pill:'Cliente',
    h1Pre:'Mi Situación', h1Em:'Fiscal',
    sub:'"Cuánto debes, cuándo y por qué. Siempre actualizado. Sin necesidad de llamar a tu asesor."',
    feats:['Mi IVA e IRPF acumulado día a día','Previsión trimestral 6 semanas antes','Simulador fiscal personal en tiempo real','Score de salud fiscal actualizado por IA'],
    email:'cliente@miempresa.es',
    role:'Cliente',
    kpis:[['13.000€','Ahorro fiscal IA'],['88','Score salud fiscal'],['100%','Alertas anticipadas']],
  },
}

export function LoginScreen({ role, onLogin, onBack }) {
  const c = CFG[role] || CFG.director
  const [email, setEmail] = useState(c.email)
  const [pwd, setPwd] = useState('demo1234')
  const fbgRef = useRef(null)

  useEffect(() => {
    const el = fbgRef.current
    if (!el || el.children.length) return
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('span')
      s.textContent = FBG_ITEMS[i % FBG_ITEMS.length]
      s.style.cssText = `left:${Math.random()*70}%;top:${Math.random()*90}%;font-size:${10+Math.random()*10}px;animation-duration:${18+Math.random()*22}s;animation-delay:-${Math.random()*22}s;overflow:hidden;text-overflow:ellipsis;max-width:100px;`
      el.appendChild(s)
    }
  }, [role])

  const submit = (e) => { e?.preventDefault?.(); onLogin() }

  return (
    <div id="loginScreen" style={{display:'block'}}>
      <div className="login-wrap">
        <div className="login-left">
          <div className="ll-split"></div>
          <div className="ll-fbg" ref={fbgRef}></div>
          <div className="ll-inner">
            <div className="ll-logo">
              <div className="ll-logo-icon">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".3"/>
                  <rect x="9" y="9" width="6" height="14" rx="1.5" fill="#fff"/>
                  <rect x="17" y="13" width="6" height="10" rx="1.5" fill="#fff" opacity=".75"/>
                </svg>
              </div>
              <div className="ll-logo-text">
                <span className="ll-logo-dark">Kon</span><span className="ll-logo-dark">Gest</span><span className="ll-logo-blue"> IA</span>
              </div>
            </div>
            <div className="ll-role-pill">{c.pill}</div>
            <h1>{c.h1Pre}<br/><em>{c.h1Em}</em></h1>
            <p>{c.sub}</p>
            <div className="ll-feats">
              {c.feats.map((f,i) => (
                <div key={i} className="ll-feat"><div className="ll-feat-bar"/>{f}</div>
              ))}
            </div>
          </div>
          <div className="ll-brand">COAXIONIA · KonGest IA · IA Adaptativa 4ª Generación</div>
        </div>
        <form className="login-right" onSubmit={submit}>
          <div className="lr-eyebrow">Acceso seguro</div>
          <div className="lr-title">Acceder · <span>{c.role}</span></div>
          <label className="lf-label">Correo electrónico</label>
          <input className="lf-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@despacho.es" />
          <label className="lf-label">Contraseña</label>
          <input className="lf-input" type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" />
          <button className="login-btn" type="submit" onClick={submit}>Acceder</button>
          <span className="back-link" onClick={onBack}>← Cambiar perfil</span>
          <div className="lr-kpis">
            {c.kpis.map(([n,l],i) => (
              <div key={i} className="lr-kpi">
                <div className="lr-kpi-val">{n}</div>
                <div className="lr-kpi-lbl">{l}</div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
