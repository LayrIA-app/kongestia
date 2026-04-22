import { useState } from 'react'
import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, IaTicker, Pbar, InfoRow } from '../common'
import { showToast } from '../../components/Toast'

const TICKER_AS = [
  '3 modelos críticos vencen hoy antes 20h · cola IA optimizada en 45 min',
  'KonGest IA generó 11 borradores AEAT · revisión estimada 45 min vs 6h manual',
  'Novedad DGT V0142-25 aplicada a 4 clientes · deducción vehículo 65%',
  'Anomalía asiento duplicado en Construcciones Arco · corrección preparada',
  'Mod. 349 Farmacia Beltrán firmado · presentado AEAT · 0 incidencias',
]

const asAct = (t, c) => showToast({
  recordatorio:`KonGest IA envió recordatorio automático a ${c}`,
  firmar:`Mod. firmado · ${c} · presentado AEAT · ticket de confirmación recibido`,
  revisar:`Expediente ${c} cargado · datos fiscales, histórico y contexto IA`,
  corregir:`Corrección IA aplicada · ${c} · asiento ajustado`,
  doc:`Documento abierto · ${c}`,
}[t] || 'Acción IA ejecutada', 'ok')

/* ═══════════════ 1. ASESOR DASHBOARD ═══════════════ */
const TAREAS = [
  {hora:'09:00',tarea:'Revisar modelo 303 Q1 — borrador listo',cliente:'TechPyme S.L.',urg:'Crítico',cls:'b-red',ia:true},
  {hora:'10:30',tarea:'Contabilizar facturas marzo — OCR completado',cliente:'Construcciones Arco',urg:'Alta',cls:'b-amber',ia:true},
  {hora:'12:00',tarea:'Preparar IS 2025 — documentación recopilada',cliente:'Almacenes Valdés',urg:'Alta',cls:'b-amber',ia:false},
  {hora:'15:00',tarea:'Revisar anomalía en IVA deducido Q4',cliente:'María González',urg:'Media',cls:'b-blue',ia:true},
  {hora:'16:30',tarea:'Firma digital modelo 111 febrero',cliente:'Grupo Inversor Norte',urg:'Media',cls:'b-blue',ia:false},
]

const VENCIM_DASH = [
  ['TechPyme S.L.','303','IVA Q1 2026','20 Mar 2026','b-ok','Borrador listo'],
  ['Almacenes Valdés','111','Retenciones Feb','20 Mar 2026','b-ok','Borrador listo'],
  ['Construcciones Arco','130','IRPF Q1','20 Mar 2026','b-amber','Pendiente datos'],
  ['María González','303','IVA Q1 2026','20 Mar 2026','b-amber','Revisando anomalía'],
  ['Grupo Inversor Norte','200','IS 2026','25 Jul 2026','b-blue','En preparación'],
  ['Farmacia Beltrán','349','Operaciones UE','30 Mar 2026','b-ok','Borrador listo'],
]

