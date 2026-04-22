import { useState } from 'react'
import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, IaTicker, InfoRow, Pbar, Placeholder } from '../common'
import { ChartJS } from '../../components/ChartJS'
import { showToast } from '../../components/Toast'
import { showModal } from '../../components/ActionModal'
import { fichaModal, propuestaModal, protocoloModal, informeModal } from '../../lib/modals'

// Mapea el tipo de acción histórica al modal correcto
const dirAction = (type, ctx) => {
  const fullName = (ctx || '').includes('Almacenes Valdés') && !ctx.includes('S.L.') ? 'Almacenes Valdés S.L.' : ctx
  if (type === 'propuesta') return showModal(propuestaModal(fullName, 'propuesta'))
  if (type === 'upselling') return showModal(propuestaModal(fullName, 'upselling'))
  if (type === 'honorarios') return showModal(propuestaModal(fullName, 'honorarios'))
  if (type === 'retencion') return showModal(propuestaModal(fullName, 'retencion'))
  if (type === 'protocolo') return showModal(protocoloModal(fullName, 'protocolo'))
  if (type === 'doc-prev') return showModal(protocoloModal(fullName, 'doc-prev'))
  if (type === 'alerta-ia') return showModal(protocoloModal(fullName, 'alerta-ia'))
  if (type === 'ver-expediente') return showModal(fichaModal(fullName))
  if (type === 'exportar') return showModal(informeModal('BI'))
  // Fallback
  showToast(`${type} · ${ctx}`, 'info')
}

const TICKER = [
  'KonGest IA detectó ratio IVA atípico en Construcciones Arco — documentación preventiva generada',
  'Borrador Mod. 303 completado para 11 clientes — cierre Q1 en 8 días',
  'Margen operativo 68% — máximo histórico del despacho · +11pp desde implantación KonGest IA',
  'Impago probable en Construcciones Arco — recordatorio automático enviado',
  'Upselling detectado: 3 clientes con perfil para asesoría financiera · probabilidad 71%',
  'Mod. 349 Farmacia Beltrán firmado · presentado AEAT · 0 incidencias',
]

/* ═══════ RENTABILIDAD ═══════ */
const RENT = [
  {n:'Grupo Inversor Norte',f:'48.200€',c:'14.200€',m:'71%',mCol:'#1a9e4a',h:'22h',est:'Alta',estCls:'b-ok',act:{v:'blue',l:'Propuesta IA',t:'propuesta'}},
  {n:'Almacenes Valdés S.L.',f:'34.600€',c:'10.800€',m:'69%',mCol:'#1a9e4a',h:'18h',est:'Alta',estCls:'b-ok',act:{v:'blue',l:'Propuesta IA',t:'propuesta'}},
  {n:'TechPyme S.L.',f:'28.400€',c:'9.400€',m:'67%',mCol:'#1A78FF',h:'24h',est:'Media',estCls:'b-blue',act:{v:'amber',l:'Optimizar IA',t:'honorarios'}},
  {n:'Construcciones Arco',f:'19.800€',c:'11.200€',m:'43%',mCol:'#e8a010',h:'38h',est:'Baja',estCls:'b-amber',act:{v:'red',l:'Revisar urgente',t:'honorarios'}},
  {n:'Farmacia Beltrán',f:'16.400€',c:'4.900€',m:'70%',mCol:'#1a9e4a',h:'14h',est:'Alta',estCls:'b-ok',act:{v:'blue',l:'Upselling IA',t:'upselling'}},
  {n:'Industrias Clave S.A.',f:'14.200€',c:'6.800€',m:'52%',mCol:'#1A78FF',h:'28h',est:'Media',estCls:'b-blue',act:{v:'amber',l:'Optimizar IA',t:'honorarios'}},
  {n:'María González',f:'8.400€',c:'2.400€',m:'71%',mCol:'#1a9e4a',h:'9h',est:'Alta',estCls:'b-ok',act:{v:'blue',l:'Propuesta IA',t:'propuesta'}},
  {n:'Transportes Montes',f:'7.800€',c:'5.600€',m:'28%',mCol:'#e8a010',h:'42h',est:'Baja',estCls:'b-amber',act:{v:'red',l:'Revisar urgente',t:'honorarios'}},
  {n:'Clínica Sur S.L.',f:'6.200€',c:'1.900€',m:'69%',mCol:'#1a9e4a',h:'8h',est:'Alta',estCls:'b-ok',act:{v:'blue',l:'Upselling IA',t:'upselling'}},
  {n:'Automoción Pérez',f:'4.100€',c:'4.400€',m:'-7%',mCol:'#e03030',h:'48h',est:'Negativa',estCls:'b-red',act:{v:'red',l:'Revisar urgente',t:'honorarios'}},
]

