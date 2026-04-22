import { useState } from 'react'

const CFG = {
  director: {
    pill:'Director / Socio',
    title:<>Panel de<br/><em>Dirección</em></>,
    sub:'"Rentabilidad real del despacho, cartera de clientes y KPIs estratégicos. KonGest IA anticipa, tú decides."',
    feats:['Rentabilidad real por cliente y hora trabajada','IA predictiva: anticipa incidencias e impagos','Business Intelligence del despacho en tiempo real','Simulador de escenarios fiscales para toda la cartera'],
    email:'director@despacho.es',
    roleLabel:'Director',
    kpis:[['38%','Tiempo liberado IA'],['13k€','Ahorro medio cliente'],['94%','Precisión modelos']],
  },
  asesor: {
    pill:'Gestor / Asesor',
    title:<>Panel<br/><em>Operativo</em></>,
    sub:'"Tus clientes, plazos y modelos fiscales. KonGest IA los gestiona de forma autónoma. Tú los revisas y firmas."',
    feats:['Calendario fiscal autogestionado por IA','Borradores de modelos AEAT listos para firmar','Motor de anomalías contables en tiempo continuo','Monitor normativo 24/7 aplicado a cada cliente'],
    email:'asesor@despacho.es',
    roleLabel:'Asesor',
    kpis:[['14h','Ahorradas por semana'],['11','Modelos auto Q1'],['0','Errores AEAT']],
  },
  cliente: {
    pill:'Cliente',
    title:<>Mi Situación<br/><em>Fiscal</em></>,
    sub:'"Cuánto debes, cuándo y por qué. Siempre actualizado. Sin necesidad de llamar a tu asesor."',
    feats:['Mi IVA e IRPF acumulado día a día','Previsión trimestral 6 semanas antes','Simulador fiscal personal en tiempo real','Score de salud fiscal actualizado por IA'],
    email:'cliente@miempresa.es',
    roleLabel:'Cliente',
    kpis:[['13.000€','Ahorro fiscal IA'],['88','Score salud fiscal'],['100%','Alertas anticipadas']],
  },
}

export function LoginScreen({ role, onLogin, onBack }) {
  const c = CFG[role] || CFG.director
  const [email, setEmail] = useState(c.email)
  const [pwd, setPwd] = useState('demo1234')

  const submit = (e) => { e?.preventDefault?.(); onLogin() }

  return (
    <div id="loginScreen">
      <div className="login-wrap">
        <div className="login-left">
          <div className="ll-inner">
            <div className="ll-role-pill">{c.pill}</div>
            <h1>{c.title}</h1>
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
          <div className="lr-title">Acceder · <em>{c.roleLabel}</em></div>
          <label className="lf-label">Correo electrónico</label>
          <input className="lf-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@despacho.es" />
          <label className="lf-label">Contraseña</label>
          <input className="lf-input" type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" />
          <button className="login-btn" type="submit" onClick={submit}>Acceder</button>
          <button className="back-link" type="button" onClick={onBack}>← Cambiar perfil</button>
          <div className="lr-kpis">
            {c.kpis.map(([n,l],i) => (
              <div key={i} className="lr-kpi">
                <div className="lr-kpi-num">{n}</div>
                <div className="lr-kpi-lbl">{l}</div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
