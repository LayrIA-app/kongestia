import { useState } from 'react'
import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, IaTicker, Pbar } from '../common'
import { showToast } from '../../components/Toast'

const TICKER = [
  'KonGest IA detectó ratio IVA atípico en Construcciones Arco — documentación preventiva generada',
  'Borrador Mod. 303 completado para 11 clientes — cierre Q1 en 8 días',
  'Margen operativo 68% — máximo histórico del despacho',
  'Impago probable en Construcciones Arco — recordatorio enviado',
]

const dirAct = (t, c) => showToast({
  reclamar:`KonGest IA envió reclamación automática a ${c}`,
  protocolo:`Protocolo de riesgo tributario activado para ${c}`,
  'doc-prev':`Documentación preventiva IA generada para ${c}`,
  'ver-expediente':`Expediente IA de ${c} cargado`,
  honorarios:`Motor de precio IA calculando honorarios óptimos para ${c}`,
  propuesta:`Propuesta IA generada para ${c}`,
  upselling:`IA iniciando upselling para ${c}`,
}[t] || 'Acción IA ejecutada', t.includes('protocolo') || t.includes('doc-prev') ? 'warn' : 'ok')

/* ═══════ MOTOR DE RIESGO ═══════ */
const RIESGO = [
  {n:'Construcciones Arco',r:'Crítico',rCls:'b-red',m:'IVA deducido atípico · Ratio gastos/ingresos anómalo',p:'78%',pCol:'#e03030',act:{v:'red',l:'Protocolo IA',t:'protocolo'}},
  {n:'Industrias Clave S.A.',r:'Crítico',rCls:'b-red',m:'Operaciones vinculadas sin documentar · IS inconsistente',p:'64%',pCol:'#e03030',act:{v:'red',l:'Documentar IA',t:'doc-prev'}},
  {n:'Transportes Montes',r:'Crítico',rCls:'b-red',m:'Módulos fiscales incompatibles con facturación real',p:'58%',pCol:'#e03030',act:{v:'amber',l:'Documentar IA',t:'doc-prev'}},
  {n:'Farmacia Beltrán',r:'Medio',rCls:'b-amber',m:'Retenciones IRPF irregulares Q3-Q4',p:'34%',pCol:'#e8a010',act:{v:'green',l:'Ver corrección',t:'ver-expediente'}},
  {n:'TechPyme S.L.',r:'Medio',rCls:'b-amber',m:'Discrepancia entre IS presentado y contabilidad real',p:'29%',pCol:'#e8a010',act:{v:'amber',l:'Documentar IA',t:'doc-prev'}},
  {n:'Automoción Pérez',r:'Medio',rCls:'b-amber',m:'Gastos deducibles no justificados · Tickets sin digitalizar',p:'24%',pCol:'#e8a010',act:{v:'amber',l:'Documentar IA',t:'doc-prev'}},
  {n:'Grupo Inversor Norte',r:'Bajo',rCls:'b-blue',m:'Operación inmobiliaria pendiente declarar en próximo IS',p:'12%',pCol:'#1A78FF',act:{v:'blue',l:'Ver detalle',t:'ver-expediente'}},
  {n:'Clínica Sur S.L.',r:'Bajo',rCls:'b-ok',m:'Módulos sanitarios — revisión preventiva programada',p:'8%',pCol:'#1a9e4a',act:{v:'green',l:'Sin acción',t:'ver-expediente'}},
]

