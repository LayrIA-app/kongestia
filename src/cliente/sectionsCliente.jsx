import { useState } from 'react'
import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, IaTicker, InfoRow, Pbar } from '../sections/common'
import { showToast } from '../components/Toast'

const TICKER_CL = [
  'Tu Mod. 303 Q1 está listo · 4.280€ · vence 20 Mar · borrador revisado por Laura',
  'KonGest IA aplicó DGT V0142-25 · tu deducción vehículo sube 50% → 65% · +480€ ahorro',
  'IS 2026 optimizado · ahorro IA 13.000€ aplicado · cuota final estimada 9.000€',
  'Consulta IVA Q1 gestionada por VOZ IA · respuesta inmediata · sin llamar al asesor',
]

const clAct = (t, c) => showToast({
  firmar:`${c} · firmando con certificado digital · presentación AEAT en curso`,
  draft:`${c} · draft IA listo · pendiente tu revisión`,
  contacto:`Laura Sánchez · ${c} · respuesta en 2h · KonGest IA te notificará`,
  descarga:`Descargando ${c} · PDF firmado con sello temporal`,
  aplicar:`${c} aplicada · reflejada en tu borrador fiscal`,
}[t] || 'Acción ejecutada','ok')

/* ═══════════════ 1. DASHBOARD CLIENTE ═══════════════ */
const OBLIGACIONES = [
  {fecha:'20 Mar',modelo:'Mod. 303',concepto:'IVA Q1 2026',importe:'4.280€',urg:true},
  {fecha:'20 Mar',modelo:'Mod. 111',concepto:'Retenciones Feb',importe:'840€',urg:true},
  {fecha:'20 Jun',modelo:'Mod. 303',concepto:'IVA Q2 2026',importe:'~4.100€',urg:false},
  {fecha:'20 Jun',modelo:'Mod. 202',concepto:'Pago fracc. IS',importe:'~5.500€',urg:false},
  {fecha:'25 Jul',modelo:'Mod. 200',concepto:'IS 2026',importe:'~9.000€',urg:false},
]

const RESUMEN_Q1 = [
  ['Facturación acumulada','76.000€','#1a9e4a'],
  ['IVA repercutido','15.960€','#071830'],
  ['IVA soportado deducible','11.680€','#1a9e4a'],
  ['IVA neto Q1','4.280€','#e03030'],
  ['Retenciones practicadas','3.120€','#e8a010'],
  ['IS estimado 2026','22.000€','#1A78FF'],
  ['Ahorro deducciones IA','−13.000€','#1a9e4a'],
  ['IS final estimado','9.000€','#e8a010'],
]

const BARS = [['Ene','22k',60],['Feb','26k',72],['Mar','28k',78],['Abr','—',0],['May','—',0],['Jun','—',0]]

export function ClDash({ goTo }) {
  return (
    <>
      <PageHdr title="Mi situación fiscal"
               sub="Tu posición fiscal actualizada por KonGest IA en tiempo real — sin llamar a tu asesor"
               actions={[<span key="b" className="badge b-blue">TechPyme S.L. · Q1 2026</span>]} />
      <KpiGrid items={[
        {value:'4.280€',label:'IVA a ingresar Q1',delta:'▼ Vence 20 Mar 2026',deltaDir:'down',kc:'#e03030'},
        {value:'3.120€',label:'IRPF retenido acum.',delta:'→ A cuenta del IS',deltaDir:'neutral',kc:'#e8a010'},
        {value:'88',label:'Score salud fiscal IA',delta:'▲ Muy buena posición',deltaDir:'up',kc:'#1a9e4a'},
        {value:'22.000€',label:'IS estimado 2026',delta:'▲ Borrador en revisión',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2 mb14">
        <Card title="Mis próximas obligaciones" ia>
          {OBLIGACIONES.map((o,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:10,border:`1px solid ${o.urg?'rgba(224,48,48,.25)':'var(--border2)'}`,borderRadius:8,marginBottom:7,background:o.urg?'rgba(224,48,48,.03)':'transparent',flexWrap:'wrap'}}>
              <div style={{textAlign:'center',minWidth:40}}>
                <div style={{fontSize:'.95rem',fontWeight:900,color:o.urg?'#e03030':'#071830',fontFamily:'Barlow Condensed,sans-serif'}}>{o.fecha}</div>
              </div>
              <div style={{flex:1,minWidth:120}}>
                <div style={{fontSize:'.72rem',fontWeight:700,color:'#1A78FF'}}>{o.modelo}</div>
                <div style={{fontSize:'.73rem',color:'#071830'}}>{o.concepto}</div>
              </div>
              <div style={{fontSize:'.85rem',fontWeight:700,color:o.urg?'#e03030':'#071830'}}>{o.importe}</div>
              <span className={`badge ${o.urg?'b-red':'b-blue'}`}>{o.urg?'Urgente':'Próximo'}</span>
            </div>
          ))}
          <IaBox><strong>KonGest IA te avisará 6 semanas antes</strong> de cada vencimiento con el importe exacto. Sin sorpresas.</IaBox>
        </Card>
        <Card title="Alertas de tu asesor" ia>
          <Alert tone="red" title="Mod. 303 — vence el 20 de marzo" sub="4.280€ a ingresar · Borrador listo · Solo necesitas dar el OK"
                 actions={<TblBtn label="Firmar" variant="red" onClick={() => clAct('firmar','Mod. 303 Q1 · 4.280€')} />} />
          <Alert tone="green" title="IA detectó deducción aplicable"
                 sub="Gastos en software cualifican como I+D. Ahorro potencial: 2.800€ · En tramitación"
                 actions={<TblBtn label="Ver detalle" variant="green" onClick={() => goTo?.('cl-ahorro')} />} />
          <Alert tone="blue" title="IS 2026 — borrador listo con deducciones IA"
                 sub="Cuota estimada: 9.000€ vs 22.000€ sin optimización · Ahorro: 13.000€" />
          <Alert tone="amber" title="Cambio normativo aplicado"
                 sub="DGT V0142-25 deducción vehículos · Tu ficha actualizada automáticamente" />
        </Card>
      </div>
      <div className="g2">
        <Card title="Mi facturación vs carga fiscal 2026">
          <div style={{display:'flex',alignItems:'flex-end',gap:8,height:120,margin:'10px 0'}}>
            {BARS.map(([m,f,h],i) => (
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,height:'100%',justifyContent:'flex-end'}}>
                <div style={{fontSize:'.58rem',color:'#7a8899'}}>{f}</div>
                <div style={{width:'100%',height:`${h||4}%`,background:h?'linear-gradient(180deg,#1A78FF,#0D55CC)':'#E8EFF8',borderRadius:'3px 3px 0 0',position:'relative'}}>
                  {h ? <div style={{position:'absolute',bottom:0,left:0,right:0,height:'28%',background:'rgba(224,48,48,.4)',borderRadius:'0 0 3px 3px'}}/> : null}
                </div>
                <div style={{fontSize:'.58rem',color:'#7a8899'}}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:10,background:'#1A78FF',borderRadius:2}}/><span style={{fontSize:'.65rem',color:'#7a8899'}}>Facturación</span></div>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:10,background:'rgba(224,48,48,.5)',borderRadius:2}}/><span style={{fontSize:'.65rem',color:'#7a8899'}}>Carga fiscal</span></div>
          </div>
        </Card>
        <Card title="Resumen fiscal Q1 2026">
          {RESUMEN_Q1.map(([k,v,c]) => <InfoRow key={k} label={k} value={v} color={c} />)}
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 2. IVA ═══════════════ */
const IVA_REP = [['IVA 21% — Servicios generales','12.600€'],['IVA 10% — Servicios reducidos','3.360€']]
const IVA_SOP = [['Servicios profesionales','4.840€'],['Suministros y oficina','2.240€'],['Software y licencias','1.960€'],['Otros gastos deducibles','2.640€']]
const IVA_PROY = [['Q1 2026 (actual)','4.280€','#e03030',true],['Q2 2026 (previsión IA)','~4.100€','#e8a010',false],['Q3 2026 (previsión IA)','~4.600€','#e8a010',false],['Q4 2026 (previsión IA)','~5.200€','#1A78FF',false]]