export function DirRentabilidad() {
  return (
    <>
      <PageHdr title="Rentabilidad por cliente" sub="Margen real por cliente incluyendo tiempo, complejidad e incidencias — calculado por IA" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'68%',label:'Margen medio despacho',delta:'▲ +11pp vs sin IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'142€/h',label:'Ingreso hora efectiva',delta:'▲ +38€/h con IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'18',label:'Clientes no rentables',delta:'▼ Requieren revisión',deltaDir:'down',kc:'#e8a010'},
        {value:'180h',label:'Horas ahorradas/mes IA',delta:'▲ Automatización',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <Card title="Rentabilidad real por cliente" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Facturado</th><th>Coste real</th><th>Margen</th><th>Horas/mes</th><th>Rentab. IA</th><th>Acción</th></tr></thead>
            <tbody>
              {RENT.map(r => (
                <tr key={r.n}>
                  <td><strong>{r.n}</strong></td>
                  <td style={{color:'#1a9e4a',fontWeight:700}}>{r.f}</td>
                  <td style={{color:'#7a8899'}}>{r.c}</td>
                  <td style={{color:r.mCol,fontWeight:700}}>{r.m}</td>
                  <td>{r.h}</td>
                  <td><span className={`badge ${r.estCls}`}>{r.est}</span></td>
                  <td><TblBtn label={r.act.l} variant={r.act.v} onClick={() => dirAction(r.act.t, r.n)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox><strong>KonGest IA recomienda:</strong> Industrias Clave, Construcciones Arco y Automoción Pérez generan margen inferior al objetivo del 55%. IA propone revisión de honorarios o renegociación en los próximos 30 días — ingresos adicionales estimados: +18.400€/año.</IaBox>
      </Card>
    </>
  )
}

/* ═══════ CARTERA DE CLIENTES ═══════ */
const CARTERA = [
  {n:'Grupo Inversor Norte',t:'Empresa',s:'Fiscal + Contable',f:'48.200€',a:0,est:'Sano',estCls:'b-ok',act:{v:'blue',l:'Upselling IA',t:'upselling'}},
  {n:'Almacenes Valdés S.L.',t:'Empresa',s:'Fiscal + Laboral',f:'34.600€',a:0,est:'Sano',estCls:'b-ok',act:{v:'blue',l:'Ver expediente',t:'ver-expediente'}},
  {n:'TechPyme S.L.',t:'Empresa',s:'Fiscal integral',f:'28.400€',a:1,est:'Revisar',estCls:'b-blue',act:{v:'amber',l:'Activar alerta',t:'alerta-ia'}},
  {n:'Construcciones Arco',t:'Empresa',s:'Fiscal + Contable',f:'19.800€',a:3,est:'Riesgo',estCls:'b-amber',act:{v:'red',l:'Protocolo IA',t:'protocolo'}},
  {n:'Farmacia Beltrán',t:'Autónomo',s:'Contable',f:'16.400€',a:1,est:'Sano',estCls:'b-ok',act:{v:'blue',l:'Propuesta IA',t:'propuesta'}},
  {n:'Industrias Clave S.A.',t:'Empresa',s:'Fiscal + RRHH',f:'14.200€',a:2,est:'Riesgo',estCls:'b-amber',act:{v:'red',l:'Protocolo IA',t:'protocolo'}},
  {n:'María González',t:'Autónomo',s:'IRPF + IVA',f:'8.400€',a:0,est:'Sano',estCls:'b-ok',act:{v:'blue',l:'Upselling IA',t:'upselling'}},
  {n:'Transportes Montes',t:'Empresa',s:'Contable',f:'7.800€',a:2,est:'Riesgo',estCls:'b-amber',act:{v:'amber',l:'Alerta IA',t:'alerta-ia'}},
  {n:'Clínica Sur S.L.',t:'Empresa',s:'Fiscal + Laboral',f:'6.200€',a:0,est:'Sano',estCls:'b-ok',act:{v:'blue',l:'Propuesta IA',t:'propuesta'}},
  {n:'Automoción Pérez',t:'Autónomo',s:'IRPF + Contable',f:'4.100€',a:1,est:'Baja',estCls:'b-red',act:{v:'red',l:'Retención IA',t:'retencion'}},
]

export function DirClientes() {
  return (
    <>
      <PageHdr title="Cartera de clientes" sub="Gestión y seguimiento inteligente de toda la cartera" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'142',label:'Clientes activos',delta:'▲ +12 este trimestre',deltaDir:'up',kc:'#1A78FF'},
        {value:'108',label:'Salud fiscal óptima',delta:'▲ 76% cartera',deltaDir:'up',kc:'#1a9e4a'},
        {value:'24',label:'Requieren atención',delta:'→ IA actuando',deltaDir:'neutral',kc:'#e8a010'},
        {value:'10',label:'Riesgo alto',delta:'▼ Intervención urgente',deltaDir:'down',kc:'#e03030'},
      ]} />
      <Card title="Cartera completa" ia>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Tipo</th><th>Servicio</th><th>Facturado</th><th>Alertas IA</th><th>Estado</th><th>Acción</th></tr></thead>
            <tbody>
              {CARTERA.map(c => (
                <tr key={c.n}>
                  <td><strong>{c.n}</strong></td>
                  <td>{c.t}</td>
                  <td style={{fontSize:'.7rem',color:'#7a8899'}}>{c.s}</td>
                  <td style={{color:'#1a9e4a',fontWeight:700}}>{c.f}</td>
                  <td style={{fontWeight:700,color:c.a>0?'#e8a010':'#1a9e4a'}}>{c.a}</td>
                  <td><span className={`badge ${c.estCls}`}>{c.est}</span></td>
                  <td><TblBtn label={c.act.l} variant={c.act.v} onClick={() => dirAction(c.act.t, c.n)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/* ═══════ EQUIPO ═══════ */
const EQUIPO = [
  {n:'Laura Sánchez',r:'Asesora Senior',ini:'LS',cl:38,f:'94.200€',h:'22h/sem',hPct:55,ef:'Alta',cls:'b-ok',col:'#1a9e4a'},
  {n:'Marcos Torres',r:'Asesor Fiscal',ini:'MT',cl:31,f:'78.400€',h:'26h/sem',hPct:65,ef:'Alta',cls:'b-ok',col:'#1a9e4a'},
  {n:'Ana Castillo',r:'Gestora',ini:'AC',cl:29,f:'62.800€',h:'32h/sem',hPct:80,ef:'Media',cls:'b-blue',col:'#1A78FF'},
  {n:'Pedro Ruiz',r:'Asesor Junior',ini:'PR',cl:24,f:'48.600€',h:'38h/sem',hPct:95,ef:'Revisión',cls:'b-amber',col:'#e8a010'},
]

export function DirEquipo() {
  return (
    <>
      <PageHdr title="Equipo" sub="Rendimiento y carga de trabajo del equipo en tiempo real" />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'4',label:'Asesores activos',delta:'→ 1 con sobrecarga',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'142€/h',label:'Productividad media',delta:'▲ +38€/h con IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'180h',label:'Horas liberadas IA',delta:'▲ Este mes',deltaDir:'up',kc:'#e8a010'},
        {value:'94%',label:'Satisfacción equipo',delta:'▲ +18pp con IA',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        {EQUIPO.map(a => (
          <Card key={a.n}>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
              <div style={{width:46,height:46,borderRadius:'50%',background:'linear-gradient(135deg,#1A78FF,#0D55CC)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.8rem',fontWeight:700,color:'#fff'}}>{a.ini}</div>
              <div>
                <div style={{fontWeight:700,color:'#071830',fontSize:'.92rem'}}>{a.n}</div>
                <div style={{fontSize:'.72rem',color:'#7a8899'}}>{a.r}</div>
              </div>
              <span className={`badge ${a.cls}`} style={{marginLeft:'auto'}}>{a.ef}</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
              <div style={{background:'#F4F7FC',borderRadius:6,padding:10,textAlign:'center'}}>
                <div style={{fontSize:'1.1rem',fontWeight:800,color:'#071830'}}>{a.cl}</div>
                <div style={{fontSize:'.62rem',color:'#7a8899'}}>Clientes</div>
              </div>
              <div style={{background:'#F4F7FC',borderRadius:6,padding:10,textAlign:'center'}}>
                <div style={{fontSize:'1.1rem',fontWeight:800,color:a.col}}>{a.f}</div>
                <div style={{fontSize:'.62rem',color:'#7a8899'}}>Facturado</div>
              </div>
            </div>
            <div style={{fontSize:'.72rem',color:'#7a8899',marginBottom:6}}>
              Carga semanal: <strong style={{color:'#071830'}}>{a.h}</strong>
            </div>
            <Pbar pct={a.hPct} />
            <div style={{marginTop:12,display:'flex',gap:6,flexWrap:'wrap'}}>
              <button className="btn btn-outline btn-sm" onClick={() => dirAction('redistribuir', a.n)}>Redistribuir carga</button>
              <button className="btn btn-outline btn-sm" onClick={() => dirAction('ver-expediente', a.n)}>Ver ficha</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

/* ═══════ BI ═══════ */
const BI_KPIS = [['Margen operativo','68%','52%'],['Clientes por asesor','35','22'],['Tiempo respuesta cliente','2h','24h'],['Tasa retención clientes','94%','78%'],['NPS','84','61']]

export function DirBI() {
  return (
    <>
      <PageHdr title="Business Intelligence" sub="El despacho gestionado como un negocio — KonGest IA como tu CFO inteligente"
               actions={[
                 <button key="exp" className="btn btn-outline btn-sm" onClick={() => dirAction('exportar', 'informe BI')}>⬇ Exportar PDF</button>,
                 <span key="b" className="badge b-blue">Marzo 2026</span>,
               ]} />
      <IaTicker messages={TICKER} />
      <KpiGrid items={[
        {value:'1.38M€',label:'Proyección 2026',delta:'▲ +21% sobre objetivo',deltaDir:'up',kc:'#1A78FF'},
        {value:'68%',label:'EBITDA estimado',delta:'▲ Máximo histórico',deltaDir:'up',kc:'#1a9e4a'},
        {value:'4.2x',label:'ROI KonGest IA',delta:'▲ Tiempo real',deltaDir:'up',kc:'#0D55CC'},
        {value:'180h',label:'Horas liberadas/mes',delta:'▲ Reinvertidas',deltaDir:'up',kc:'#e8a010'},
      ]} />
      <div className="g2 mb14">
        <Card title="Evolución margen operativo" ia>
          <ChartJS type="line"
                   data={{
                     labels:['2022','2023','2024','2025','2026'],
                     datasets:[{label:'Margen %',data:[42,48,54,57,68],borderColor:'#1A78FF',backgroundColor:'rgba(26,120,255,.15)',fill:true,tension:.35,borderWidth:2,pointRadius:4,pointBackgroundColor:'#1A78FF'}]
                   }}
                   options={{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:80,ticks:{color:'#7a8899'},grid:{color:'rgba(7,24,48,.05)'}},x:{ticks:{color:'#7a8899'},grid:{display:false}}}}}/>
          <IaBox>El salto de 57% a 68% en 2026 está directamente correlacionado con la automatización IA de 180h/mes de tareas operativas.</IaBox>
        </Card>
        <Card title="KPIs de negocio vs sector">
          <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:8}}>
            {BI_KPIS.map(([k,t,s]) => (
              <div key={k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
                <span style={{fontSize:'.78rem',color:'#1a2a3a',fontWeight:500}}>{k}</span>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{fontSize:'.78rem',fontWeight:700,color:'#1a9e4a'}}>{t}</span>
                  <span style={{fontSize:'.68rem',color:'#7a8899'}}>vs {s} sector</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