export function AsesorDash() {
  return (
    <>
      <PageHdr title="Mi Panel Operativo"
               sub="Resumen del día — KonGest IA ha priorizado tus tareas automáticamente"
               actions={[<span key="b" className="badge b-blue">Laura Sánchez · Fiscal & Contable</span>]} />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'38',label:'Clientes asignados',delta:'→ 3 con alerta hoy',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'6',label:'Vencimientos semana',delta:'▼ 2 críticos hoy',deltaDir:'down',kc:'#e03030'},
        {value:'11',label:'Modelos AEAT listos',delta:'▲ Generados IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'3',label:'Anomalías detectadas',delta:'→ Pendientes',deltaDir:'neutral',kc:'#e8a010'},
      ]} />
      <div className="g2 mb14">
        <Card title="Tareas del día — priorizadas por IA" ia>
          {TAREAS.map(t => (
            <div key={t.tarea} style={{display:'flex',alignItems:'center',gap:10,padding:10,border:'1px solid var(--border2)',borderRadius:8,marginBottom:7,flexWrap:'wrap'}}>
              <div style={{fontSize:'.6rem',color:'#7a8899',width:36,flexShrink:0,fontWeight:700}}>{t.hora}</div>
              <div style={{flex:1,minWidth:120}}>
                <div style={{fontSize:'.72rem',fontWeight:700,color:'#071830',marginBottom:2}}>{t.tarea}</div>
                <div style={{fontSize:'.65rem',color:'#7a8899'}}>{t.cliente}</div>
              </div>
              {t.ia && <span style={{fontSize:'.56rem',fontWeight:700,padding:'2px 6px',background:'rgba(26,120,255,.1)',color:'#1A78FF',borderRadius:4,border:'1px solid rgba(26,120,255,.2)'}}>IA</span>}
              <span className={`badge ${t.cls}`}>{t.urg}</span>
            </div>
          ))}
        </Card>
        <Card title="Alertas IA de hoy" ia>
          <Alert tone="red" title="Modelo 303 TechPyme — vence hoy 20h" sub="KonGest IA tiene el borrador completo listo · Solo necesitas revisar y firmar"
                 actions={<TblBtn label="Abrir" variant="red" onClick={() => asAct('firmar','TechPyme S.L.')} />} />
          <Alert tone="amber" title="Anomalía contable — Construcciones Arco" sub="IVA deducido en factura FRA-2026-0089 no cuadra · Revisión sugerida"
                 actions={<TblBtn label="Revisar" variant="amber" onClick={() => asAct('revisar','Construcciones Arco')} />} />
          <Alert tone="blue" title="Cambio normativo — DGT V0142-25" sub="Afecta a 4 de tus clientes · KonGest IA actualizó sus fichas automáticamente" />
          <Alert tone="green" title="KonGest IA ahorró 14h esta semana" sub="11 modelos generados · 28 facturas contabilizadas · 3 anomalías detectadas" />
        </Card>
      </div>
      <Card title="Vencimientos próximos">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Modelo</th><th>Concepto</th><th>Vencimiento</th><th>Estado IA</th></tr></thead>
            <tbody>
              {VENCIM_DASH.map(([c,m,co,f,b,e]) => (
                <tr key={c+m}>
                  <td><strong>{c}</strong></td>
                  <td style={{color:'#1A78FF',fontWeight:700}}>{m}</td>
                  <td style={{color:'#7a8899'}}>{co}</td>
                  <td style={{fontWeight:600,color:b==='b-red'?'#e03030':b==='b-amber'?'#e8a010':'#071830'}}>{f}</td>
                  <td><span className={`badge ${b}`}>{e}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/* ═══════════════ 2. MIS CLIENTES ═══════════════ */
const AS_CLIENTES_DATA = [
  ['Grupo Inversor Norte','Empresa','IS + IVA','Dic 2025','Jul 2026','b-ok','Sano'],
  ['Almacenes Valdés S.L.','Empresa','IS + IVA','Dic 2025','20 Mar','b-ok','Sano'],
  ['TechPyme S.L.','Empresa','IS + IVA','Dic 2025','20 Mar','b-amber','Revisar'],
  ['Construcciones Arco','Empresa','IS + IVA','Dic 2025','20 Mar','b-red','Riesgo'],
  ['María González','Autónomo','IRPF + IVA','Dic 2025','20 Mar','b-amber','Anomalía'],
  ['Farmacia Beltrán','Autónomo','IRPF + IVA','Dic 2025','30 Mar','b-ok','Sano'],
  ['Industrias Clave S.A.','Empresa','IS + IVA','Dic 2025','Jul 2026','b-ok','Sano'],
  ['Transportes Montes','Empresa','IS + IVA','Dic 2025','20 Mar','b-red','Riesgo'],
]

export function AsClientes() {
  return (
    <>
      <PageHdr title="Mis Clientes" sub="Gestión y seguimiento de tu cartera asignada" />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'38',label:'Clientes asignados',delta:'▲ +3 este trimestre',deltaDir:'up',kc:'#1A78FF'},
        {value:'29',label:'Al día fiscalmente',delta:'▲ 76% mi cartera',deltaDir:'up',kc:'#1a9e4a'},
        {value:'6',label:'Requieren atención',delta:'→ IA actuando',deltaDir:'neutral',kc:'#e8a010'},
        {value:'3',label:'Riesgo alto',delta:'▼ Acción urgente',deltaDir:'down',kc:'#e03030'},
      ]} />
      <Card title="Mi cartera completa" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Tipo</th><th>Régimen</th><th>Último cierre</th><th>Próx.</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {AS_CLIENTES_DATA.map(([n,t,r,u,v,b,e]) => (
                <tr key={n}>
                  <td><strong>{n}</strong></td>
                  <td style={{color:'#7a8899'}}>{t}</td>
                  <td style={{color:'#7a8899',fontSize:'.7rem'}}>{r}</td>
                  <td style={{color:'#7a8899'}}>{u}</td>
                  <td style={{fontWeight:600,color:b==='b-red'?'#e03030':b==='b-amber'?'#e8a010':'#1A78FF'}}>{v}</td>
                  <td><span className={`badge ${b}`}>{e}</span></td>
                  <td><TblBtn label="Recordatorio" onClick={() => asAct('recordatorio', n)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/* ═══════════════ 3. CALENDARIO FISCAL ═══════════════ */
const VENCIM_MAR = [
  {fecha:'20',modelo:'303',clientes:['TechPyme S.L.','Almacenes Valdés','María González','Farmacia Beltrán'],cls:'b-ok',txt:'Borradores IA listos'},
  {fecha:'20',modelo:'111',clientes:['Grupo Inversor Norte','Almacenes Valdés'],cls:'b-ok',txt:'Borradores IA listos'},
  {fecha:'20',modelo:'130',clientes:['Construcciones Arco','Transportes Montes'],cls:'b-amber',txt:'Pendiente datos'},
  {fecha:'25',modelo:'115',clientes:['Industrias Clave S.A.'],cls:'b-ok',txt:'Borrador listo'},
  {fecha:'30',modelo:'349',clientes:['Farmacia Beltrán'],cls:'b-ok',txt:'Borrador listo'},
]

const CAL_MODELOS = [
  ['TechPyme S.L.','303','A ingresar 4.280€','b-ok','Revisar'],
  ['Almacenes Valdés','303','A ingresar 8.640€','b-ok','Revisar'],
  ['Almacenes Valdés','111','A ingresar 1.240€','b-ok','Revisar'],
  ['Grupo Inversor Norte','111','A ingresar 3.820€','b-ok','Revisar'],
  ['Farmacia Beltrán','303','A devolver 320€','b-blue','Revisar'],
  ['María González','303','A ingresar 1.840€','b-amber','Anomalía'],
  ['Farmacia Beltrán','349','Sin operaciones UE','b-ok','Revisar'],
]

export function AsCalendario() {
  return (
    <>
      <PageHdr title="Calendario fiscal" sub="Todos los vencimientos de tu cartera — gestionados y monitorizados por KonGest IA" />
      <KpiGrid items={[
        {value:'2',label:'Vencen hoy',delta:'▼ Acción inmediata',deltaDir:'down',kc:'#e03030'},
        {value:'4',label:'Esta semana',delta:'→ Borradores listos',deltaDir:'neutral',kc:'#e8a010'},
        {value:'11',label:'Este mes',delta:'→ IA preparando',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'11',label:'Borradores IA listos',delta:'▲ Solo revisar',deltaDir:'up',kc:'#1a9e4a'},
      ]} />
      <div className="g2 mb14">
        <Card title="Vencimientos marzo 2026" ia>
          {VENCIM_MAR.map((v, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:12,border:'1px solid var(--border2)',borderRadius:8,marginBottom:8,flexWrap:'wrap'}}>
              <div style={{textAlign:'center',minWidth:44}}>
                <div style={{fontSize:'.62rem',color:'#7a8899'}}>Mar</div>
                <div style={{fontSize:'1.2rem',fontWeight:800,color:'#071830',fontFamily:'Barlow Condensed,sans-serif'}}>{v.fecha}</div>
              </div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                  <span style={{fontSize:'.8rem',fontWeight:700,color:'#1A78FF'}}>Mod. {v.modelo}</span>
                  <span className={`badge ${v.cls}`}>{v.txt}</span>
                </div>
                <div style={{fontSize:'.68rem',color:'#7a8899'}}>{v.clientes.join(' · ')}</div>
              </div>
              <button className="btn btn-blue btn-sm" onClick={() => showToast(`Abriendo Mod. ${v.modelo} · ${v.clientes.length} clientes · Borrador IA listo`,'info')}>Ver →</button>
            </div>
          ))}
        </Card>
        <Card title="Modelos AEAT generados por IA" ia>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Cliente</th><th>Modelo</th><th>Resultado</th><th>Estado</th></tr></thead>
              <tbody>
                {CAL_MODELOS.map(([c,m,r,b,e]) => (
                  <tr key={c+m}>
                    <td><strong>{c}</strong></td>
                    <td style={{color:'#1A78FF',fontWeight:700}}>{m}</td>
                    <td style={{fontSize:'.72rem',color:'#7a8899'}}>{r}</td>
                    <td><span className={`badge ${b}`}>{e}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <IaBox><strong>KonGest IA ha generado 11 modelos automáticamente.</strong> Solo necesitas revisar, firmar y presentar. Tiempo estimado: 45 minutos vs 6 horas manual.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 4. CONTABILIDAD ═══════════════ */
const CONT_FACTS = [
  ['FRA-2026-0142','TechPyme S.L.','4.840,00€','472000 / 410000','b-ok','Auto'],
  ['FRA-2026-0141','Almacenes Valdés','12.400,00€','600000 / 410000','b-ok','Auto'],
  ['FRA-2026-0140','Construcciones Arco','8.920,00€','621000 / 410000','b-ok','Auto'],
  ['FRA-2026-0139','María González','1.240,00€','472000 / 410000','b-amber','Revisar'],
  ['FRA-2026-0138','Grupo Inversor Norte','24.800,00€','708000 / 430000','b-ok','Auto'],
  ['FRA-2026-0137','Farmacia Beltrán','3.480,00€','472000 / 410000','b-ok','Auto'],
]

export function AsContabilidad() {
  const [drag, setDrag] = useState(false)
  return (
    <>
      <PageHdr title="Contabilidad" sub="Contabilización autónoma con OCR — KonGest IA contabiliza, tú supervisas" />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'284',label:'Facturas este mes',delta:'▲ 268 contabilizadas IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'94%',label:'Contabilización auto.',delta:'▲ Sin manual',deltaDir:'up',kc:'#1a9e4a'},
        {value:'16',label:'Requieren revisión',delta:'→ Casos excepcionales',deltaDir:'neutral',kc:'#e8a010'},
        {value:'3',label:'Anomalías detectadas',delta:'▼ Acción recomendada',deltaDir:'down',kc:'#e03030'},
      ]} />
      <div className="g2 mb14">
        <Card title="Últimas facturas procesadas por IA" ia>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Factura</th><th>Cliente</th><th>Importe</th><th>Cuenta</th><th>OCR</th></tr></thead>
              <tbody>
                {CONT_FACTS.map(([f,c,i,cu,b,e]) => (
                  <tr key={f}>
                    <td style={{fontSize:'.7rem',color:'#1A78FF'}}>{f}</td>
                    <td><strong style={{fontSize:'.75rem'}}>{c}</strong></td>
                    <td style={{color:'#1a9e4a',fontWeight:700}}>{i}</td>
                    <td style={{fontSize:'.65rem',color:'#7a8899',fontFamily:'monospace'}}>{cu}</td>
                    <td><span className={`badge ${b}`}>{e}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Carga OCR — sube factura">
          <button onClick={() => showToast('Subida OCR · procesando factura · cuentas asignadas IA en 3s','ok')}
                  onMouseEnter={() => setDrag(true)} onMouseLeave={() => setDrag(false)}
                  style={{width:'100%',border:`2px dashed ${drag?'#1A78FF':'#E0E8F4'}`,borderRadius:10,padding:28,textAlign:'center',marginBottom:14,background:drag?'#EEF5FF':'#F8FBFF',cursor:'pointer',transition:'all .2s',fontFamily:'DM Sans,sans-serif'}}>
            <div style={{fontSize:'.82rem',fontWeight:700,color:'#071830',marginBottom:4}}>Arrastra tu factura aquí</div>
            <div style={{fontSize:'.72rem',color:'#7a8899'}}>PDF, JPG, PNG · KonGest IA la contabiliza en segundos</div>
          </button>
          <IaBox><strong>KonGest IA contabiliza automáticamente:</strong> lee el OCR, identifica el proveedor, asigna cuentas contables y crea el asiento. Tasa de acierto: 94%.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 5. NÓMINAS ═══════════════ */
const NOMINAS = [
  ['TechPyme S.L.',8,8,'2.840€','1.120€','b-ok','Calculadas'],
  ['Almacenes Valdés',22,22,'7.480€','3.240€','b-ok','Calculadas'],
  ['Construcciones Arco',14,13,'4.620€','2.080€','b-amber','1 pendiente'],
  ['Grupo Inversor Norte',6,6,'2.100€','980€','b-ok','Calculadas'],
  ['Industrias Clave S.A.',18,18,'6.240€','2.860€','b-ok','Calculadas'],
  ['Transportes Montes',12,12,'4.080€','1.640€','b-blue','En revisión'],
]

export function AsNominas() {
  return (
    <>
      <PageHdr title="Nóminas & Laboral" sub="Gestión de nóminas autónoma — KonGest IA calcula, genera y alerta de cambios normativos" />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'124',label:'Nóminas este mes',delta:'▲ Calculadas IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'0',label:'Errores detectados',delta:'▲ Auditoría IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'3',label:'Altas/bajas pendientes',delta:'→ Gestión en curso',deltaDir:'neutral',kc:'#e8a010'},
        {value:'2',label:'Cambios normativos',delta:'→ Aplicados IA',deltaDir:'neutral',kc:'#0D55CC'},
      ]} />
      <Card title="Estado nóminas por empresa" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Empresa</th><th>Emp.</th><th>Nóminas</th><th>SS empresa</th><th>IRPF ret.</th><th>Estado</th></tr></thead>
            <tbody>
              {NOMINAS.map(([e,n,n2,ss,ir,b,st]) => (
                <tr key={e}>
                  <td><strong>{e}</strong></td>
                  <td style={{color:'#7a8899'}}>{n}</td>
                  <td style={{color:'#1a9e4a',fontWeight:700}}>{n2} gen.</td>
                  <td style={{color:'#071830',fontWeight:600}}>{ss}</td>
                  <td style={{color:'#071830',fontWeight:600}}>{ir}</td>
                  <td><span className={`badge ${b}`}>{st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox><strong>KonGest IA ha aplicado automáticamente</strong> la actualización del SMI 2026 y los nuevos tramos IRPF a todas las nóminas. Sin intervención manual.</IaBox>
      </Card>
    </>
  )
}

/* ═══════════════ 6. DOCUMENTOS ═══════════════ */
const DOCS = [
  ['Factura FRA-2026-0142','TechPyme S.L.','Factura recibida','Hoy','b-ok'],
  ['Contrato alquiler local','Almacenes Valdés','Contrato','Ayer','b-ok'],
  ['Escritura constitución','Construcciones Arco','Escritura','15 Mar','b-ok'],
  ['Nómina marzo 2026','Grupo Inversor Norte','Nómina','14 Mar','b-ok'],
  ['Resolución AEAT','Transportes Montes','Notificación','12 Mar','b-amber'],
]

export function AsDocumentos() {
  const [query, setQuery] = useState('')
  return (
    <>
      <PageHdr title="Documentos" sub="Gestor documental inteligente — OCR, clasificación y recuperación por IA" />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'1.842',label:'Documentos totales',delta:'▲ Todos indexados',deltaDir:'up',kc:'#1A78FF'},
        {value:'98%',label:'Clasificados IA',delta:'▲ OCR automático',deltaDir:'up',kc:'#1a9e4a'},
        {value:'38',label:'Pendientes revisar',delta:'→ Baja confianza OCR',deltaDir:'neutral',kc:'#e8a010'},
        {value:'2.4s',label:'Tiempo búsqueda',delta:'▲ vs 8 min manual',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Últimos documentos procesados">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Documento</th><th>Cliente</th><th>Tipo</th><th>Fecha</th><th>IA</th></tr></thead>
              <tbody>
                {DOCS.map(([d,c,t,f,b]) => (
                  <tr key={d}>
                    <td style={{fontSize:'.75rem'}}><strong>{d}</strong></td>
                    <td style={{color:'#7a8899',fontSize:'.72rem'}}>{c}</td>
                    <td style={{fontSize:'.7rem',color:'#1A78FF'}}>{t}</td>
                    <td style={{color:'#7a8899',fontSize:'.7rem'}}>{f}</td>
                    <td><span className={`badge ${b}`}>{b==='b-ok'?'Clasificado':'Revisar'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Buscar documentos con IA">
          <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Ej: facturas TechPyme marzo 2026..." style={{flex:1,minWidth:180,padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}} />
            <button className="btn btn-blue" onClick={() => showToast(`KonGest IA buscando: ${query.trim() || 'todos los documentos'} · 1.842 docs indexados`,'info')}>Buscar</button>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
            {['Facturas pendientes','Contratos 2026','Notificaciones AEAT','Nóminas marzo','Escrituras'].map(t => (
              <button key={t} onClick={() => setQuery(t)} style={{fontSize:'.7rem',padding:'4px 10px',background:'#F4F7FC',border:'1px solid #E0E8F4',borderRadius:20,color:'#7a8899',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>{t}</button>
            ))}
          </div>
          <IaBox>Busca en lenguaje natural: <em>"facturas de TechPyme del Q1 con IVA pendiente"</em> — KonGest IA entiende el contexto y devuelve los documentos exactos.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 7. MODELOS AEAT ═══════════════ */
const AS_MODELOS_DATA = [
  ['303','TechPyme S.L.','Q1 2026','A ingresar 4.280€','Hoy 08:14','b-ok','Revisar'],
  ['303','Almacenes Valdés','Q1 2026','A ingresar 8.640€','Hoy 08:22','b-ok','Revisar'],
  ['111','Grupo Inversor Norte','Feb 2026','A ingresar 3.820€','Hoy 08:31','b-ok','Revisar'],
  ['111','Almacenes Valdés','Feb 2026','A ingresar 1.240€','Hoy 08:35','b-ok','Revisar'],
  ['303','Farmacia Beltrán','Q1 2026','A devolver 320€','Hoy 08:40','b-blue','Revisar'],
  ['130','Construcciones Arco','Q1 2026','Datos insuficientes','—','b-amber','Pendiente'],
  ['303','María González','Q1 2026','A ingresar 1.840€','Hoy 08:44','b-amber','Anomalía'],
  ['349','Farmacia Beltrán','Q1 2026','Sin operaciones UE','Hoy 08:48','b-ok','Revisar'],
]

export function AsModelos() {
  return (
    <>
      <PageHdr title="Modelos AEAT"
               sub="KonGest IA genera, calcula y prepara todos los modelos — tú solo revisas y firmas"
               actions={[<span key="b" className="badge b-blue">IA · Autogeneración</span>]} />
      <KpiGrid items={[
        {value:'11',label:'Borradores listos',delta:'▲ Generados IA hoy',deltaDir:'up',kc:'#1a9e4a'},
        {value:'6',label:'Pendientes firma',delta:'→ Revisión rápida',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'2',label:'Con incidencia',delta:'▼ Datos insuficientes',deltaDir:'down',kc:'#e8a010'},
        {value:'45 min',label:'vs 6h manual',delta:'▲ Ahorro este mes',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <Card title="Modelos preparados por KonGest IA" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Modelo</th><th>Cliente</th><th>Periodo</th><th>Resultado</th><th>Generado</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {AS_MODELOS_DATA.map(([m,c,p,r,g,b,e]) => (
                <tr key={m+c}>
                  <td style={{color:'#1A78FF',fontWeight:700,fontSize:'.85rem'}}>{m}</td>
                  <td><strong>{c}</strong></td>
                  <td style={{color:'#7a8899'}}>{p}</td>
                  <td style={{fontSize:'.72rem',fontWeight:600,color:r.includes('ingresar')?'#e03030':r.includes('devolver')?'#1a9e4a':'#7a8899'}}>{r}</td>
                  <td style={{fontSize:'.65rem',color:'#7a8899'}}>{g}</td>
                  <td><span className={`badge ${b}`}>{e}</span></td>
                  <td><button className="btn btn-blue btn-sm" onClick={() => showToast(`Abriendo Mod. ${m} · ${c} · ${r}`,'info')}>Abrir →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox><strong>KonGest IA ha generado 11 modelos automáticamente</strong> usando los datos contables en tiempo real. Tiempo total de revisión: 45 minutos. Sin IA: 6 horas.</IaBox>
      </Card>
    </>
  )
}

/* ═══════════════ 8. ASISTENTE DE FIRMA ═══════════════ */
const FIRMA_COLA = [
  ['1','TechPyme S.L.','303 IVA Q1','A ingresar 4.280€','b-red','Crítico hoy 20h'],
  ['2','Almacenes Valdés','111 Retenciones','A ingresar 1.240€','b-red','Crítico hoy 20h'],
  ['3','Grupo Inversor Norte','111 Retenciones','A ingresar 3.820€','b-red','Crítico hoy 20h'],
  ['4','Farmacia Beltrán','303 IVA Q1','A devolver 320€','b-ok','Revisar'],
  ['5','Farmacia Beltrán','349 UE','Sin operaciones','b-ok','Revisar'],
  ['6','Industrias Clave','200 IS 2026','A ingresar 49.500€','b-ok','Revisar'],
  ['7','Almacenes Valdés','303 IVA Q1','A ingresar 8.640€','b-ok','Revisar'],
  ['8','María González','303 IVA Q1','A ingresar 1.840€','b-amber','Anomalía'],
  ['9','Construcciones Arco','130 IRPF Q1','Datos insuficientes','b-amber','Pendiente'],
]

export function AsFirma() {
  return (
    <>
      <PageHdr title="Asistente de Firma IA"
               sub="KonGest IA organiza tu cola de firma por urgencia, riesgo y vencimiento. Ningún software del mercado prioriza automáticamente qué firmar primero y por qué." />
      <KpiGrid items={[
        {value:'3',label:'Firmar antes 20h',delta:'▼ Críticos hoy',deltaDir:'down',kc:'#e03030'},
        {value:'11',label:'Borradores listos IA',delta:'→ Solo firmar',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'45 min',label:'Tiempo total estimado',delta:'▲ vs 6h sin IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'2',label:'Requieren atención',delta:'→ Incidencia activa',deltaDir:'neutral',kc:'#e8a010'},
      ]} />
      <Card title="Cola de firma optimizada por IA" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Orden</th><th>Cliente</th><th>Modelo</th><th>Resultado</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {FIRMA_COLA.map(([o,c,m,r,b,e]) => (
                <tr key={o+c}>
                  <td style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1rem',fontWeight:900,color:'#1A78FF'}}>{o}</td>
                  <td><strong>{c}</strong></td>
                  <td style={{fontSize:'.7rem',color:'#7a8899'}}>{m}</td>
                  <td style={{fontSize:'.72rem',fontWeight:600,color:r.includes('ingresar')?'#e03030':r.includes('devolver')?'#1a9e4a':'#7a8899'}}>{r}</td>
                  <td><span className={`badge ${b}`}>{e}</span></td>
                  <td><TblBtn label="Firmar" variant={b==='b-red'?'red':b==='b-amber'?'amber':'blue'} onClick={() => asAct('firmar', `${c} · ${m}`)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox><strong>3 modelos críticos vencen hoy antes de las 20h.</strong> Cola optimizada en 45 min de trabajo real · Tiempo restante: sigue la presión del calendario AEAT.</IaBox>
      </Card>
    </>
  )
}

/* ═══════════════ 9. MOTOR DE ANOMALÍAS ═══════════════ */
const ANOM_HIST = [
  ['Almacenes Valdés','Amortización incorrecta','3.200€','IA corrigió'],
  ['TechPyme S.L.','IVA intracomunitario','1.840€','IA corrigió'],
  ['Grupo Inversor Norte','Gasto no deducible','960€','IA alertó'],
  ['Farmacia Beltrán','Retención incorrecta','440€','IA corrigió'],
  ['Construcciones Arco','Periodificación','2.100€','IA alertó'],
]

export function AsAnomalias() {
  return (
    <>
      <PageHdr title="Motor de anomalías contables"
               sub="KonGest IA audita la contabilidad de tus clientes en continuo — detecta errores antes de que tú los veas"
               actions={[<span key="b" className="badge b-blue">IA · Auditoría continua</span>]} />
      <KpiGrid items={[
        {value:'3',label:'Anomalías activas',delta:'▼ Revisión urgente',deltaDir:'down',kc:'#e03030'},
        {value:'28',label:'Resueltas este mes',delta:'▲ Antes del cierre',deltaDir:'up',kc:'#1a9e4a'},
        {value:'1.842',label:'Asientos auditados',delta:'▲ Tiempo real',deltaDir:'up',kc:'#1A78FF'},
        {value:'94%',label:'Detección anticipada',delta:'▲ Antes cierre trimestral',deltaDir:'up',kc:'#e8a010'},
      ]} />
      <div className="g2 mb14">
        <Card title="Anomalías activas" ia>
          <Alert tone="red" title="María González — IVA deducido inconsistente"
                 sub="Factura FRA-2026-0139: IVA 21% vs 10% aplicable · Diferencia 182€ · Corrección IA preparada"
                 actions={<TblBtn label="Aplicar" variant="red" onClick={() => asAct('corregir','María González FRA-2026-0139')} />} />
          <Alert tone="amber" title="Construcciones Arco — asiento duplicado"
                 sub="FRA-0892 Hierros del Norte · duplicada Feb · importe 4.820€ · Propuesta IA lista"
                 actions={<TblBtn label="Aplicar" variant="amber" onClick={() => asAct('corregir','Construcciones Arco FRA-0892')} />} />
          <Alert tone="amber" title="Transportes Montes — módulos inconsistentes"
                 sub="Módulos Q4 no cuadran con facturación real · Diferencia 2.840€ · Requiere revisión antes cierre Q1"
                 actions={<TblBtn label="Revisar" variant="amber" onClick={() => asAct('revisar','Transportes Montes módulos Q4')} />} />
          <IaBox><strong>KonGest IA tiene preparadas las correcciones</strong> para las 3 anomalías. Solo necesitas revisar y aprobar cada una. Tiempo estimado: 12 minutos.</IaBox>
        </Card>
        <Card title="Historial de anomalías resueltas">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Cliente</th><th>Tipo</th><th>Impacto</th><th>Resolución</th></tr></thead>
              <tbody>
                {ANOM_HIST.map(([c,t,i,r]) => (
                  <tr key={c+t}>
                    <td><strong>{c}</strong></td>
                    <td style={{fontSize:'.72rem',color:'#7a8899'}}>{t}</td>
                    <td style={{color:'#e8a010',fontWeight:700}}>{i}</td>
                    <td><span className="badge b-ok">{r}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 10. MONITOR NORMATIVO ═══════════════ */
const NORMATIVA = [
  {ref:'DGT V0142-25',tipo:'Consulta vinculante',desc:'Nuevos criterios deducción gastos vehículo en actividades profesionales. Tipo deducible: 50% → 65% en casos justificados.',clientes:4,fecha:'15 Mar 2026',cls:'b-ok',accion:'Aplicado automáticamente'},
  {ref:'LIRPF Art.14 mod.',tipo:'Modificación legislativa',desc:'Cambio en el tratamiento fiscal de las prestaciones por desempleo. Afecta a trabajadores en ERTE durante 2026.',clientes:2,fecha:'10 Mar 2026',cls:'b-ok',accion:'Fichas actualizadas'},
  {ref:'LIVA Art.91 mod.',tipo:'Modificación tipo IVA',desc:'Prórroga del IVA reducido 4% en productos básicos de alimentación hasta diciembre 2026.',clientes:3,fecha:'01 Mar 2026',cls:'b-ok',accion:'Modelos actualizados'},
  {ref:'RD 142/2026',tipo:'Real Decreto',desc:'Nuevas tablas de retención IRPF 2026. Tramo 47% para rentas superiores a 300.000€.',clientes:1,fecha:'28 Feb 2026',cls:'b-ok',accion:'Nóminas recalculadas'},
]

export function AsNormativa() {
  return (
    <>
      <PageHdr title="Monitor normativo 24/7"
               sub="KonGest IA monitoriza cambios normativos 24/7 y los aplica automáticamente a cada cliente afectado"
               actions={[<span key="b" className="badge b-blue">IA · Tiempo real</span>]} />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'4',label:'Cambios este mes',delta:'→ Todos aplicados',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'38',label:'Clientes actualizados',delta:'▲ Automáticamente',deltaDir:'up',kc:'#1a9e4a'},
        {value:'12',label:'Clientes afectados',delta:'→ Fichas actualizadas',deltaDir:'neutral',kc:'#e8a010'},
        {value:'0',label:'Incumplimientos',delta:'▲ IA vigilando',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <Card title="Cambios normativos detectados y aplicados" ia>
        {NORMATIVA.map(n => (
          <div key={n.ref} style={{padding:14,border:'1px solid var(--border2)',borderRadius:10,marginBottom:10}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:8}}>
              <div style={{flex:1,minWidth:200}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                  <span style={{fontSize:'.78rem',fontWeight:700,color:'#1A78FF'}}>{n.ref}</span>
                  <span style={{fontSize:'.65rem',padding:'2px 8px',background:'#F4F7FC',color:'#7a8899',borderRadius:4}}>{n.tipo}</span>
                </div>
                <div style={{fontSize:'.75rem',color:'#071830',lineHeight:1.5}}>{n.desc}</div>
              </div>
              <span className={`badge ${n.cls}`} style={{flexShrink:0}}>{n.accion}</span>
            </div>
            <div style={{display:'flex',gap:16,fontSize:'.65rem',color:'#7a8899',flexWrap:'wrap'}}>
              <span>{n.fecha}</span>
              <span>{n.clientes} clientes afectados</span>
            </div>
          </div>
        ))}
      </Card>
    </>
  )
}

/* ═══════════════ 11. VERIFACTU ═══════════════ */
const VERIF = [
  ['TechPyme S.L.',284,'Hoy 08:42','b-ok','Activo'],
  ['Almacenes Valdés',642,'Hoy 09:12','b-ok','Activo'],
  ['Construcciones Arco',198,'Ayer','b-ok','Activo'],
  ['Grupo Inversor Norte',1240,'Hoy 08:55','b-ok','Activo'],
  ['Farmacia Beltrán',88,'14 Mar','b-ok','Activo'],
  ['María González',142,'13 Mar','b-blue','Configurando'],
]

const CICLO = [
  {paso:'1. Emisión factura',desc:'El cliente emite la factura en su sistema'},
  {paso:'2. Validación IA previa',desc:'KonGest IA valida formato, datos y tipología antes del envío'},
  {paso:'3. Firma y envío AEAT',desc:'Envío automático con firma electrónica al sistema AEAT'},
  {paso:'4. Confirmación y trazabilidad',desc:'AEAT confirma recepción · KonGest IA registra la trazabilidad completa'},
  {paso:'5. Alerta de incidencias',desc:'Si hay error, KonGest IA alerta en tiempo real y propone corrección'},
]

export function AsVerifactu() {
  return (
    <>
      <PageHdr title="Verifactu IA"
               sub="KonGest IA gestiona todo el ciclo Verifactu de forma autónoma — validación, envío y trazabilidad"
               actions={[<span key="b" className="badge b-ok">Cumplimiento activo</span>]} />
      <KpiGrid items={[
        {value:'100%',label:'Clientes en cumplimiento',delta:'▲ IA gestiona ciclo',deltaDir:'up',kc:'#1a9e4a'},
        {value:'1.842',label:'Facturas enviadas AEAT',delta:'▲ Este ejercicio',deltaDir:'up',kc:'#1A78FF'},
        {value:'0',label:'Errores de envío',delta:'▲ Validación previa IA',deltaDir:'up',kc:'#e03030'},
        {value:'Jul 2026',label:'Obligatoriedad pymes',delta:'→ Ya preparados',deltaDir:'neutral',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Estado Verifactu por cliente" ia>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Cliente</th><th>Facturas</th><th>Último envío</th><th>Estado</th></tr></thead>
              <tbody>
                {VERIF.map(([c,f,u,b,e]) => (
                  <tr key={c}>
                    <td><strong>{c}</strong></td>
                    <td style={{color:'#1a9e4a',fontWeight:700}}>{f.toLocaleString('es-ES')}</td>
                    <td style={{color:'#7a8899',fontSize:'.72rem'}}>{u}</td>
                    <td><span className={`badge ${b}`}>{e}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Ciclo Verifactu automatizado">
          {CICLO.map((p) => (
            <div key={p.paso} style={{display:'flex',gap:10,padding:'10px 0',borderBottom:'1px solid #F0F4F8'}}>
              <div>
                <div style={{fontSize:'.75rem',fontWeight:700,color:'#071830'}}>{p.paso}</div>
                <div style={{fontSize:'.68rem',color:'#7a8899'}}>{p.desc}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 12. PLANIFICACIÓN CIERRE ═══════════════ */
const CIERRE = [
  ['Grupo Inversor Norte','284.000€','71.000€','8.400€','b-ok','Borrador listo'],
  ['Almacenes Valdés','142.000€','35.500€','4.200€','b-ok','Borrador listo'],
  ['TechPyme S.L.','88.000€','22.000€','2.800€','b-ok','Borrador listo'],
  ['Construcciones Arco','62.000€','15.500€','1.200€','b-amber','Revisando'],
  ['Industrias Clave S.A.','198.000€','49.500€','12.400€','b-ok','Borrador listo'],
  ['Transportes Montes','74.000€','18.500€','2.100€','b-red','Incidencia'],
]

export function AsCierre() {
  return (
    <>
      <PageHdr title="Planificación de cierre fiscal"
               sub="KonGest IA anticipa el cierre del ejercicio desde octubre — borradores y estrategias antes de que lo pidas"
               actions={[<span key="b" className="badge b-blue">IA · Anticipación</span>]} />
      <IaTicker messages={TICKER_AS} />
      <KpiGrid items={[
        {value:'38',label:'Cierres en preparación',delta:'▲ IA trabajando ya',deltaDir:'up',kc:'#1A78FF'},
        {value:'24',label:'Borradores IS listos',delta:'▲ Pendientes revisión',deltaDir:'up',kc:'#1a9e4a'},
        {value:'8',label:'Oportunidades ahorro',delta:'▲ Detectadas IA',deltaDir:'up',kc:'#e8a010'},
        {value:'142k€',label:'Ahorro fiscal detectado',delta:'▲ Toda la cartera',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Estado cierre IS 2026 por cliente" ia>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Cliente</th><th>Base imponible</th><th>Cuota estimada</th><th>Ahorro IA</th><th>Estado</th></tr></thead>
              <tbody>
                {CIERRE.map(([c,b,cu,a,st,e]) => (
                  <tr key={c}>
                    <td><strong>{c}</strong></td>
                    <td style={{color:'#7a8899'}}>{b}</td>
                    <td style={{color:'#e03030',fontWeight:700}}>{cu}</td>
                    <td style={{color:'#1a9e4a',fontWeight:700}}>{a}</td>
                    <td><span className={`badge ${st}`}>{e}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Oportunidades de ahorro detectadas IA" ia>
          <Alert tone="green" title="Grupo Inversor Norte — deducción I+D aplicable"
                 sub="Gastos en software 2026 cualifican como I+D. Ahorro potencial: 8.400€ · Documentación preparada"
                 actions={<TblBtn label="Aplicar IA" variant="green" onClick={() => asAct('corregir','I+D · Grupo Inversor Norte')} />} />
          <Alert tone="green" title="Industrias Clave — reserva capitalización"
                 sub="Con fondos propios actuales, la reserva reduce base en 22.000€. Ahorro: 5.500€"
                 actions={<TblBtn label="Aplicar IA" variant="green" onClick={() => asAct('corregir','Reserva cap. · Industrias Clave')} />} />
          <Alert tone="blue" title="TechPyme S.L. — amortización acelerada"
                 sub="Inversión en servidores Q4 puede amortizarse al 100% en 2026. Ahorro: 2.800€"
                 actions={<TblBtn label="Aplicar IA" onClick={() => asAct('corregir','Amortización · TechPyme')} />} />
          <Alert tone="amber" title="Transportes Montes — ajuste previo necesario"
                 sub="Anomalía en módulos fiscales Q4 debe resolverse antes de presentar IS"
                 actions={<TblBtn label="Revisar" variant="amber" onClick={() => asAct('revisar','Módulos Q4 · Transportes Montes')} />} />
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 13. SIMULADOR FISCAL (asesor) ═══════════════ */
export { DirSimulador as AsSimulador } from '../director/Advanced'

/* ═══════════════ 14. CARGA OCR RÁPIDA ═══════════════ */
export function AsCarga() {
  const [drag, setDrag] = useState(false)
  const [count, setCount] = useState(0)
  const onDrop = () => { setCount(c => c+1); showToast(`Documento #${count+1} procesado por OCR · cuentas IA asignadas · asiento creado`,'ok') }
  return (
    <>
      <PageHdr title="Carga OCR rápida"
               sub="Zona de arrastre masiva — KonGest IA procesa decenas de facturas por minuto"
               actions={[<span key="b" className="badge b-blue">IA · OCR continuo</span>]} />
      <KpiGrid items={[
        {value:count+284,label:'Procesadas este mes',delta:'▲ OCR IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'94%',label:'Precisión OCR',delta:'▲ Auto sin revisión',deltaDir:'up',kc:'#1a9e4a'},
        {value:'3s',label:'Tiempo medio / factura',delta:'▲ vs 5 min manual',deltaDir:'up',kc:'#0D55CC'},
        {value:'16',label:'Pendientes revisión',delta:'→ Baja confianza',deltaDir:'neutral',kc:'#e8a010'},
      ]} />
      <Card title="Zona de arrastre masiva" ia>
        <button onClick={onDrop} onMouseEnter={() => setDrag(true)} onMouseLeave={() => setDrag(false)}
                style={{width:'100%',border:`2px dashed ${drag?'#1A78FF':'#E0E8F4'}`,borderRadius:12,padding:48,textAlign:'center',background:drag?'#EEF5FF':'#F8FBFF',cursor:'pointer',transition:'all .2s',fontFamily:'DM Sans,sans-serif'}}>
          <div style={{fontSize:'1rem',fontWeight:700,color:'#071830',marginBottom:6}}>Arrastra múltiples facturas aquí</div>
          <div style={{fontSize:'.78rem',color:'#7a8899'}}>PDF, JPG, PNG · Procesamiento OCR paralelo · KonGest IA asigna cuentas contables automáticamente</div>
        </button>
        <IaBox style={{marginTop:14}}>
          <strong>Tasa de acierto 94%.</strong> Los casos con baja confianza OCR se marcan automáticamente para revisión — el resto queda contabilizado sin intervención.
        </IaBox>
      </Card>
    </>
  )
}

/* ═══════════════ 15. RADAR DEL SECTOR ═══════════════ */
const RADAR_TRENDS = [
  {t:'Presión AEAT sobre módulos fiscales',pct:82,col:'#e03030',desc:'74% asesores del sector reportan aumento de inspecciones · IA refuerza documentación preventiva'},
  {t:'Adopción Verifactu',pct:68,col:'#1A78FF',desc:'Despachos preparándose para obligatoriedad pymes Jul 2026 · tú ya al 100%'},
  {t:'Novedades DGT en deducciones',pct:54,col:'#e8a010',desc:'Media de 4 novedades relevantes/mes · tu ficha actualizada automáticamente'},
  {t:'Demanda asesoría fiscal integral',pct:71,col:'#1a9e4a',desc:'Pymes buscan servicio único IA + humano · oportunidad de upselling'},
]

export function AsRadar() {
  return (
    <>
      <PageHdr title="Radar del sector"
               sub="KonGest IA monitoriza lo que pasa en el sector fiscal — novedades, tendencias y oportunidades"
               actions={[<span key="b" className="badge b-blue">IA · Inteligencia sectorial</span>]} />
      <KpiGrid items={[
        {value:'4',label:'Alertas sectoriales',delta:'→ Esta semana',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'12',label:'Oportunidades detectadas',delta:'▲ Upselling cartera',deltaDir:'up',kc:'#1a9e4a'},
        {value:'82%',label:'Presión AEAT',delta:'▼ +8pp vs Q4',deltaDir:'down',kc:'#e03030'},
        {value:'94%',label:'Precisión modelo',delta:'▲ Datos vivos',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <Card title="Tendencias del sector fiscal" ia>
        {RADAR_TRENDS.map(r => (
          <div key={r.t} style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,flexWrap:'wrap',gap:6}}>
              <span style={{fontSize:'.76rem',color:'#071830',fontWeight:600}}>{r.t}</span>
              <span style={{fontSize:'.72rem',fontWeight:700,color:r.col}}>{r.pct}%</span>
            </div>
            <Pbar pct={r.pct} color={r.col} />
            <div style={{fontSize:'.68rem',color:'#7a8899',marginTop:4}}>{r.desc}</div>
          </div>
        ))}
        <IaBox><strong>KonGest IA cruza tu cartera con las tendencias:</strong> 12 clientes pueden beneficiarse de las novedades detectadas en los últimos 30 días. Revisa <em>Oportunidades ahorro</em> en Planif. Cierre.</IaBox>
      </Card>
    </>
  )
}

/* ═══════════════ 16. COMUNICACIÓN (bandeja proactiva) ═══════════════ */
const CC_COL = {voz:'#FF6B2B',chat:'#25D366',email:'#378ADD'}
const CONV_INIT = [
  {id:0,canal:'chat',av:'DR',avCol:'#071830',nombre:'Director Carlos M.',sub:'Hoy 09:18',msgs:[
    {de:'Director',txt:'Laura, activa protocolo retención Retail Atlántico.',hora:'09:18',tuyo:false,col:'#071830'},
    {de:'Laura',txt:'Entendido.',hora:'09:22',tuyo:true},
    {de:'',txt:'Registro llamada actualizado · duración 12 min · seguimiento 24h',hora:'09:35',ia:true},
  ]},
  {id:1,canal:'email',av:'PG',avCol:'#6366F1',nombre:'Pedro G. Cliente Nexo',sub:'Hoy 08:45',msgs:[
    {de:'Pedro G.',txt:'¿Cómo va el IS 2026?',hora:'08:45',tuyo:false,col:'#6366F1'},
    {de:'',txt:'Borrador IS 2026 listo · cuota 22.000€ · deducciones IA ahorro 13.000€',hora:'08:46',ia:true},
  ]},
  {id:2,canal:'voz',av:'MG',avCol:'#e03030',nombre:'María González',sub:'Hoy 08:00',msgs:[
    {de:'',txt:'Llamada gestionada por IA · consulta IVA Q1 · respuesta 1.840€ · vence 20 Mar',hora:'08:00',ia:true},
    {de:'Laura',txt:'Reviso la anomalía antes del vencimiento.',hora:'08:10',tuyo:true},
  ]},
  {id:3,canal:'chat',av:'AC',avCol:'#1a9e4a',nombre:'Ana C. Colega',sub:'Ayer 17:30',msgs:[
    {de:'Ana C.',txt:'Asiento duplicado en Construcciones Arco.',hora:'17:30',tuyo:false,col:'#1a9e4a'},
    {de:'Laura',txt:'Lo gestiono mañana.',hora:'17:45',tuyo:true},
  ]},
  {id:4,canal:'email',av:'FB',avCol:'#e8a010',nombre:'Farmacia Beltrán',sub:'Ayer 14:00',msgs:[
    {de:'Farmacia B.',txt:'¿Cuándo llega el modelo 349?',hora:'14:00',tuyo:false,col:'#e8a010'},
    {de:'',txt:'Borrador Mod. 349 enviado automáticamente · sin operaciones UE · listo firma',hora:'14:01',ia:true},
  ]},
]

export function AsCom() {
  const [convs, setConvs] = useState(CONV_INIT)
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState('todos')
  const [draft, setDraft] = useState('')

  const current = convs.find(c => c.id === active) || convs[0]
  const filtered = convs.filter(c => filter === 'todos' || c.canal === filter)

  const sendReply = () => {
    if (!draft.trim()) return
    setConvs(cs => cs.map(c => c.id === active ? {...c, msgs:[...c.msgs, {de:'Laura',txt:draft.trim(),hora:'Ahora',tuyo:true}]} : c))
    showToast(`Respuesta enviada a ${current.nombre} · ${current.canal.toUpperCase()}`,'ok')
    setDraft('')
  }

  return (
    <>
      <PageHdr title="Comunicación"
               sub="Todas tus conversaciones gestionadas automáticamente por KonGest IA"
               actions={[<span key="b" className="badge b-blue">IA Multicanal</span>]} />
      <div style={{background:'linear-gradient(90deg,#071830,#1A78FF)',borderRadius:8,padding:'9px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#00C8FF',animation:'dotPulse 1.2s infinite',flexShrink:0}}/>
        <div style={{fontSize:'.62rem',fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.1em',flexShrink:0}}>IA LIVE</div>
        <div style={{fontSize:'.7rem',color:'#fff'}}>Chat director activo · 5 comunicaciones automáticas hoy · Briefing candidato preparado</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:13,height:520}} className="as-com-grid">
        <Card style={{display:'flex',flexDirection:'column',padding:12,overflow:'hidden'}}>
          <div style={{display:'flex',gap:5,marginBottom:10,flexWrap:'wrap'}}>
            {[['todos','Todo','#1A78FF'],['voz','VOZ','#FF6B2B'],['chat','Chat','#25D366'],['email','Email','#378ADD']].map(([k,l,c]) => (
              <button key={k} onClick={() => setFilter(k)}
                      style={{padding:'3px 9px',borderRadius:20,fontSize:'.58rem',fontWeight:700,border:`1px solid ${c}`,background:filter===k?c:'transparent',color:filter===k?'#fff':c,cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>
                {l}
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:5}}>
            {filtered.map(c => (
              <div key={c.id} onClick={() => setActive(c.id)}
                   style={{display:'flex',alignItems:'center',gap:8,padding:'8px 9px',borderRadius:8,border:`1px solid ${c.id===active?'#1A78FF':'var(--border2)'}`,background:c.id===active?'rgba(26,120,255,.05)':'transparent',cursor:'pointer'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:c.avCol,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.55rem',fontWeight:700,color:'#fff',flexShrink:0}}>{c.av}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--dark)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.nombre}</div>
                  <div style={{fontSize:'.58rem',color:'var(--text3)'}}>{c.sub}</div>
                </div>
                <div style={{width:7,height:7,borderRadius:'50%',background:CC_COL[c.canal],flexShrink:0}}/>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{display:'flex',flexDirection:'column',padding:12,overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,paddingBottom:10,borderBottom:'1px solid var(--border2)',marginBottom:10,flexWrap:'wrap'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:current.avCol,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.6rem',fontWeight:700,color:'#fff',flexShrink:0}}>{current.av}</div>
            <div style={{flex:1,minWidth:120}}><div style={{fontSize:'.76rem',fontWeight:700,color:'var(--dark)'}}>{current.nombre}</div></div>
            <div style={{display:'flex',alignItems:'center',gap:4}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#1a9e4a',animation:'dotPulse 1.5s infinite'}}/>
              <span style={{fontSize:'.6rem',color:'#1a9e4a',fontWeight:600}}>En línea</span>
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:8,padding:'2px 0',marginBottom:10}}>
            {current.msgs.map((m, i) => m.ia ? (
              <div key={i} style={{background:'rgba(26,120,255,.06)',border:'1px solid rgba(26,120,255,.15)',borderRadius:8,padding:'8px 12px'}}>
                <div style={{fontSize:'.5rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#1A78FF',marginBottom:2}}>KONGEST IA AUTO</div>
                <div style={{fontSize:'.72rem',color:'var(--dark)',lineHeight:1.55}}>{m.txt}</div>
              </div>
            ) : m.tuyo ? (
              <div key={i} style={{display:'flex',justifyContent:'flex-end'}}>
                <div style={{background:'linear-gradient(135deg,#1A78FF,#0D55CC)',borderRadius:'10px 2px 10px 10px',padding:'8px 12px',maxWidth:'82%'}}>
                  <div style={{fontSize:'.72rem',color:'#fff',lineHeight:1.55}}>{m.txt}</div>
                </div>
              </div>
            ) : (
              <div key={i} style={{display:'flex',gap:6,alignItems:'flex-start'}}>
                <div style={{width:22,height:22,borderRadius:'50%',background:m.col||'#94A3B8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.5rem',fontWeight:700,color:'#fff',flexShrink:0}}>{m.de.slice(0,2).toUpperCase()}</div>
                <div style={{background:'var(--cream2)',borderRadius:'2px 10px 10px 10px',padding:'8px 12px',maxWidth:'82%'}}>
                  <div style={{fontSize:'.72rem',color:'var(--dark)',lineHeight:1.55}}>{m.txt}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key==='Enter'&&sendReply()}
                   placeholder="Escribe un mensaje al cliente..."
                   style={{flex:1,minWidth:140,padding:'8px 12px',background:'var(--cream)',border:'1.5px solid var(--border)',borderRadius:8,fontSize:'.8rem',fontFamily:'DM Sans,sans-serif',color:'var(--dark)',outline:'none'}}/>
            <button onClick={sendReply} className="btn btn-blue btn-sm">Enviar</button>
          </div>
        </Card>
      </div>
    </>
  )
}