export function DirRiesgo() {
  return (
    <>
      <PageHdr title="Motor de Riesgo Tributario" sub="KonGest IA cruza los datos de tus clientes con patrones de inspección AEAT y alerta antes de que ocurra" />
      <KpiGrid items={[
        {value:'3',label:'Clientes riesgo crítico',delta:'▼ Acción inmediata',deltaDir:'down',kc:'#e03030'},
        {value:'7',label:'Riesgo medio',delta:'→ Monitorización activa',deltaDir:'neutral',kc:'#e8a010'},
        {value:'132',label:'Sin riesgo detectado',delta:'▲ IA vigilando 24/7',deltaDir:'up',kc:'#1a9e4a'},
        {value:'8',label:'Inspecciones evitadas',delta:'▲ Este ejercicio',deltaDir:'up',kc:'#1A78FF'},
      ]} />
      <Card title="Clientes con alerta de riesgo tributario" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Riesgo</th><th>Motivo IA</th><th>Prob. inspección</th><th>Acción IA</th></tr></thead>
            <tbody>
              {RIESGO.map(r => (
                <tr key={r.n}>
                  <td><strong>{r.n}</strong></td>
                  <td><span className={`badge ${r.rCls}`}>{r.r}</span></td>
                  <td style={{fontSize:'.72rem',color:'#7a8899'}}>{r.m}</td>
                  <td style={{color:r.pCol,fontWeight:700}}>{r.p}</td>
                  <td><TblBtn label={r.act.l} variant={r.act.v} onClick={() => dirAct(r.act.t, r.n)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/* ═══════ PREVISIÓN ═══════ */
const CONTRATOS = [
  ['Contratos recurrentes mensuales','74%','#1A78FF',860000],
  ['Proyectos puntuales','16%','#00C8FF',185000],
  ['Ampliaciones de servicio','7%','#0D55CC',81000],
  ['Nuevos clientes','3%','#5BA4F5',34000],
]

export function DirPrevision() {
  return (
    <>
      <PageHdr title="Previsión de ingresos" sub="Proyección automática a 3, 6 y 12 meses con escenarios IA" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'342k€',label:'Próximos 3 meses',delta:'▲ Escenario base IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'698k€',label:'Próximos 6 meses',delta:'▲ +14% vs año anterior',deltaDir:'up',kc:'#1a9e4a'},
        {value:'1.38M€',label:'Cierre 2026 estimado',delta:'▲ +21% sobre objetivo',deltaDir:'up',kc:'#0D55CC'},
        {value:'94%',label:'Precisión modelo IA',delta:'▲ Entrenado 3 años',deltaDir:'up',kc:'#e8a010'},
      ]} />
      <div className="g2">
        <Card title="Proyección mensual 2026 — 3 escenarios" ia>
          <div style={{display:'flex',alignItems:'flex-end',gap:6,height:200,padding:'12px 0 8px'}}>
            {[90,104,118,124,132,138,145,152,160,168,174,182].map((v, i) => (
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:2,justifyContent:'flex-end',height:'100%'}}>
                <div style={{width:'100%',height:`${v*0.8}%`,background:'linear-gradient(180deg,#1A78FF,#00C8FF)',borderRadius:'3px 3px 0 0',position:'relative'}}>
                  <div style={{position:'absolute',top:`-${Math.min(v*0.25,50)}%`,left:0,right:0,height:'100%',borderTop:'2px dashed rgba(148,163,184,.6)',background:'transparent'}}/>
                </div>
                <div style={{fontSize:'.54rem',color:'#7a8899'}}>{['E','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:16,marginTop:4,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:3,background:'#1A78FF',borderRadius:2}}/><span style={{fontSize:'.6rem',color:'#7a8899'}}>Optimista</span></div>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:3,background:'#00C8FF',borderRadius:2}}/><span style={{fontSize:'.6rem',color:'#7a8899'}}>Base</span></div>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:3,background:'#94A3B8',borderRadius:2}}/><span style={{fontSize:'.6rem',color:'#7a8899'}}>Pesimista</span></div>
          </div>
        </Card>
        <Card title="Ingresos por tipo de contrato">
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
            {CONTRATOS.map(([t,p,c,v]) => (
              <div key={t}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,flexWrap:'wrap',gap:6}}>
                  <span style={{fontSize:'.75rem',color:'#1a2a3a'}}>{t}</span>
                  <span style={{fontSize:'.72rem',fontWeight:700,color:c}}>{p} · {(v/1000).toFixed(0)}k€</span>
                </div>
                <Pbar pct={parseInt(p)} color={c} />
              </div>
            ))}
          </div>
          <IaBox style={{marginTop:14}}>
            El 74% de ingresos recurrentes garantiza estabilidad. IA detecta potencial de convertir 8 clientes puntuales en contratos recurrentes — impacto estimado <strong>+42.000€/año</strong>.
          </IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════ IA PREDICTIVA CARTERA ═══════ */
const PRED = [
  {n:'Grupo Inversor Norte',s:92,c:'#1a9e4a'},
  {n:'Almacenes Valdés',s:88,c:'#1a9e4a'},
  {n:'TechPyme S.L.',s:74,c:'#1A78FF'},
  {n:'María González',s:71,c:'#1A78FF'},
  {n:'Construcciones Arco',s:38,c:'#e8a010'},
  {n:'Restaurantes Bernat',s:24,c:'#e03030'},
]

export function DirCartera() {
  return (
    <>
      <PageHdr title="IA Predictiva de cartera" sub="KonGest IA anticipa incidencias, impagos y oportunidades antes de que ocurran" />
      <KpiGrid items={[
        {value:'6',label:'Impagos previstos 30d',delta:'▼ IA actuando',deltaDir:'down',kc:'#e8a010'},
        {value:'11',label:'Oportunidades detectadas',delta:'▲ Upselling potencial',deltaDir:'up',kc:'#1A78FF'},
        {value:'2',label:'Bajas probables',delta:'▼ Retención urgente',deltaDir:'down',kc:'#e03030'},
        {value:'94%',label:'Precisión modelo',delta:'▲ Cartera real',deltaDir:'up',kc:'#1a9e4a'},
      ]} />
      <div className="g2">
        <Card title="Predicciones activas IA" ia>
          <Alert tone="red" title="Construcciones Arco — impago probable en 18 días"
                 sub="Patrón de retraso detectado · IA ha enviado recordatorio preventivo"
                 actions={<TblBtn label="Reclamar IA" variant="red" onClick={() => dirAct('reclamar','Construcciones Arco')} />} />
          <Alert tone="amber" title="Restaurantes Bernat — riesgo de baja en 45 días"
                 sub="Satisfacción baja detectada · IA sugiere reunión de revisión de servicio"
                 actions={<TblBtn label="Activar retención" variant="amber" onClick={() => dirAct('ver-expediente','Restaurantes Bernat')} />} />
          <Alert tone="blue" title="Grupo Inversor Norte — listo para ampliar servicio"
                 sub="IA detecta necesidad de asesoría financiera · Probabilidad contratación 74%"
                 actions={<TblBtn label="Upselling IA" onClick={() => dirAct('upselling','Grupo Inversor Norte')} />} />
          <Alert tone="green" title="8 clientes con perfil ideal para referidos"
                 sub="IA ha preparado propuesta de programa de referidos personalizada"
                 actions={<TblBtn label="Lanzar campaña" variant="green" onClick={() => showToast('Campaña de referidos lanzada · 8 clientes contactados IA','ok')} />} />
        </Card>
        <Card title="Score predictivo por cliente" ia>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:6}}>
            {PRED.map(p => (
              <div key={p.n} style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                <div style={{flex:1,minWidth:120,fontSize:'.75rem',color:'#1a2a3a',fontWeight:500}}>{p.n}</div>
                <div style={{width:80}}><Pbar pct={p.s} color={p.c} /></div>
                <div style={{width:28,fontSize:'.72rem',fontWeight:700,color:p.c}}>{p.s}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════ MOTOR DE PRECIO ═══════ */
const PRECIO_REVIEW = [
  {c:'Construcciones Arco',actual:'1.200€/mes',sug:'1.480€/mes',delta:'+23%',pot:'3.360€/año',col:'#e03030'},
  {c:'Transportes Montes',actual:'650€/mes',sug:'820€/mes',delta:'+26%',pot:'2.040€/año',col:'#e03030'},
  {c:'Automoción Pérez',actual:'320€/mes',sug:'440€/mes',delta:'+38%',pot:'1.440€/año',col:'#e03030'},
  {c:'Industrias Clave S.A.',actual:'1.180€/mes',sug:'1.340€/mes',delta:'+14%',pot:'1.920€/año',col:'#e8a010'},
  {c:'TechPyme S.L.',actual:'2.360€/mes',sug:'2.480€/mes',delta:'+5%',pot:'1.440€/año',col:'#1A78FF'},
]

export function DirPrecio() {
  return (
    <>
      <PageHdr title="Motor de precio IA" sub="Honorarios óptimos por cliente en función de complejidad, tamaño y margen objetivo" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'+8.4%',label:'Ajuste tarifa medio',delta:'▲ +14.800€ anual',deltaDir:'up',kc:'#1a9e4a'},
        {value:'5',label:'Clientes subir tarifa',delta:'→ Revisar',deltaDir:'neutral',kc:'#e8a010'},
        {value:'94%',label:'Precisión modelo',delta:'▲ 847 casos',deltaDir:'up',kc:'#1A78FF'},
        {value:'10.200€',label:'Retorno anual IA',delta:'▲ Todas las propuestas',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <Card title="Propuestas de ajuste de honorarios IA" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Tarifa actual</th><th>Tarifa IA</th><th>Δ</th><th>Retorno anual</th><th>Acción</th></tr></thead>
            <tbody>
              {PRECIO_REVIEW.map(r => (
                <tr key={r.c}>
                  <td><strong>{r.c}</strong></td>
                  <td style={{color:'#7a8899'}}>{r.actual}</td>
                  <td style={{color:'#1A78FF',fontWeight:700}}>{r.sug}</td>
                  <td style={{color:r.col,fontWeight:700}}>{r.delta}</td>
                  <td style={{color:'#1a9e4a',fontWeight:700}}>{r.pot}</td>
                  <td><TblBtn label="Enviar propuesta" variant="blue" onClick={() => showToast(`Propuesta de ajuste ${r.delta} enviada a ${r.c} · retorno estimado ${r.pot}`,'ok')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox><strong>KonGest IA recomienda:</strong> Priorizar Construcciones Arco y Transportes Montes por estar significativamente debajo del margen objetivo. Retorno acumulado de las 5 propuestas: <strong>10.200€/año</strong>.</IaBox>
      </Card>
    </>
  )
}

/* ═══════ SIMULADOR FISCAL (Director) · interactivo ═══════ */
const SIM_CLIENTES = {
  pyme:{nombre:'TechPyme S.L.',tipo:'IS',tasa:25,facturacion:280000},
  grande:{nombre:'Grupo Inversor Norte',tipo:'IS',tasa:25,facturacion:1200000},
  autonomo:{nombre:'María González',tipo:'IRPF',tasa:35,facturacion:82000},
  construction:{nombre:'Construcciones Arco',tipo:'IS',tasa:25,facturacion:420000},
}

function computeScenario(cliente, tipo, mag, periodo) {
  const c = SIM_CLIENTES[cliente]
  const base = mag * 1000
  const round = n => Math.round(n).toLocaleString('es-ES')
  const signed = n => n >= 0 ? '+' + round(n) + '€' : '−' + round(Math.abs(n)) + '€'
  switch(tipo) {
    case 'contratar': {
      const net = base*(c.tasa/100)*periodo - base*0.28*periodo
      return {titulo:`Contratar empleados · ${c.nombre}`, sub:'KonGest IA calcula ahorro fiscal, coste SS y ROI de la contratación',
        k1:'−'+round(base*c.tasa/100*periodo)+'€',k1l:'Ahorro '+c.tipo,
        k2:'+'+round(base*1.32*periodo)+'€',k2l:'Coste SS empresa',
        k3:signed(net),k3l:'Impacto neto',
        k4:(Math.round(14*100/mag)/10)+' meses',k4l:'Umbral rentabilidad',
        ok:net>=0,rec:`Contratar en Q${Math.ceil(periodo/1.3)} maximiza el ahorro fiscal. KonGest IA ha generado el plan de onboarding y alta en SS automáticamente.`}
    }
    case 'inversion':
      return {titulo:`Inversión activo fijo · ${c.nombre}`,sub:'KonGest IA calcula amortización, deducción fiscal y ROI real',
        k1:'−'+round(base*c.tasa/100*0.2*periodo)+'€',k1l:'Deducción '+c.tipo+' anual',
        k2:round(base/10*periodo)+'€',k2l:'Amortización acumulada',
        k3:'+'+round(base*c.tasa/100*0.2*periodo*0.85)+'€',k3l:'Ahorro fiscal neto',
        k4:Math.round(base/((base*c.tasa/100)*0.2))+' años',k4l:'Amortización completa',
        ok:true,rec:`La inversión genera deducción inmediata en ${c.tipo}. KonGest IA recomienda ejecutar antes del cierre del trimestre para maximizar el efecto fiscal.`}
    case 'facturacion':
      return {titulo:`Aumento facturación · ${c.nombre}`,sub:'KonGest IA calcula el impacto fiscal del crecimiento y cómo optimizarlo',
        k1:'+'+round(base*periodo*0.85)+'€',k1l:'Ingresos adicionales',
        k2:'+'+round(base*periodo*c.tasa/100)+'€',k2l:'Carga fiscal adicional',
        k3:'+'+round(base*periodo*(0.85-c.tasa/100))+'€',k3l:'Neto después impuestos',
        k4:c.tasa+'% efectivo',k4l:'Tipo efectivo resultante',
        ok:true,rec:`Planificando deducciones de ${round(base*periodo*0.12)}€ antes del cierre, el tipo efectivo bajaría al ${c.tasa-4}%. Acción automática preparada por KonGest IA.`}
    case 'regimen':
      return {titulo:`Cambio de régimen fiscal · ${c.nombre}`,sub:'KonGest IA analiza el impacto del cambio y la estrategia de transición óptima',
        k1:'−'+round(c.facturacion*0.03*periodo)+'€',k1l:'Ahorro estimado',
        k2:round(c.facturacion*0.01)+'€',k2l:'Coste de transición',
        k3:'+'+round(c.facturacion*0.025*periodo)+'€',k3l:'Beneficio neto estimado',
        k4:'1 enero 2027',k4l:'Fecha óptima cambio',
        ok:true,rec:'El cambio de régimen es viable y rentable. KonGest IA ha preparado el Modelo 036 de cambio censal listo para presentar en Hacienda.'}
    case 'dividendos': {
      const ok = mag <= 30
      return {titulo:`Reparto de dividendos · ${c.nombre}`,sub:'KonGest IA calcula la tributación óptima del reparto y el timing ideal',
        k1:'+'+round(base*periodo)+'€',k1l:'Dividendo bruto',
        k2:'−'+round(base*periodo*0.19)+'€',k2l:'Retención IRPF 19%',
        k3:'+'+round(base*periodo*0.81)+'€',k3l:'Dividendo neto socio',
        k4:round(base*periodo*0.025)+'€',k4l:'Ahorro vs nómina equiv.',
        ok,rec:ok ? 'Reparto óptimo. KonGest IA recomienda distribuir en dos tramos trimestrales para optimizar la tributación del socio en el IRPF anual.' : `Importe elevado. Superar ${round(base*0.6)}€ sube el tipo marginal. KonGest IA propone estrategia alternativa de compensación.`}
    }
    case 'inspeccion':
      return {titulo:`Prep. inspección AEAT · ${c.nombre}`,sub:'KonGest IA analiza el riesgo real y prepara la documentación preventiva completa',
        k1:round(c.facturacion*0.04)+'€',k1l:'Contingencia estimada',
        k2:'−'+round(c.facturacion*0.025)+'€',k2l:'Reducción con documentación',
        k3:round(c.facturacion*0.015)+'€',k3l:'Riesgo neto real',
        k4:'72%',k4l:'Prob. resolución favorable',
        ok:true,rec:`KonGest IA ha preparado el expediente: ${Math.round(c.facturacion*0.001+12)} documentos organizados, argumentario técnico y cronología de actuaciones. Probabilidad favorable: 72%.`}
    default:
      return null
  }
}

export function DirSimulador() {
  const [cliente, setCliente] = useState('pyme')
  const [tipo, setTipo] = useState('contratar')
  const [mag, setMag] = useState(30)
  const [periodo, setPeriodo] = useState(1)
  const [history, setHistory] = useState([{escenario:'Contratar empleados',cliente:'TechPyme',ahorro:'−8.400€',neto:'+8.200€',ok:true}])

  const s = computeScenario(cliente, tipo, mag, periodo) || {}
  const klabels = {contratar:'Contratar empleados',inversion:'Inversión activo',facturacion:'Aumento facturación',regimen:'Cambio régimen',dividendos:'Dividendos',inspeccion:'Prep. inspección'}

  const onSimulate = () => {
    const row = {escenario:klabels[tipo],cliente:SIM_CLIENTES[cliente].nombre.split(' ')[0],ahorro:s.k1,neto:s.k3,ok:s.ok}
    setHistory(h => [row, ...h].slice(0,5))
    showToast(`Simulación ejecutada · ${klabels[tipo]} · ${SIM_CLIENTES[cliente].nombre} · ${s.ok ? 'EJECUTAR' : 'REVISAR'}`, s.ok ? 'ok' : 'warn')
  }

  return (
    <>
      <PageHdr title="Simulador de escenarios fiscales"
               sub="¿Qué pasa si...? KonGest IA recalcula el impacto fiscal de cualquier decisión antes de tomarla"
               actions={[<span key="b" className="badge b-blue">IA · Tiempo Real</span>]} />
      <div className="g2 mb14">
        <Card title="Configura el escenario" ia>
          <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:4}}>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Cliente</label>
              <select value={cliente} onChange={e => setCliente(e.target.value)} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value="pyme">TechPyme S.L. — IS 25% · 280k€</option>
                <option value="grande">Grupo Inversor Norte — IS 25% · 1.2M€</option>
                <option value="autonomo">María González — IRPF 35% · 82k€</option>
                <option value="construction">Construcciones Arco — IS 25% · 420k€</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Escenario fiscal</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value="contratar">Contratar nuevos empleados</option>
                <option value="inversion">Inversión en activo fijo</option>
                <option value="facturacion">Aumento de facturación</option>
                <option value="regimen">Cambio de régimen fiscal</option>
                <option value="dividendos">Reparto de dividendos</option>
                <option value="inspeccion">Preparación ante inspección AEAT</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Magnitud</label>
              <select value={mag} onChange={e => setMag(parseInt(e.target.value))} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value={10}>Pequeña — hasta 10.000€</option>
                <option value={30}>Media — hasta 30.000€</option>
                <option value={60}>Grande — hasta 60.000€</option>
                <option value={100}>Muy grande — más de 100.000€</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Horizonte temporal</label>
              <select value={periodo} onChange={e => setPeriodo(parseInt(e.target.value))} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value={1}>Este trimestre</option>
                <option value={2}>6 meses</option>
                <option value={4}>Este ejercicio</option>
                <option value={8}>2 ejercicios</option>
              </select>
            </div>
            <button onClick={onSimulate} style={{width:'100%',padding:13,background:'linear-gradient(135deg,#1A78FF,#0D55CC)',border:'none',borderRadius:8,color:'#fff',fontFamily:'Barlow Condensed,sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:'.1em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 6px 20px rgba(26,120,255,.35)'}}>
              Simular con KonGest IA
            </button>
            <IaBox><strong>Simulación en tiempo real.</strong> KonGest IA calcula el impacto fiscal exacto de cada decisión usando los datos reales del cliente. Sin riesgo, con números reales.</IaBox>
          </div>
        </Card>
        <Card title="Resultado simulado" ia>
          <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1rem',fontWeight:900,color:'#1A78FF',marginBottom:4,textTransform:'uppercase',letterSpacing:'.04em'}}>{s.titulo}</div>
          <div style={{fontSize:'.68rem',color:'#7a8899',marginBottom:16}}>{s.sub}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
            {[[s.k1,s.k1l,'#1A78FF','#EEF5FF'],[s.k2,s.k2l,'#e8a010','#FDF3E7'],[s.k3,s.k3l,s.ok ? '#1a9e4a' : '#e03030',s.ok ? '#EBF5EF' : '#FDECEA'],[s.k4,s.k4l,'#071830','#F4F7FC']].map(([v,l,col,bg],i) => (
              <div key={i} style={{background:bg,borderRadius:10,padding:14,textAlign:'center'}}>
                <div style={{fontSize:'.6rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:6}}>{l}</div>
                <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.8rem',fontWeight:900,color:col,wordBreak:'break-word'}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="ia-box" style={{background:s.ok ? 'rgba(26,158,74,.06)' : 'rgba(232,160,16,.07)'}}>
            <div className="ia-box-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A78FF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2"/></svg>
            </div>
            <div className="ia-box-text"><strong>{s.ok ? 'KonGest IA recomienda ejecutar:' : 'KonGest IA recomienda revisar:'}</strong> {s.rec}</div>
          </div>
          <div style={{marginTop:14}}>
            <div className="card-title">Historial de simulaciones</div>
            <div className="table-wrap">
              <table className="tbl">
                <thead><tr><th>Escenario</th><th>Cliente</th><th>Ahorro</th><th>Neto</th><th>Decisión</th></tr></thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td>{h.escenario}</td>
                      <td style={{color:'#7a8899'}}>{h.cliente}</td>
                      <td style={{color:'#1A78FF',fontWeight:700}}>{h.ahorro}</td>
                      <td style={{color:h.ok ? '#1a9e4a' : '#e8a010',fontWeight:700}}>{h.neto}</td>
                      <td><span className={`badge ${h.ok ? 'b-ok' : 'b-amber'}`}>{h.ok ? 'Ejecutar' : 'Revisar'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════ CAPTACIÓN ═══════ */
const PERFILES = [
  ['Pyme industrial 20-50 empleados','Rentabilidad media 74%','#1a9e4a'],
  ['Autónomo profesional liberal','Rentabilidad media 71%','#1a9e4a'],
  ['E-commerce en crecimiento','Rentabilidad media 68%','#1A78FF'],
  ['Startup con inversión','Rentabilidad media 62%','#1A78FF'],
  ['Holding familiar','Rentabilidad media 58%','#e8a010'],
]

export function DirCaptacion() {
  return (
    <>
      <PageHdr title="Captación inteligente" sub="IA identifica qué clientes nuevos son más rentables y dónde encontrarlos" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'12',label:'Leads activos IA',delta:'▲ Generados este mes',deltaDir:'up',kc:'#1A78FF'},
        {value:'3',label:'Propuestas enviadas',delta:'▲ Personalizadas IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'68%',label:'Tasa conversión',delta:'▲ vs 22% sector',deltaDir:'up',kc:'#0D55CC'},
        {value:'8.200€',label:'Valor medio nuevo cliente',delta:'▲ Perfil optimizado',deltaDir:'up',kc:'#e8a010'},
      ]} />
      <div className="g2">
        <Card title="Perfil ideal de cliente según IA" ia>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:8}}>
            {PERFILES.map(([t,r,c]) => (
              <div key={t} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:10,background:'#F4F7FC',borderRadius:8,flexWrap:'wrap',gap:6}}>
                <span style={{fontSize:'.78rem',color:'#1a2a3a',fontWeight:500}}>{t}</span>
                <span style={{fontSize:'.72rem',fontWeight:700,color:c}}>{r}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Leads detectados por IA">
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:6}}>
            <Alert tone="blue" title="Manufacturas del Norte S.L."
                   sub="Pyme industrial 35 emp. · Sin asesoría IA · Valor estimado 12.400€/año"
                   actions={<TblBtn label="Contactar" onClick={() => showToast('IA contactando · Manufacturas del Norte · email + LinkedIn enviados','ok')} />} />
            <Alert tone="blue" title="Dr. Martínez — Clínica privada"
                   sub="Profesional liberal · Régimen fiscal mejorable · Valor estimado 8.800€/año"
                   actions={<TblBtn label="Contactar" onClick={() => showToast('IA contactando · Dr. Martínez · propuesta fiscal enviada','ok')} />} />
            <Alert tone="green" title="Referido de Grupo Inversor Norte"
                   sub="Holding familiar · Alta probabilidad cierre · Reunión programada 28 Mar"
                   actions={<TblBtn label="Ver ficha" variant="green" onClick={() => showToast('Ficha referido · preparación reunión 28 Mar · briefing IA listo','info')} />} />
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════ MOTOR DETECTOR DE OPORTUNIDADES (dynamic HTML) ═══════ */
export function DirDetector() {
  return (
    <>
      <PageHdr title="Motor de oportunidades IA" sub="KonGest IA detecta oportunidades de crecimiento en tu cartera antes de que las veas" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'11',label:'Oportunidades activas',delta:'▲ IA detectando',deltaDir:'up',kc:'#1A78FF'},
        {value:'42k€',label:'Potencial anual',delta:'▲ Identificado',deltaDir:'up',kc:'#1a9e4a'},
        {value:'74%',label:'Prob. media cierre',delta:'▲ IA priorizando',deltaDir:'up',kc:'#0D55CC'},
        {value:'8',label:'Clientes referidores',delta:'→ Campaña activa',deltaDir:'neutral',kc:'#e8a010'},
      ]} />
      <div className="g2">
        <Card title="Oportunidades priorizadas IA" ia>
          <Alert tone="green" title="Grupo Inversor Norte · asesoría financiera"
                 sub="Ticket estimado 4.200€/año · probabilidad 74% · reunión programada 28 Mar"
                 actions={<TblBtn label="Preparar propuesta" variant="green" onClick={() => showToast('Propuesta asesoría financiera lista · Grupo Inversor Norte · 4.200€/año','ok')} />} />
          <Alert tone="green" title="8 clientes · programa referidos"
                 sub="Propuesta personalizada preparada · impacto estimado 18.400€/año"
                 actions={<TblBtn label="Lanzar campaña" variant="green" onClick={() => showToast('Campaña referidos lanzada · 8 clientes contactados · KonGest IA activo','ok')} />} />
          <Alert tone="blue" title="Farmacia Beltrán · servicio laboral"
                 sub="Detectado crecimiento de plantilla · ticket adicional 1.800€/año · prob. 62%"
                 actions={<TblBtn label="Enviar oferta" onClick={() => showToast('Oferta servicio laboral · Farmacia Beltrán · 1.800€/año · enviada','ok')} />} />
          <Alert tone="blue" title="Industrias Clave · gestión nóminas"
                 sub="18 empleados · actualmente externalizado · ticket potencial 3.600€/año · prob. 58%"
                 actions={<TblBtn label="Generar propuesta" onClick={() => showToast('Propuesta nóminas · Industrias Clave · 3.600€/año · KonGest IA preparando','ok')} />} />
        </Card>
        <Card title="Benchmark rentabilidad por servicio" ia>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:6}}>
            {[['Fiscal integral','78%','#1a9e4a'],['Nóminas & Laboral','74%','#1a9e4a'],['Asesoría financiera','71%','#1A78FF'],['Contabilidad','68%','#1A78FF'],['Consultoría puntual','52%','#e8a010']].map(([s,r,c]) => (
              <div key={s}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:'.75rem',color:'#1a2a3a'}}>{s}</span>
                  <span style={{fontSize:'.72rem',fontWeight:700,color:c}}>{r} margen</span>
                </div>
                <Pbar pct={parseInt(r)} color={c} />
              </div>
            ))}
          </div>
          <IaBox><strong>Recomendación IA:</strong> Priorizar upselling de <em>Fiscal integral</em> y <em>Asesoría financiera</em> (mayor margen) en los 11 clientes con margen inferior al 60%.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════ SUCESIÓN / CONTINUIDAD ═══════ */
export function DirSucesion() {
  return (
    <>
      <PageHdr title="Planificación de sucesión"
               sub="KonGest IA documenta procesos, clientes y conocimiento crítico — continuidad del despacho asegurada"
               actions={[<span key="b" className="badge b-blue">IA · Transferencia de conocimiento</span>]} />
      <KpiGrid items={[
        {value:'142',label:'Clientes documentados',delta:'▲ Historial completo IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'1.842',label:'Procesos registrados',delta:'▲ Playbook IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'100%',label:'Conocimiento crítico',delta:'▲ Digitalizado',deltaDir:'up',kc:'#0D55CC'},
        {value:'94%',label:'Playbook cubierto',delta:'→ 24 procesos en refinamiento',deltaDir:'neutral',kc:'#e8a010'},
      ]} />
      <div className="g2">
        <Card title="Documentación clave lista" ia>
          <Alert tone="green" title="Clientes — fichas completas" sub="142 clientes con historial fiscal, preferencias y contexto de 5 años · exportable"
                 actions={<TblBtn label="Exportar ficha" variant="green" onClick={() => showToast('142 fichas clientes exportadas · PDF integral · KonGest IA','ok')} />} />
          <Alert tone="green" title="Procesos — playbook operativo" sub="1.842 procesos documentados con IA · variantes por sector y régimen fiscal"
                 actions={<TblBtn label="Ver playbook" variant="green" onClick={() => showToast('Playbook IA · 1.842 procesos · consulta semántica activa','info')} />} />
          <Alert tone="blue" title="Normativa — historial aplicado" sub="4 años de cambios normativos aplicados y trazabilidad total por cliente"
                 actions={<TblBtn label="Descargar histórico" onClick={() => showToast('Histórico normativo exportado · 4 años · 1.380 cambios aplicados','ok')} />} />
          <Alert tone="amber" title="24 procesos en refinamiento" sub="IA detectó ambigüedad · requieren decisión manual para fijar criterio"
                 actions={<TblBtn label="Revisar" variant="amber" onClick={() => showToast('24 procesos pendientes · criterios a definir · lista priorizada por IA','warn')} />} />
        </Card>
        <Card title="Plan de transición IA" ia>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:6}}>
            {[
              ['1. Auditoría inicial','Completada','#1a9e4a','b-ok'],
              ['2. Documentación clientes','100% (142/142)','#1a9e4a','b-ok'],
              ['3. Playbook procesos','94% (1818/1842)','#1A78FF','b-blue'],
              ['4. Refinamiento criterios','24 pendientes','#e8a010','b-amber'],
              ['5. Formación sucesor','Programada Q2','#7a8899','b-blue'],
              ['6. Handover supervisado','Pendiente','#7a8899','b-blue'],
            ].map(([p,s,c,cls]) => (
              <div key={p} style={{display:'flex',justifyContent:'space-between',padding:10,background:'#F4F7FC',borderRadius:8,alignItems:'center',flexWrap:'wrap',gap:6}}>
                <span style={{fontSize:'.75rem',color:'#1a2a3a',fontWeight:600}}>{p}</span>
                <span className={`badge ${cls}`} style={{color:c}}>{s}</span>
              </div>
            ))}
          </div>
          <IaBox><strong>KonGest IA garantiza continuidad:</strong> el conocimiento tácito del despacho se vuelve explícito y transferible. Un nuevo socio puede operar al 80% desde el día 1 usando el playbook IA.</IaBox>
        </Card>
      </div>
    </>
  )
}