export function ClIVA() {
  return (
    <>
      <PageHdr title="Mi IVA en tiempo real" sub="Cuánto IVA debes en este momento — actualizado con cada factura" />
      <KpiGrid items={[
        {value:'4.280€',label:'IVA Q1 a ingresar',delta:'▼ Vence 20 Mar',deltaDir:'down',kc:'#e03030'},
        {value:'15.960€',label:'IVA repercutido',delta:'▲ Facturas emitidas',deltaDir:'up',kc:'#1A78FF'},
        {value:'11.680€',label:'IVA soportado',delta:'▲ Facturas recibidas',deltaDir:'up',kc:'#1a9e4a'},
        {value:'~4.100€',label:'IVA estimado Q2',delta:'→ Previsión IA',deltaDir:'neutral',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Desglose IVA Q1 2026" ia>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:4}}>
            <div style={{background:'#F4F7FC',borderRadius:8,padding:12}}>
              <div style={{fontSize:'.6rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8}}>IVA repercutido (ventas)</div>
              {IVA_REP.map(([c,v]) => (
                <div key={c} style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <span style={{fontSize:'.72rem',color:'#1a2a3a'}}>{c}</span>
                  <span style={{fontSize:'.72rem',fontWeight:700,color:'#1A78FF'}}>{v}</span>
                </div>
              ))}
              <div style={{borderTop:'1px solid #E0E8F4',paddingTop:7,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'.74rem',fontWeight:700,color:'#071830'}}>Total repercutido</span>
                <span style={{fontSize:'.8rem',fontWeight:800,color:'#1A78FF'}}>15.960€</span>
              </div>
            </div>
            <div style={{background:'#F4F7FC',borderRadius:8,padding:12}}>
              <div style={{fontSize:'.6rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8}}>IVA soportado deducible (compras)</div>
              {IVA_SOP.map(([c,v]) => (
                <div key={c} style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <span style={{fontSize:'.72rem',color:'#1a2a3a'}}>{c}</span>
                  <span style={{fontSize:'.72rem',fontWeight:700,color:'#1a9e4a'}}>{v}</span>
                </div>
              ))}
              <div style={{borderTop:'1px solid #E0E8F4',paddingTop:7,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'.74rem',fontWeight:700,color:'#071830'}}>Total soportado</span>
                <span style={{fontSize:'.8rem',fontWeight:800,color:'#1a9e4a'}}>11.680€</span>
              </div>
            </div>
            <div style={{background:'#FDECEA',borderRadius:8,padding:12,border:'1px solid rgba(224,48,48,.2)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6}}>
                <span style={{fontSize:'.84rem',fontWeight:700,color:'#071830'}}>IVA a ingresar Q1</span>
                <span style={{fontSize:'1.4rem',fontWeight:900,color:'#e03030',fontFamily:'Barlow Condensed,sans-serif'}}>4.280€</span>
              </div>
              <div style={{fontSize:'.65rem',color:'#e03030',marginTop:3}}>Vencimiento: 20 de marzo de 2026</div>
            </div>
          </div>
          <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-blue" onClick={() => clAct('firmar','Mod. 303 Q1 · 4.280€')}>Firmar Mod. 303</button>
            <button className="btn btn-outline" onClick={() => clAct('descarga','desglose IVA Q1')}>Descargar desglose</button>
          </div>
        </Card>
        <Card title="Evolución IVA 2026" ia>
          {IVA_PROY.map(([p,v,c,a]) => (
            <div key={p} style={{display:'flex',alignItems:'center',gap:10,padding:10,borderRadius:8,background:a?'rgba(224,48,48,.05)':'#F4F7FC',border:`1px solid ${a?'rgba(224,48,48,.2)':'var(--border2)'}`,marginBottom:8,flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:140,fontSize:'.75rem',color:'#1a2a3a',fontWeight:a?700:400}}>{p}</div>
              <div style={{fontSize:'.9rem',fontWeight:900,color:c,fontFamily:'Barlow Condensed,sans-serif'}}>{v}</div>
              <span className={`badge ${a?'b-red':'b-blue'}`}>{a?'Urgente':'Estimado'}</span>
            </div>
          ))}
          <IaBox><strong>KonGest IA actualiza tu IVA en tiempo real</strong> con cada factura. Sabes exactamente cuánto debes sin esperar al trimestre.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 3. IRPF ═══════════════ */
const IRPF_RET = [['Enero 2026','20.800€','3.120€','b-ok','Presentado'],['Febrero 2026','24.600€','3.690€','b-ok','Presentado'],['Marzo 2026','30.600€','4.590€','b-amber','Pendiente']]
const IS_DESGLOSE = [
  ['Resultado contable 2026','88.000€','#071830'],
  ['Ajuste I+D (IA detectó)','−18.666€','#1a9e4a'],
  ['Reserva capitalización','−22.000€','#1a9e4a'],
  ['Base imponible final','47.334€','#1A78FF'],
  ['Cuota íntegra (25%)','11.833€','#e8a010'],
  ['Deducciones adicionales','−2.800€','#1a9e4a'],
  ['Cuota líquida final','9.033€','#e03030'],
  ['Retenciones a cuenta','−3.120€','#1a9e4a'],
  ['A ingresar estimado','5.913€','#e03030'],
]

export function ClIRPF() {
  return (
    <>
      <PageHdr title="Mi IRPF acumulado" sub="Retenciones practicadas y estimación de tu declaración anual" />
      <IaTicker messages={TICKER_CL} />
      <KpiGrid items={[
        {value:'3.120€',label:'Retenciones acumuladas',delta:'▲ A cuenta del IS',deltaDir:'up',kc:'#1A78FF'},
        {value:'15%',label:'Tipo retención aplicado',delta:'→ Facturas emitidas',deltaDir:'neutral',kc:'#e8a010'},
        {value:'9.000€',label:'IS 2026 con deducciones',delta:'▲ vs 22.000€ sin IA',deltaDir:'up',kc:'#1a9e4a'},
        {value:'−13.000€',label:'Ahorro deducciones IA',delta:'▲ Detectadas auto.',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Retenciones practicadas 2026">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Mes</th><th>Facturación</th><th>Retención 15%</th><th>Estado</th><th></th></tr></thead>
              <tbody>
                {IRPF_RET.map(([m,f,r,b,e]) => (
                  <tr key={m}>
                    <td><strong>{m}</strong></td>
                    <td style={{color:'#7a8899'}}>{f}</td>
                    <td style={{color:'#1A78FF',fontWeight:700}}>{r}</td>
                    <td><span className={`badge ${b}`}>{e}</span></td>
                    <td><TblBtn label={b==='b-ok'?'Ver':'Aplicar'} variant={b==='b-ok'?'blue':'amber'} onClick={() => clAct(b==='b-ok'?'descarga':'firmar',`Retención ${m}`)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="IS 2026 — con deducciones IA" ia>
          {IS_DESGLOSE.map(([k,v,c]) => <InfoRow key={k} label={k} value={v} color={c} />)}
          <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-blue" onClick={() => clAct('draft','Borrador IS 2026')}>Ver borrador IS</button>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 4. FACTURAS ═══════════════ */
const FACTS = [
  ['FAC-2026-0142','Distribuciones Cano','Consultoría fiscal Q1','4.840,00€','14 Mar','b-ok','Cobrada'],
  ['FAC-2026-0141','Servicios Integrales','Asesoría mensual','2.420,00€','10 Mar','b-ok','Cobrada'],
  ['FAC-2026-0140','Talleres Martínez','Contabilidad Feb','1.815,00€','05 Mar','b-amber','Pendiente'],
  ['FAC-2026-0139','Hostelería del Norte','Consultoría laboral','3.630,00€','01 Mar','b-amber','Pendiente'],
  ['FAC-2026-0138','Clínica Dental Ruiz','Asesoría fiscal','2.178,00€','24 Feb','b-red','Vencida'],
  ['FAC-2026-0137','Farmacia López','Contabilidad Ene','1.694,00€','20 Feb','b-ok','Cobrada'],
]

export function ClFacturas() {
  return (
    <>
      <PageHdr title="Mis facturas" sub="Facturas emitidas y recibidas — procesadas automáticamente por KonGest IA" />
      <IaTicker messages={TICKER_CL} />
      <KpiGrid items={[
        {value:'284',label:'Facturas este trimestre',delta:'▲ 268 auto-procesadas',deltaDir:'up',kc:'#1A78FF'},
        {value:'76.000€',label:'Facturado Q1 2026',delta:'▲ +18% vs Q1 anterior',deltaDir:'up',kc:'#1a9e4a'},
        {value:'3',label:'Pendientes de cobro',delta:'→ Recordatorio enviado',deltaDir:'neutral',kc:'#e8a010'},
        {value:'1',label:'Vencida impagada',delta:'▼ Gestión activa',deltaDir:'down',kc:'#e03030'},
      ]} />
      <Card title="Mis últimas facturas emitidas">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Nº Factura</th><th>Cliente</th><th>Concepto</th><th>Importe</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {FACTS.map(([n,c,co,i,f,b,e]) => (
                <tr key={n}>
                  <td style={{color:'#1A78FF',fontSize:'.7rem',fontWeight:700}}>{n}</td>
                  <td><strong>{c}</strong></td>
                  <td style={{color:'#7a8899',fontSize:'.72rem'}}>{co}</td>
                  <td style={{fontWeight:700,color:'#1a9e4a'}}>{i}</td>
                  <td style={{color:'#7a8899',fontSize:'.7rem'}}>{f}</td>
                  <td><span className={`badge ${b}`}>{e}</span></td>
                  <td><TblBtn label={b==='b-red'?'Reclamar':b==='b-amber'?'Recordar':'Ver'} variant={b==='b-red'?'red':b==='b-amber'?'amber':'blue'} onClick={() => clAct(b==='b-ok'?'descarga':'contacto',`Factura ${n}`)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/* ═══════════════ 5. DOCUMENTOS ═══════════════ */
const CL_DECL = [
  ['303','IVA Q4 2026','20 Ene','A ingresar 3.840€','b-ok'],
  ['111','Retenciones Dic 2025','20 Ene','A ingresar 980€','b-ok'],
  ['390','Resumen anual IVA','30 Ene','Informativo','b-ok'],
  ['190','Resumen anual IRPF','31 Ene','Informativo','b-ok'],
  ['303','IVA Q1 2026','—','Pendiente 20 Mar','b-amber'],
  ['111','Retenciones Feb 2026','—','Pendiente 20 Mar','b-amber'],
]

export function ClDocumentos() {
  const [drag, setDrag] = useState(false)
  return (
    <>
      <PageHdr title="Mis documentos" sub="Toda tu documentación fiscal organizada por KonGest IA" />
      <IaTicker messages={TICKER_CL} />
      <KpiGrid items={[
        {value:'142',label:'Documentos totales',delta:'▲ Todos indexados',deltaDir:'up',kc:'#1A78FF'},
        {value:'18',label:'Declaraciones presentadas',delta:'▲ Este ejercicio',deltaDir:'up',kc:'#1a9e4a'},
        {value:'4',label:'Pendientes firma',delta:'→ Tu asesor los tiene',deltaDir:'neutral',kc:'#e8a010'},
        {value:'0',label:'Notificaciones AEAT',delta:'▲ Sin incidencias',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Declaraciones presentadas 2026">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Modelo</th><th>Concepto</th><th>Fecha</th><th>Resultado</th><th></th></tr></thead>
              <tbody>
                {CL_DECL.map(([m,c,f,r,b]) => (
                  <tr key={m+c}>
                    <td style={{color:'#1A78FF',fontWeight:700}}>{m}</td>
                    <td style={{fontSize:'.75rem'}}>{c}</td>
                    <td style={{color:'#7a8899',fontSize:'.7rem'}}>{f}</td>
                    <td style={{fontSize:'.7rem',color:b==='b-ok'?'#7a8899':'#e8a010'}}>{r}</td>
                    <td><TblBtn label={b==='b-ok'?'PDF':'Firmar'} variant={b==='b-ok'?'blue':'amber'} onClick={() => clAct(b==='b-ok'?'descarga':'firmar',`Mod. ${m} ${c}`)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Subir documento">
          <button onClick={() => showToast('Documento subido · OCR IA clasificando · avisaré a tu asesor si requiere acción','ok')}
                  onMouseEnter={() => setDrag(true)} onMouseLeave={() => setDrag(false)}
                  style={{width:'100%',border:`2px dashed ${drag?'#1A78FF':'#E0E8F4'}`,borderRadius:10,padding:28,textAlign:'center',background:drag?'#EEF5FF':'#F8FBFF',cursor:'pointer',transition:'all .2s',marginBottom:12,fontFamily:'DM Sans,sans-serif'}}>
            <div style={{fontSize:'.8rem',fontWeight:700,color:'#071830',marginBottom:4}}>Arrastra tu documento aquí</div>
            <div style={{fontSize:'.7rem',color:'#7a8899'}}>KonGest IA lo clasifica y avisa a tu asesor</div>
          </button>
          <IaBox>Sube cualquier factura o documento y KonGest IA lo clasifica, indexa y avisa a tu asesor si requiere acción.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 6. PREVISIÓN ═══════════════ */
const PREV_CAL = [
  {mes:'Marzo 2026',items:[['Mod. 303 IVA Q1','4.280€','#e03030',true],['Mod. 111 Retenciones','840€','#e03030',true]]},
  {mes:'Junio 2026',items:[['Mod. 303 IVA Q2','~4.100€','#e8a010',false],['Mod. 202 Pago fracc. IS','~5.500€','#e8a010',false]]},
  {mes:'Julio 2026',items:[['Mod. 200 IS 2026','~9.000€','#1A78FF',false]]},
  {mes:'Septiembre 2026',items:[['Mod. 303 IVA Q3','~4.600€','#7a8899',false]]},
]

export function ClPrevision() {
  return (
    <>
      <PageHdr title="Previsión trimestral"
               sub="KonGest IA calcula cuánto vas a pagar 6 semanas antes del vencimiento"
               actions={[<span key="b" className="badge b-blue">IA · 6 semanas antes</span>]} />
      <KpiGrid items={[
        {value:'5.120€',label:'Total vence 20 Mar',delta:'▼ En 6 días',deltaDir:'down',kc:'#e03030'},
        {value:'~9.600€',label:'Total vence 20 Jun',delta:'→ Previsión IA',deltaDir:'neutral',kc:'#e8a010'},
        {value:'~9.000€',label:'IS 2026 a ingresar',delta:'▲ Con deducciones IA',deltaDir:'up',kc:'#1A78FF'},
        {value:'9.500€',label:'Ahorro total IA 2026',delta:'▲ Deducciones aplicadas',deltaDir:'up',kc:'#1a9e4a'},
      ]} />
      <div className="g2">
        <Card title="Calendario de pagos 2026" ia>
          {PREV_CAL.map(g => (
            <div key={g.mes} style={{border:'1px solid var(--border2)',borderRadius:8,overflow:'hidden',marginBottom:8}}>
              <div style={{padding:'7px 12px',background:'#F4F7FC',fontSize:'.66rem',fontWeight:700,color:'#071830',textTransform:'uppercase',letterSpacing:'.08em'}}>{g.mes}</div>
              {g.items.map(([c,v,col,urg]) => (
                <div key={c} style={{display:'flex',justifyContent:'space-between',padding:'8px 12px',borderTop:'1px solid var(--border2)',background:urg?'rgba(224,48,48,.03)':'transparent',flexWrap:'wrap',gap:6}}>
                  <span style={{fontSize:'.72rem',color:'#1a2a3a'}}>{c}</span>
                  <span style={{fontSize:'.76rem',fontWeight:700,color:col}}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </Card>
        <Card title="Cómo reducir tu carga fiscal" ia>
          <Alert tone="green" title="Deduce gastos de software — ahorro 2.800€"
                 sub="Tus licencias cualifican como I+D. Tu asesor está tramitando la deducción"
                 actions={<TblBtn label="Ver trámite" variant="green" onClick={() => clAct('aplicar','Deducción I+D software')} />} />
          <Alert tone="green" title="Reserva de capitalización — ahorro 5.500€"
                 sub="Con tus fondos propios puedes aplicar la reserva en IS 2026. Aplicado al borrador"
                 actions={<TblBtn label="Ver en IS" variant="green" onClick={() => clAct('aplicar','Reserva capitalización')} />} />
          <Alert tone="blue" title="Amortización acelerada vehículo — ahorro 1.200€"
                 sub="El vehículo 2026 puede amortizarse al 100% este ejercicio"
                 actions={<TblBtn label="Aplicar" onClick={() => clAct('aplicar','Amortización acelerada')} />} />
          <IaBox><strong>Total ahorro detectado: 9.500€.</strong> KonGest IA los está tramitando automáticamente con tu asesor.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 7. SIMULADOR (cliente · interactivo) ═══════════════ */
function computeClScenario(tipo, mag) {
  const round = n => Math.round(n).toLocaleString('es-ES')
  switch(tipo) {
    case 'facturacion':
      return {t:`Facturar ${round(mag)}€ más`,sub:'Impacto en IVA e IS',
        k1:'+'+round(mag*0.21*0.27)+'€',k1l:'IVA adicional',k1c:'#e03030',k1b:'#FDECEA',
        k2:'+'+round(mag*0.25*0.85)+'€',k2l:'IS adicional',k2c:'#e8a010',k2b:'#FDF3E7',
        k3:'+'+round(mag*0.54)+'€',k3l:'Neto en bolsillo',k3c:'#1A78FF',k3b:'#EEF5FF',
        k4:Math.round((1-0.54)*100)+'%',k4l:'Tipo efectivo',k4c:'#071830',k4b:'#F4F7FC',
        ok:true,rec:`Por cada ${round(mag)}€ facturados te quedan ${round(mag*0.54)}€ netos después de todos los impuestos.`}
    case 'contratar': {
      const ok = mag <= 50000
      return {t:`Contratar empleado a ${round(mag)}€/año`,sub:'Ahorro fiscal vs coste SS',
        k1:'−'+round(mag*0.25)+'€',k1l:'Ahorro IS',k1c:'#1A78FF',k1b:'#EEF5FF',
        k2:'+'+round(mag*0.305)+'€',k2l:'Coste SS empresa',k2c:'#e8a010',k2b:'#FDF3E7',
        k3:'+'+round(mag*0.25)+'€',k3l:'Ahorro fiscal neto',k3c:'#1a9e4a',k3b:'#EBF5EF',
        k4:(Math.round(14*100000/mag)/10)+' m.',k4l:'Umbral rentabilidad',k4c:'#071830',k4b:'#F4F7FC',
        ok,rec:ok ? `Contratación rentable. El ahorro IS de ${round(mag*0.25)}€ compensa parte del coste SS.` : 'Coste elevado. Revisa si el retorno justifica la inversión.'}
    }
    case 'coche':
      return {t:`Vehículo empresa ${round(mag)}€`,sub:'IVA deducible y ahorro IS',
        k1:'+'+round(mag*0.5)+'€',k1l:'IVA deducible',k1c:'#1a9e4a',k1b:'#EBF5EF',
        k2:'−'+round(mag*0.25/10)+'€/año',k2l:'Amortización anual',k2c:'#1A78FF',k2b:'#EEF5FF',
        k3:round(mag*0.5+mag*0.025*5)+'€',k3l:'Ahorro fiscal total 5 años',k3c:'#1a9e4a',k3b:'#EBF5EF',
        k4:'10 años',k4l:'Vida útil fiscal',k4c:'#071830',k4b:'#F4F7FC',
        ok:true,rec:'Deducible al 50% de IVA y amortizable en IS. KonGest IA aplicará amortización acelerada si es posible.'}
    case 'oficina':
      return {t:`Alquiler oficina ${round(mag)}€/año`,sub:'Deducibilidad total del gasto',
        k1:'+'+round(mag*0.21)+'€',k1l:'IVA deducible',k1c:'#1a9e4a',k1b:'#EBF5EF',
        k2:'−'+round(mag*0.25)+'€',k2l:'Ahorro IS',k2c:'#1A78FF',k2b:'#EEF5FF',
        k3:round(mag*0.46)+'€',k3l:'Coste real tras impuestos',k3c:'#e8a010',k3b:'#FDF3E7',
        k4:Math.round((1-0.46)*100)+'%',k4l:'Porcentaje recuperable',k4c:'#071830',k4b:'#F4F7FC',
        ok:true,rec:`100% deducible. El coste real tras impuestos es solo el ${Math.round((1-0.46)*100)}% del importe bruto.`}
    case 'dividendo': {
      const ok = mag <= 25000
      return {t:`Dividendos ${round(mag)}€`,sub:'Retención IRPF y neto socio',
        k1:'−'+round(mag*0.19)+'€',k1l:'Retención IRPF 19%',k1c:'#e03030',k1b:'#FDECEA',
        k2:'+'+round(mag*0.81)+'€',k2l:'Dividendo neto socio',k2c:'#1a9e4a',k2b:'#EBF5EF',
        k3:'+'+round(mag*0.025)+'€',k3l:'Ahorro vs nómina',k3c:'#1A78FF',k3b:'#EEF5FF',
        k4:'19%',k4l:'Tipo efectivo',k4c:'#071830',k4b:'#F4F7FC',
        ok,rec:ok ? 'Reparto óptimo. Tributa al 19% vs hasta 47% en nómina.' : 'Importe elevado. Considera distribuir en dos ejercicios para optimizar el tipo.'}
    }
    default: return null
  }
}

export function ClSimulador() {
  const [tipo, setTipo] = useState('facturacion')
  const [mag, setMag] = useState(10000)
  const s = computeClScenario(tipo, mag) || {}

  return (
    <>
      <PageHdr title="Mi simulador fiscal"
               sub="¿Qué pasa si facturo más? ¿Si contrato a alguien? KonGest IA te responde en segundos"
               actions={[<span key="b" className="badge b-blue">IA · Tiempo real</span>]} />
      <div className="g2">
        <Card title="Simula una decisión" ia>
          <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:4}}>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>¿Qué quieres simular?</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value="facturacion">Facturar más este trimestre</option>
                <option value="contratar">Contratar un empleado</option>
                <option value="coche">Comprar un vehículo de empresa</option>
                <option value="oficina">Alquilar una oficina</option>
                <option value="dividendo">Repartir dividendos</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.6rem',fontWeight:700,color:'#7a8899',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Importe</label>
              <select value={mag} onChange={e => setMag(parseInt(e.target.value))} style={{width:'100%',padding:'10px 14px',background:'#F4F7FC',border:'1.5px solid #E0E8F4',borderRadius:8,fontSize:'.85rem',fontFamily:'DM Sans,sans-serif',color:'#071830',outline:'none'}}>
                <option value={10000}>10.000€</option>
                <option value={25000}>25.000€</option>
                <option value={50000}>50.000€</option>
                <option value={100000}>100.000€</option>
              </select>
            </div>
            <button onClick={() => showToast(`Simulación · ${s.t} · ${s.ok ? 'recomendado' : 'revisar'}`, s.ok?'ok':'warn')}
                    style={{width:'100%',padding:13,background:'linear-gradient(135deg,#1A78FF,#0D55CC)',border:'none',borderRadius:8,color:'#fff',fontFamily:'Barlow Condensed,sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:'.1em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 6px 20px rgba(26,120,255,.3)'}}>
              Simular con KonGest IA
            </button>
          </div>
        </Card>
        <Card title="Resultado" ia>
          <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'.95rem',fontWeight:900,color:'#1A78FF',marginBottom:4,textTransform:'uppercase'}}>{s.t}</div>
          <div style={{fontSize:'.68rem',color:'#7a8899',marginBottom:14}}>{s.sub}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
            {[[s.k1,s.k1l,s.k1c,s.k1b],[s.k2,s.k2l,s.k2c,s.k2b],[s.k3,s.k3l,s.k3c,s.k3b],[s.k4,s.k4l,s.k4c,s.k4b]].map(([v,l,c,b],i) => (
              <div key={i} style={{background:b,borderRadius:8,padding:11,textAlign:'center'}}>
                <div style={{fontSize:'.56rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:3}}>{l}</div>
                <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.4rem',fontWeight:900,color:c,wordBreak:'break-word'}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="ia-box" style={{background:s.ok?'rgba(26,158,74,.06)':'rgba(232,160,16,.07)'}}>
            <div className="ia-box-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A78FF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
            </div>
            <div className="ia-box-text"><strong>{s.ok?'KonGest IA recomienda:':'KonGest IA advierte:'}</strong> {s.rec}</div>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 8. SCORE ═══════════════ */
const SCORE_BREAKDOWN = [
  ['Cumplimiento declaraciones',100,'#1a9e4a'],
  ['Puntualidad de pagos',92,'#1a9e4a'],
  ['Ratio IVA',84,'#1a9e4a'],
  ['Coherencia contable',88,'#1a9e4a'],
  ['Riesgo inspección AEAT',78,'#e8a010'],
  ['Optimización fiscal',72,'#e8a010'],
]

export function ClScore() {
  return (
    <>
      <PageHdr title="Score de salud fiscal"
               sub="KonGest IA evalúa tu posición fiscal en tiempo real"
               actions={[<span key="b" className="badge b-ok">88 / 100 — Muy buena</span>]} />
      <div className="g2 mb14">
        <Card style={{textAlign:'center',padding:32}}>
          <div style={{position:'relative',width:160,height:160,margin:'0 auto 20px'}}>
            <svg viewBox="0 0 160 160" style={{transform:'rotate(-90deg)'}}>
              <circle cx="80" cy="80" r="65" fill="none" stroke="#E8EFF8" strokeWidth="14"/>
              <circle cx="80" cy="80" r="65" fill="none" stroke="url(#sg)" strokeWidth="14" strokeLinecap="round" strokeDasharray="408.4" strokeDashoffset="49"/>
              <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1A78FF"/><stop offset="100%" stopColor="#00C8FF"/></linearGradient></defs>
            </svg>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'2.8rem',fontWeight:900,color:'#071830',lineHeight:1}}>88</div>
              <div style={{fontSize:'.65rem',color:'#7a8899',fontWeight:600}}>/100</div>
            </div>
          </div>
          <div style={{fontSize:'1.1rem',fontWeight:700,color:'#1a9e4a',marginBottom:4}}>Salud fiscal: Muy buena</div>
          <div style={{fontSize:'.75rem',color:'#7a8899'}}>Actualizado por KonGest IA en tiempo real</div>
        </Card>
        <Card title="Desglose del score" ia>
          {SCORE_BREAKDOWN.map(([c,v,col]) => (
            <div key={c} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontSize:'.72rem',color:'#1a2a3a'}}>{c}</span>
                <span style={{fontSize:'.72rem',fontWeight:700,color:col}}>{v}/100</span>
              </div>
              <Pbar pct={v} color={col} />
            </div>
          ))}
          <IaBox><strong>Para subir a 95+:</strong> Aplicar las 3 deducciones IA mejoraría tu score de optimización de 72 a 94.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 9. AHORRO FISCAL IA ═══════════════ */
const AHORRO_DET = [
  {cat:'Deducciones fiscales',items:[
    ['I+D software y licencias','2.800€','#1a9e4a','Aplicado'],
    ['Reserva capitalización IS','5.500€','#1a9e4a','Aplicado'],
    ['Amortización vehículo acelerada','1.200€','#1a9e4a','Aplicado'],
  ]},
  {cat:'Optimizaciones operativas',items:[
    ['Reclasificación de gastos IA','1.800€','#1A78FF','Activa'],
    ['Aplicación DGT V0142-25','480€','#1A78FF','Automática'],
    ['Régimen pyme vs general','1.220€','#1A78FF','En revisión'],
  ]},
]

export function ClAhorro() {
  return (
    <>
      <PageHdr title="Mi ahorro fiscal IA"
               sub="Todo lo que KonGest IA te ha ahorrado este año — concreto, detallado, medible"
               actions={[<span key="b" className="badge b-ok">13.000€ anuales</span>]} />
      <KpiGrid items={[
        {value:'13.000€',label:'Ahorro anual aplicado',delta:'▲ Optimización total',deltaDir:'up',kc:'#1a9e4a'},
        {value:'9.500€',label:'Deducciones activas',delta:'▲ I+D, reserva, vehículo',deltaDir:'up',kc:'#1A78FF'},
        {value:'3.500€',label:'Ahorros operativos',delta:'▲ Reclasificaciones',deltaDir:'up',kc:'#00C8FF'},
        {value:'47%',label:'Reducción IS 2026',delta:'▲ 22k€ → 9k€',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2 mb14">
        <Card title="Desglose del ahorro IA" ia>
          {AHORRO_DET.map(g => (
            <div key={g.cat} style={{marginBottom:14}}>
              <div style={{fontSize:'.62rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'#7a8899',marginBottom:8}}>{g.cat}</div>
              {g.items.map(([n,v,c,e]) => (
                <div key={n} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',background:'#F4F7FC',borderRadius:8,marginBottom:6,alignItems:'center',flexWrap:'wrap',gap:8}}>
                  <div style={{fontSize:'.75rem',color:'#1a2a3a',fontWeight:600,flex:1,minWidth:160}}>{n}</div>
                  <div style={{fontSize:'.85rem',fontWeight:800,color:c,fontFamily:'Barlow Condensed,sans-serif'}}>{v}</div>
                  <span className="badge b-ok">{e}</span>
                </div>
              ))}
            </div>
          ))}
        </Card>
        <Card title="Comparativa con/sin IA" ia>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:4}}>
            <div style={{padding:14,background:'#FDECEA',borderRadius:10}}>
              <div style={{fontSize:'.62rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.12em',marginBottom:6}}>Sin IA · 2026</div>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.8rem',fontWeight:900,color:'#e03030'}}>22.000€</div>
              <div style={{fontSize:'.7rem',color:'#7a8899',marginTop:4}}>IS sin deducciones + gastos no deducidos + retenciones no optimizadas</div>
            </div>
            <div style={{padding:14,background:'#EBF5EF',borderRadius:10}}>
              <div style={{fontSize:'.62rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.12em',marginBottom:6}}>Con KonGest IA · 2026</div>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.8rem',fontWeight:900,color:'#1a9e4a'}}>9.000€</div>
              <div style={{fontSize:'.7rem',color:'#7a8899',marginTop:4}}>IS optimizado + todas las deducciones + monitor normativo continuo</div>
            </div>
            <div style={{padding:14,background:'linear-gradient(135deg,#1A78FF,#0D55CC)',borderRadius:10,color:'#fff'}}>
              <div style={{fontSize:'.62rem',color:'rgba(255,255,255,.6)',textTransform:'uppercase',letterSpacing:'.12em',marginBottom:6}}>Ahorro total IA</div>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'2rem',fontWeight:900}}>13.000€</div>
              <div style={{fontSize:'.7rem',color:'rgba(255,255,255,.7)',marginTop:4}}>Aplicados automáticamente por KonGest IA</div>
            </div>
          </div>
          <div style={{marginTop:14,display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-blue" onClick={() => clAct('descarga','Informe ahorro IA 2026')}>Descargar informe</button>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 10. FUTURO FISCAL ═══════════════ */
export function ClFuturo() {
  return (
    <>
      <PageHdr title="Futuro fiscal"
               sub="Proyección a 12 meses · alertas de cambios normativos · oportunidades detectadas por IA"
               actions={[<span key="b" className="badge b-blue">IA · Horizonte 12m</span>]} />
      <KpiGrid items={[
        {value:'28.500€',label:'Carga fiscal total 2026',delta:'▼ −32% vs 2025',deltaDir:'down',kc:'#1a9e4a'},
        {value:'3',label:'Novedades normativas',delta:'→ Aplicadas',deltaDir:'neutral',kc:'#1A78FF'},
        {value:'2',label:'Oportunidades detectadas',delta:'▲ Revisar',deltaDir:'up',kc:'#e8a010'},
        {value:'1.880€',label:'Ahorro adicional 2026',delta:'▲ A confirmar',deltaDir:'up',kc:'#0D55CC'},
      ]} />
      <div className="g2">
        <Card title="Oportunidades futuras" ia>
          <Alert tone="green" title="Amortización acelerada equipos informáticos · +1.200€"
                 sub="Inversión Q4 2026 cualifica para amortización 100% un año · impacto IS 2026"
                 actions={<TblBtn label="Activar" variant="green" onClick={() => clAct('aplicar','Amortización acelerada equipos')} />} />
          <Alert tone="green" title="Plan pensiones autónomos · +680€"
                 sub="Aportación óptima 5.750€/año · ahorro IRPF 1.150€ · recuperable desde jubilación"
                 actions={<TblBtn label="Simular" variant="green" onClick={() => showToast('Plan pensiones · aportación 5.750€ · ahorro IRPF 1.150€ · simulación completa','info')} />} />
          <Alert tone="blue" title="Régimen pyme vs general · revisión 2027"
                 sub="Si mantienes crecimiento actual, en 2027 podría ser ventajoso régimen general · KonGest IA monitorizando" />
          <Alert tone="amber" title="Obligación Verifactu · Julio 2026"
                 sub="Ya configurado por KonGest IA · cumplimiento activo 100% · sin acción requerida" />
        </Card>
        <Card title="Normativa aplicada a tu ficha" ia>
          {[
            {ref:'DGT V0142-25',desc:'Deducción vehículo empresa 50% → 65% en casos justificados',ahorro:'+480€',cls:'b-ok'},
            {ref:'RD 142/2026',desc:'Tramo IRPF 47% para rentas >300.000€ (no te afecta)',ahorro:'0€',cls:'b-blue'},
            {ref:'LIVA Art.91',desc:'IVA 4% productos básicos alimentación prorrogado',ahorro:'+0€',cls:'b-blue'},
          ].map(n => (
            <div key={n.ref} style={{padding:12,border:'1px solid var(--border2)',borderRadius:8,marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                <span style={{fontSize:'.75rem',fontWeight:700,color:'#1A78FF'}}>{n.ref}</span>
                <span style={{fontSize:'.72rem',fontWeight:700,color:'#1a9e4a'}}>{n.ahorro}</span>
                <span className={`badge ${n.cls}`} style={{marginLeft:'auto'}}>Aplicado</span>
              </div>
              <div style={{fontSize:'.72rem',color:'#7a8899'}}>{n.desc}</div>
            </div>
          ))}
          <IaBox><strong>KonGest IA monitoriza 24/7</strong> el BOE, la AEAT y la DGT — aplicando a tu ficha las novedades que te benefician sin que tengas que seguir nada.</IaBox>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ 11. MI ASESOR (bandeja proactiva) ═══════════════ */
const CL_MSGS = [
  {canal:'chat',av:'LS',avCol:'#1A78FF',nombre:'Laura Sánchez · Tu asesora',sub:'Hoy 10:15 · Activa',msgs:[
    {de:'Laura S.',txt:'Hola, el borrador del Mod. 303 ya está listo. Cuota: 4.280€. Puedes revisarlo en tu portal.',hora:'10:15',tuyo:false,col:'#1A78FF'},
    {de:'TechPyme',txt:'Perfecto, lo reviso hoy.',hora:'10:20',tuyo:true},
    {de:'',txt:'Recordatorio automático: vencimiento Mod. 303 en 8 días · Importe 4.280€ · Lista para presentar',hora:'10:00',ia:true},
  ]},
  {canal:'email',av:'LS',avCol:'#1A78FF',nombre:'Notificación IA · IS 2026',sub:'Hoy 09:00 · Automática',msgs:[
    {de:'',txt:'Buenas noticias: KonGest IA ha detectado 13.000€ en deducciones para tu IS 2026. Cuota final estimada: 9.000€ (vs 22.000€ sin optimización). Tu asesora lo ha incluido en el borrador.',hora:'09:00',ia:true},
    {de:'TechPyme',txt:'Muchas gracias, excelente noticia.',hora:'09:05',tuyo:true},
  ]},
  {canal:'email',av:'LS',avCol:'#1A78FF',nombre:'Alerta normativa · DGT',sub:'Ayer 14:30 · Automática',msgs:[
    {de:'',txt:'Cambio normativo aplicado: DGT V0142-25 permite deducir el 65% de gastos de vehículo (antes 50%). Tu ficha fiscal ha sido actualizada automáticamente. Ahorro adicional: 480€.',hora:'14:30',ia:true},
  ]},
  {canal:'voz',av:'LS',avCol:'#1A78FF',nombre:'Llamada · Consulta IVA',sub:'Ayer 11:00 · Gestionada IA',msgs:[
    {de:'',txt:'Llamada entrante gestionada por KonGest IA · consulta: cuánto IVA debo en Q1 · respuesta: 4.280€ · vence 20 Mar · satisfacción confirmada.',hora:'11:00',ia:true},
  ]},
]

const CC = {voz:'#FF6B2B',chat:'#25D366',email:'#378ADD'}

export function ClCom() {
  const [active, setActive] = useState(0)
  const current = CL_MSGS[active]

  return (
    <>
      <PageHdr title="Mi comunicación con el despacho"
               sub="Todo lo que tu asesor y KonGest IA te comunican — en un único panel siempre actualizado"
               actions={[<span key="b" className="badge b-blue">IA Multicanal</span>]} />
      <div style={{background:'linear-gradient(90deg,#071830,#1A78FF)',borderRadius:8,padding:'9px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#00C8FF',animation:'dotPulse 1.2s infinite',flexShrink:0}}/>
        <div style={{fontSize:'.62rem',fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.1em',flexShrink:0}}>IA LIVE</div>
        <div style={{fontSize:'.7rem',color:'#fff'}}>Tu asesora Laura ha revisado tu borrador · Todo en orden para el 20 Mar</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:13,height:520}}>
        <Card style={{display:'flex',flexDirection:'column',padding:12,overflow:'hidden'}}>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:5}}>
            {CL_MSGS.map((c, i) => (
              <div key={i} onClick={() => setActive(i)}
                   style={{display:'flex',alignItems:'center',gap:8,padding:'8px 9px',borderRadius:8,border:`1px solid ${i===active?'#1A78FF':'var(--border2)'}`,background:i===active?'rgba(26,120,255,.05)':'transparent',cursor:'pointer'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:c.avCol,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.55rem',fontWeight:700,color:'#fff',flexShrink:0}}>{c.av}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--dark)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.nombre}</div>
                  <div style={{fontSize:'.58rem',color:'var(--text3)'}}>{c.sub}</div>
                </div>
                <div style={{width:7,height:7,borderRadius:'50%',background:CC[c.canal],flexShrink:0}}/>
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
              <span style={{fontSize:'.6rem',color:'#1a9e4a',fontWeight:600}}>Activa</span>
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
          <div style={{display:'flex',gap:7,padding:'10px 12px',background:'rgba(26,120,255,.05)',border:'1px solid rgba(26,120,255,.15)',borderRadius:8,alignItems:'center'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'#1a9e4a',animation:'dotPulse 1.5s infinite',flexShrink:0}}/>
            <div style={{fontSize:'.68rem',color:'var(--text2)',lineHeight:1.45,flex:1}}>
              KonGest IA mantiene esta bandeja actualizada en tiempo real. Tu asesora Laura Sánchez recibe cada alerta y te responde sin necesidad de que la contactes. <strong>Próximo contacto programado: revisión Mod. 303 · 12 Mar</strong>.
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

/* ═══════════════ REGISTRY ═══════════════ */
const IC = (d) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>

export const SECTIONS_CLIENTE = [
  { section:'Mi Portal' },
  { id:'cl-dash',       label:'Mi situación fiscal',  ia:true, Component:ClDash,       icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'cl-iva',        label:'Mi IVA en tiempo real', ia:true, Component:ClIVA,        icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'cl-irpf',       label:'Mi IRPF acumulado',    ia:true, Component:ClIRPF,       icon:IC('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2') },
  { id:'cl-facturas',   label:'Mis facturas',         ia:true, Component:ClFacturas,   icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { id:'cl-documentos', label:'Mis documentos',       ia:true, Component:ClDocumentos, icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { section:'Inteligencia IA' },
  { id:'cl-prevision',  label:'Previsión trimestral', ia:true, Component:ClPrevision,  icon:IC('M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6') },
  { id:'cl-simulador',  label:'Simulador fiscal',     ia:true, Component:ClSimulador,  icon:IC('M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42') },
  { id:'cl-score',      label:'Score salud fiscal',   ia:true, Component:ClScore,      icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'cl-ahorro',     label:'Mi ahorro IA',         ia:true, Component:ClAhorro,     icon:IC('M22 12h-4l-3 9L9 3l-3 9H2') },
  { id:'cl-futuro',     label:'Futuro fiscal',        ia:true, Component:ClFuturo,     icon:IC('M22 11.08V12a10 10 0 1 1-5.93-9.14') },
  { section:'Comunicación' },
  { id:'cl-com',        label:'Mi asesor',            ia:true, Component:ClCom,        icon:IC('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z') },
]
