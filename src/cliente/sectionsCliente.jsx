import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, Placeholder } from '../sections/common'
import { showToast } from '../components/Toast'

function ClDash({ goTo }) {
  return (
    <>
      <PageHdr title="Mi situación fiscal" sub="Tu posición fiscal actualizada por KonGest IA en tiempo real — sin llamar a tu asesor"
               badge={{cls:'b-blue',txt:'TechPyme S.L. · Q1 2026'}} />

      <KpiGrid items={[
        { value:'4.280€',label:'Mi IVA Q1',delta:'▼ Vence 20 Mar',deltaDir:'down',kc:'#e03030' },
        { value:'9.000€',label:'Mi IS 2026 previsto',delta:'▲ Ahorro IA 13.000€',deltaDir:'up',kc:'#1a9e4a' },
        { value:'88/100',label:'Score salud fiscal',delta:'▲ +6 vs Q4',deltaDir:'up',kc:'#1A78FF' },
        { value:'13.000€',label:'Ahorro IA anual',delta:'▲ Aplicado',deltaDir:'up',kc:'#00C8FF' },
      ]} />

      <Card title="Próximos vencimientos" ia style={{marginBottom:14}}>
        <Alert tone="red" title="Mod. 303 IVA Q1 · vence 20 Mar"
               sub="A ingresar 4.280€ · borrador IA listo · tu asesora Laura Sánchez lo ha revisado"
               actions={<TblBtn label="Revisar y firmar" variant="red" onClick={() => showToast('Mod. 303 Q1 · 4.280€ · borrador IA listo para tu firma','warn')} />} />
        <Alert tone="amber" title="Mod. 111 Retenciones · vence 20 Mar"
               sub="A ingresar 840€ · retenciones Feb · borrador IA listo"
               actions={<TblBtn label="Revisar y firmar" variant="amber" onClick={() => showToast('Mod. 111 Feb · 840€ retenciones · borrador IA listo','warn')} />} />
        <Alert tone="blue" title="IS 2026 · optimización aplicada"
               sub="KonGest IA detectó 13.000€ en deducciones · cuota estimada: 9.000€ (vs 22.000€ sin IA)"
               actions={<TblBtn label="Ver detalle ahorro" onClick={() => goTo?.('cl-ahorro')} />} />
      </Card>

      <div className="g2 mb14">
        <Card title="Mi IVA en tiempo real" ia>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
            <div>
              <div style={{fontSize:'.6rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:6}}>IVA repercutido Q1</div>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',fontWeight:900,color:'#1A78FF'}}>15.960€</div>
            </div>
            <div>
              <div style={{fontSize:'.6rem',color:'#7a8899',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:6}}>IVA soportado Q1</div>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',fontWeight:900,color:'#1a9e4a'}}>11.680€</div>
            </div>
          </div>
          <div style={{borderTop:'1px solid #E0E8F4',paddingTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:'.74rem',fontWeight:700,color:'#071830'}}>A ingresar</span>
            <span style={{fontSize:'1rem',fontWeight:800,color:'#e03030',fontFamily:'Barlow Condensed,sans-serif'}}>4.280€</span>
          </div>
          <IaBox style={{marginTop:10}}>
            Tu ratio IVA (73%) está dentro del rango óptimo del sector. KonGest IA no ha detectado patrones de riesgo.
          </IaBox>
        </Card>

        <Card title="Acciones rápidas">
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button className="btn btn-blue" onClick={() => goTo?.('cl-iva')}>Ver mi IVA detallado →</button>
            <button className="btn btn-blue" onClick={() => goTo?.('cl-irpf')}>Ver mi IRPF acumulado →</button>
            <button className="btn btn-blue" onClick={() => goTo?.('cl-ahorro')}>Ver ahorro fiscal IA →</button>
            <button className="btn btn-outline" onClick={() => showToast('Mensaje a Laura Sánchez enviado · respuesta en 2h · KonGest IA te notificará','ok')}>Contactar a mi asesora</button>
            <button className="btn btn-outline" onClick={() => showToast('Descargando certificado fiscal IA · PDF con sello temporal · TechPyme S.L.','ok')}>Descargar certificado fiscal</button>
          </div>
        </Card>
      </div>
    </>
  )
}

