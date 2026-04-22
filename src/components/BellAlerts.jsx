import { useEffect, useState } from 'react'

const ALERTS_BY_ROLE = {
  director: [
    { group:'Urgentes', dot:'#e03030', txt:'Cliente Retail Atlántico · retención previa activada · margen en riesgo' },
    { group:'Urgentes', dot:'#e03030', txt:'Construcciones Arco · patrón de pago tardío · score caído a 62' },
    { group:'Hoy', dot:'#e8a010', txt:'Upselling detectado en 3 clientes · asesoría financiera · probabilidad 71%' },
    { group:'Hoy', dot:'#1A78FF', txt:'Margen operativo del despacho alcanza 68% · máximo histórico' },
    { group:'Resueltas', dot:'#1a9e4a', txt:'IA envió recordatorio a Construcciones Arco · respuesta en 2h' },
  ],
  asesor: [
    { group:'Urgentes', dot:'#e03030', txt:'3 modelos críticos vencen HOY a las 20:00 · TechPyme 303, Almacenes Valdés 111, Grupo Inversor Norte 111' },
    { group:'Urgentes', dot:'#e03030', txt:'Anomalía contable en María González · asiento duplicado detectado' },
    { group:'Hoy', dot:'#e8a010', txt:'Datos insuficientes en Construcciones Arco · Mod. 130 pendiente' },
    { group:'Hoy', dot:'#1A78FF', txt:'11 borradores AEAT IA listos · 45 min revisión estimada' },
    { group:'Resueltas', dot:'#1a9e4a', txt:'Mod. 349 Farmacia Beltrán presentado sin operaciones UE' },
  ],
  cliente: [
    { group:'Urgentes', dot:'#e03030', txt:'Mod. 303 Q1 vence en 8 días · 4.280€ a ingresar · borrador listo para firma' },
    { group:'Hoy', dot:'#1A78FF', txt:'IS 2026 optimizado · ahorro IA 13.000€ aplicado al borrador' },
    { group:'Hoy', dot:'#1A78FF', txt:'DGT V0142-25 aplicada · deducción vehículo del 65% · +480€ de ahorro' },
    { group:'Resueltas', dot:'#1a9e4a', txt:'Consulta IVA Q1 gestionada por VOZ IA · satisfacción confirmada' },
  ],
}

export function BellAlerts({ role = 'director' }) {
  const [open, setOpen] = useState(false)
  const [readIds, setReadIds] = useState(new Set())
  const list = ALERTS_BY_ROLE[role] || []
  const unread = list.length - readIds.size

  useEffect(() => { setReadIds(new Set()) }, [role])

  const toggle = () => setOpen(o => !o)
  const markRead = (i) => setReadIds(prev => { const n = new Set(prev); n.add(i); return n })

  const groups = list.reduce((acc, a, i) => {
    if (!acc[a.group]) acc[a.group] = []
    acc[a.group].push({ ...a, i })
    return acc
  }, {})

  return (
    <>
      <div className="bell-wrap" onClick={toggle} role="button" aria-label="Alertas IA">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        {unread > 0 && <div className="bell-badge" style={{display:'flex'}}>{unread}</div>}
      </div>
      {open && (
        <>
          <div id="alerts-overlay" className="open" onClick={() => setOpen(false)} />
          <div id="alerts-modal" onClick={e => e.stopPropagation()}>
            <div className="alerts-head">
              <div className="alerts-head-title">Alertas KonGest IA</div>
              <button className="alerts-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
            </div>
            <div id="alertsBody">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="alert-group-title">{group}</div>
                  {items.map(a => (
                    <div key={a.i} className={`alert-item ${readIds.has(a.i) ? 'read' : ''}`}
                         onClick={() => markRead(a.i)}>
                      <div className="alert-dot" style={{background:a.dot}} />
                      <div className="alert-item-txt">{a.txt}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="alerts-footer">{unread} alertas sin leer</div>
          </div>
        </>
      )}
    </>
  )
}