const ClIVA = () => <Placeholder
  title="Mi IVA en tiempo real"
  sub="Tu IVA repercutido, soportado y a pagar, actualizado cada vez que emites o recibes una factura"
  kpis={[
    {value:'15.960€',label:'Repercutido Q1',delta:'▲ +12% vs Q4',deltaDir:'up',kc:'#1A78FF'},
    {value:'11.680€',label:'Soportado Q1',delta:'▲ Deducible total',deltaDir:'up',kc:'#1a9e4a'},
    {value:'4.280€',label:'A ingresar 20 Mar',delta:'▼ Borrador listo',deltaDir:'down',kc:'#e03030'},
    {value:'73%',label:'Ratio saludable',delta:'▲ vs 68% sector',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>Tu Mod. 303 Q1 está listo con importe exacto <strong>4.280€</strong>. Próximo vencimiento: 20 Marzo. Borrador revisado por Laura Sánchez · solo falta tu firma.</>}
  actions={[
    {label:'Revisar y firmar Mod. 303',toast:'Mod. 303 Q1 · 4.280€ · firmando con certificado digital · presentación AEAT en curso','type':'ok'},
    {label:'Ver desglose IVA completo',toast:'Desglose IVA Q1 · 47 facturas emitidas · 63 gastos deducibles · 0 anomalías','type':'info'},
  ]}
/>

const ClIRPF = () => <Placeholder
  title="Mi IRPF acumulado"
  sub="Tus retenciones profesionales y a cuenta, acumuladas día a día"
  kpis={[
    {value:'1.240€',label:'IRPF Q1 acumulado',delta:'→ En plazo',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'840€',label:'Retenciones Feb',delta:'▼ Vence 20 Mar',deltaDir:'down',kc:'#e8a010'},
    {value:'4.960€',label:'IRPF 2026 estimado',delta:'▲ IA proyección',deltaDir:'up',kc:'#1a9e4a'},
  ]}
  summary={<>Tu Mod. 111 de Febrero está listo para presentar: <strong>840€</strong>. KonGest IA proyecta <strong>4.960€ de IRPF total para 2026</strong> (−340€ vs 2025 por ajuste tramos).</>}
  actions={[
    {label:'Revisar y firmar Mod. 111',toast:'Mod. 111 Feb · 840€ · firmando con certificado digital','type':'ok'},
    {label:'Ver proyección anual',toast:'IRPF 2026 proyectado · 4.960€ · distribución por trimestre disponible','type':'info'},
  ]}
/>

const ClFacturas = () => <Placeholder
  title="Mis facturas"
  sub="Todas tus facturas emitidas y recibidas · verificación automática · alertas de impago"
  kpis={[
    {value:'47',label:'Emitidas Q1',delta:'▲ +8 vs Q4',deltaDir:'up',kc:'#1A78FF'},
    {value:'63',label:'Recibidas Q1',delta:'→ OCR procesado',deltaDir:'neutral',kc:'#1a9e4a'},
    {value:'2',label:'Pendientes cobro',delta:'▼ KonGest IA gestionando',deltaDir:'down',kc:'#e8a010'},
    {value:'100%',label:'Verificadas IA',delta:'▲ Sin anomalías',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>KonGest IA ha procesado <strong>110 documentos</strong> este trimestre (emitidas + recibidas) con OCR y clasificación automática. 2 facturas pendientes de cobro — recordatorios IA enviados.</>}
  actions={[
    {label:'Crear nueva factura',toast:'Nueva factura · formato Verifactu · numeración automática · cliente sugerido por IA','type':'info'},
    {label:'Subir ticket gasto',toast:'Subir ticket · OCR IA extraerá importe, fecha, concepto e IVA automáticamente','type':'info'},
    {label:'Ver pendientes de cobro',toast:'2 facturas pendientes · 3.847€ · recordatorio IA enviado hace 2h','type':'warn'},
  ]}
/>

const ClDocumentos = () => <Placeholder
  title="Mis documentos"
  sub="Contratos, notificaciones AEAT, escrituras, nóminas · todo organizado por IA"
  kpis={[
    {value:'47',label:'Documentos totales',delta:'▲ +5 Q1',deltaDir:'up',kc:'#1A78FF'},
    {value:'0',label:'Sin clasificar',delta:'▲ IA organizó todo',deltaDir:'up',kc:'#1a9e4a'},
    {value:'3',label:'Notificaciones AEAT',delta:'→ Sin acción requerida',deltaDir:'neutral',kc:'#00C8FF'},
  ]}
  summary={<>KonGest IA revisa cada documento que subes, lo clasifica y lo relaciona con tu operativa fiscal. 3 notificaciones AEAT recientes — todas informativas, sin acción requerida.</>}
  actions={[
    {label:'Subir documento',toast:'Arrastra tu documento aquí · OCR IA lo clasificará en la carpeta correcta','type':'info'},
    {label:'Buscar con IA',toast:'Buscador IA · prueba "escrituras constitución 2023" o "facturas proveedor X"','type':'info'},
  ]}
/>

const ClPrevision = () => <Placeholder
  title="Previsión trimestral"
  sub="KonGest IA proyecta tu próximo trimestre con 6 semanas de antelación"
  kpis={[
    {value:'4.820€',label:'IVA Q2 previsto',delta:'▲ +13% vs Q1',deltaDir:'up',kc:'#1A78FF'},
    {value:'2.180€',label:'IRPF Q2 previsto',delta:'▲ +8% vs Q1',deltaDir:'up',kc:'#00C8FF'},
    {value:'7.000€',label:'IS 2026 estimado',delta:'▼ Tras ahorro IA',deltaDir:'down',kc:'#1a9e4a'},
    {value:'94%',label:'Precisión modelo',delta:'▲ basada en tu histórico',deltaDir:'up',kc:'#e8a010'},
  ]}
  summary={<>Tu facturación proyectada en Q2 supera Q1 en un 13%. KonGest IA estima que pagarás <strong>4.820€ de IVA</strong> y <strong>2.180€ de IRPF</strong> — ya está preparando tus borradores.</>}
  actions={[
    {label:'Ver escenario pesimista',toast:'Escenario pesimista · IVA 4.100€ · si facturación baja 10% · aún en margen','type':'info'},
    {label:'Simular gasto importante',toast:'Simulador · calcula impacto fiscal de cualquier gasto > 1.000€ antes de ejecutarlo','type':'info'},
  ]}
/>

const ClSimulador = () => <Placeholder
  title="Simulador fiscal personal"
  sub="Simula decisiones de negocio antes de ejecutarlas — contratación, vehículo, dividendos, oficina"
  kpis={[
    {value:'+8.200€',label:'Mejor escenario',delta:'▲ contratar Q3',deltaDir:'up',kc:'#1a9e4a'},
    {value:'14 m',label:'Umbral rentabilidad',delta:'→ Contratación',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'94%',label:'Precisión modelo',delta:'▲ datos reales',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>Simula escenarios: contratar, vehículo empresa, alquiler oficina, dividendos. KonGest IA calcula impacto exacto en IVA, IS, IRPF y cotizaciones — antes de ejecutarlos.</>}
  actions={[
    {label:'Simular contratación 28.000€',toast:'Simulación · ahorro IS 7.000€ · coste SS +8.540€ · rentable desde mes 14','type':'info'},
    {label:'Simular vehículo 35.000€',toast:'Simulación · IVA deducible 3.675€ · amortización 7.000€/año · recomendado','type':'info'},
  ]}
/>

const ClScore = () => <Placeholder
  title="Score salud fiscal"
  sub="Tu posición fiscal evaluada por KonGest IA en tiempo real · 6 indicadores clave"
  kpis={[
    {value:'88/100',label:'Score global',delta:'▲ +6 vs Q4',deltaDir:'up',kc:'#1A78FF'},
    {value:'100',label:'Cumplimiento',delta:'▲ Máximo',deltaDir:'up',kc:'#1a9e4a'},
    {value:'78',label:'Riesgo AEAT',delta:'▲ Tranquilo',deltaDir:'up',kc:'#00C8FF'},
    {value:'72',label:'Optimización',delta:'→ Revisar',deltaDir:'neutral',kc:'#e8a010'},
  ]}
  summary={<>Tu score de salud fiscal es <strong>88/100</strong>. Para subir a 95+: aplicar las 3 deducciones IA pendientes (I+D software, reserva capitalización, amortización vehículo acelerada) mejoraría tu score de optimización de 72 a 94.</>}
  actions={[
    {label:'Aplicar las 3 deducciones IA',toast:'3 deducciones aplicadas · ahorro total 9.500€ · reflejado en tu IS 2026','type':'ok'},
    {label:'Ver desglose score',toast:'Desglose · 6 indicadores · benchmark sector · puntos concretos de mejora','type':'info'},
  ]}
/>

const ClAhorro = () => <Placeholder
  title="Mi ahorro fiscal IA"
  sub="Todo lo que KonGest IA te ha ahorrado este año · concreto, detallado, medible"
  kpis={[
    {value:'13.000€',label:'Ahorro anual aplicado',delta:'▲ Optimización total',deltaDir:'up',kc:'#1a9e4a'},
    {value:'9.500€',label:'Deducciones activas',delta:'▲ I+D, reserva, vehículo',deltaDir:'up',kc:'#1A78FF'},
    {value:'3.500€',label:'Ahorros operativos',delta:'▲ Reclasificaciones',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>KonGest IA ha aplicado <strong>3 deducciones clave</strong>: I+D software (2.800€), reserva capitalización (5.500€) y amortización vehículo acelerada (1.200€). Más optimizaciones operativas: reclasificación de gastos (1.800€) y aplicación DGT V0142-25 (480€).</>}
  actions={[
    {label:'Descargar informe ahorro 2026',toast:'Informe ahorro IA 2026 · PDF 6 páginas · TechPyme S.L. · firmado','type':'ok'},
    {label:'Ver simulación sin IA',toast:'Sin IA · IS 22.000€ · con IA 9.000€ · diferencia +13.000€ anuales','type':'info'},
  ]}
/>

const ClFuturo = () => <Placeholder
  title="Futuro fiscal"
  sub="Proyección a 12 meses · alertas de cambios normativos · oportunidades detectadas por IA"
  kpis={[
    {value:'28.500€',label:'Carga fiscal total 2026',delta:'▼ −32% vs 2025',deltaDir:'down',kc:'#1a9e4a'},
    {value:'3',label:'Novedades normativas',delta:'→ Aplicadas',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'2',label:'Oportunidades detectadas',delta:'▲ Revisar',deltaDir:'up',kc:'#e8a010'},
  ]}
  summary={<>KonGest IA monitoriza 24/7 el BOE, la AEAT y la DGT — aplicando a tu ficha las novedades que te benefician. Detectadas 2 oportunidades adicionales para 2026: amortización acelerada equipos informáticos (+1.200€) y plan de pensiones autónomos (+680€).</>}
  actions={[
    {label:'Ver las 2 oportunidades',toast:'2 oportunidades · amortización equipos y plan pensiones autónomos · ahorro 1.880€','type':'info'},
    {label:'Simular plan pensiones',toast:'Simulación plan pensiones · aportación óptima 5.750€ · ahorro IRPF 1.150€','type':'info'},
  ]}
/>

const ClCom = () => <Placeholder
  title="Mi asesor"
  sub="Todo lo que Laura Sánchez y KonGest IA te comunican — siempre actualizado, sin tener que preguntar"
  kpis={[
    {value:'8',label:'Comunicaciones 24h',delta:'▲ IA + Laura',deltaDir:'up',kc:'#1A78FF'},
    {value:'2',label:'Requieren tu revisión',delta:'→ Mod. 303 y 111',deltaDir:'neutral',kc:'#e8a010'},
    {value:'2h',label:'Tiempo medio respuesta',delta:'▲ Asesora activa',deltaDir:'up',kc:'#1a9e4a'},
  ]}
  summary={<>Esta es tu bandeja de comunicación con Laura Sánchez y KonGest IA. La IA actualiza automáticamente el estado de tus gestiones, envía borradores, responde consultas al instante y escala a tu asesora solo cuando es necesario. <strong>Próximo contacto programado: revisión Mod. 303 · 12 Mar 11:00</strong>.</>}
  actions={[
    {label:'Ver bandeja completa',toast:'Bandeja · 8 mensajes · 2 pendientes revisión · 6 informativos IA','type':'info'},
    {label:'Agendar llamada con Laura',toast:'Laura Sánchez · próximo hueco disponible viernes 14 Mar 10:00 · confirmado','type':'ok'},
  ]}
/>

const IC = (d) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>

export const SECTIONS_CLIENTE = [
  { section:'Mi Portal' },
  { id:'cl-dash',       label:'Mi situación fiscal', ia:true, Component:ClDash,       icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'cl-iva',        label:'Mi IVA en tiempo real', ia:true, Component:ClIVA,       icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'cl-irpf',       label:'Mi IRPF acumulado',   ia:true, Component:ClIRPF,       icon:IC('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2') },
  { id:'cl-facturas',   label:'Mis facturas',        ia:true, Component:ClFacturas,   icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { id:'cl-documentos', label:'Mis documentos',      ia:true, Component:ClDocumentos, icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { section:'Inteligencia IA' },
  { id:'cl-prevision',  label:'Previsión trimestral', ia:true, Component:ClPrevision,  icon:IC('M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6') },
  { id:'cl-simulador',  label:'Simulador fiscal',    ia:true, Component:ClSimulador,  icon:IC('M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42') },
  { id:'cl-score',      label:'Score salud fiscal',  ia:true, Component:ClScore,      icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'cl-ahorro',     label:'Mi ahorro IA',        ia:true, Component:ClAhorro,     icon:IC('M22 12h-4l-3 9L9 3l-3 9H2') },
  { id:'cl-futuro',     label:'Futuro fiscal',       ia:true, Component:ClFuturo,     icon:IC('M22 11.08V12a10 10 0 1 1-5.93-9.14') },
  { section:'Comunicación' },
  { id:'cl-com',        label:'Mi asesor',           ia:true, Component:ClCom,        icon:IC('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z') },
]
