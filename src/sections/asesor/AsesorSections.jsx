import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, Placeholder } from '../common'
import { showToast } from '../../components/Toast'

const MODELOS = [
  ['303','TechPyme S.L.','Q1 2026','A ingresar 4.280€','Hoy 08:32','b-ok','Revisar'],
  ['303','Almacenes Valdés','Q1 2026','A ingresar 8.640€','Hoy 08:34','b-ok','Revisar'],
  ['111','Almacenes Valdés','Feb 2026','A ingresar 1.240€','Hoy 08:35','b-ok','Revisar'],
  ['303','Farmacia Beltrán','Q1 2026','A devolver 320€','Hoy 08:40','b-blue','Revisar'],
  ['130','Construcciones Arco','Q1 2026','Datos insuficientes','—','b-amber','Pendiente'],
  ['303','María González','Q1 2026','A ingresar 1.840€','Hoy 08:44','b-amber','Anomalía'],
  ['349','Farmacia Beltrán','Q1 2026','Sin operaciones UE','Hoy 08:48','b-ok','Revisar'],
]

export function AsesorDash() {
  return (
    <>
      <div className="as-hero" style={{background:'linear-gradient(135deg,#071830,#0D3060,#1A78FF,#00C8FF,#0D55CC,#071830)',backgroundSize:'400% 400%',animation:'auroraMove 8s ease infinite',borderRadius:12,padding:'20px 24px',marginBottom:14,color:'#fff'}}>
        <div style={{fontSize:'.62rem',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,255,255,.55)',marginBottom:6}}>
          {new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
        </div>
        <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',fontWeight:900,marginBottom:6}}>
          Buenos días, Laura
        </div>
        <div style={{fontSize:'.84rem',color:'rgba(255,255,255,.8)',lineHeight:1.5,maxWidth:720}}>
          KonGest IA tiene <strong style={{color:'#00C8FF'}}>11 borradores AEAT listos para firmar</strong>, <strong style={{color:'#00C8FF'}}>3 críticos antes de las 20h</strong>. Tu cola optimizada: 45 min en total.
        </div>
      </div>

      <PageHdr title="Panel Operativo" sub="Tus clientes, plazos y modelos fiscales autogestionados por KonGest IA — tú revisas y firmas"
               badge={{cls:'b-blue',txt:'Q1 2026 · Tiempo real'}} />

      <KpiGrid items={[
        { value:'14h',label:'Ahorradas/semana',delta:'▲ vs 6h sin IA',deltaDir:'up',kc:'#1a9e4a' },
        { value:'11',label:'Borradores Q1 listos',delta:'→ Solo firmar',deltaDir:'neutral',kc:'#1A78FF' },
        { value:'0',label:'Errores AEAT',delta:'▲ 12 meses',deltaDir:'up',kc:'#00C8FF' },
        { value:'3',label:'Firmar antes 20h',delta:'▼ Críticos',deltaDir:'down',kc:'#e03030' },
      ]} />

      <Card title="Alertas IA proactivas" ia style={{marginBottom:14}}>
        <Alert tone="red" title="3 modelos críticos vencen hoy"
               sub="TechPyme 303, Almacenes Valdés 111, Grupo Inversor Norte 111 · cola IA optimizada · 45 min"
               actions={<TblBtn label="Ver cola firma" variant="red" onClick={() => showToast('Cola firma IA · 3 críticos + 8 revisar · tiempo total 45 min','warn')} />} />
        <Alert tone="amber" title="Anomalía contable en María González"
               sub="Asiento duplicado detectado · documentación preventiva generada · pendiente revisión"
               actions={<TblBtn label="Revisar anomalía" variant="amber" onClick={() => showToast('Anomalía · María González · asiento 2026-074 duplicado · revisión preparada','info')} />} />
        <Alert tone="blue" title="Novedad normativa DGT V0142-25"
               sub="IA aplicada a 14 clientes · deducción vehículo del 65% · ahorro medio 480€/cliente"
               actions={<TblBtn label="Ver aplicación" onClick={() => showToast('DGT V0142-25 aplicada · 14 clientes · +6.720€ ahorro total','ok')} />} />
      </Card>

      <Card title="Modelos AEAT generados por IA" ia style={{marginBottom:14}}>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Modelo</th><th>Cliente</th><th>Período</th><th>Resultado</th><th>Generado</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {MODELOS.map((m,i) => (
                <tr key={i}>
                  <td style={{color:'#1A78FF',fontWeight:700}}>{m[0]}</td>
                  <td><strong>{m[1]}</strong></td>
                  <td style={{color:'#7a8899'}}>{m[2]}</td>
                  <td style={{fontSize:'.72rem',fontWeight:600,color:m[3].includes('ingresar')?'#e03030':m[3].includes('devolver')?'#1a9e4a':'#7a8899'}}>{m[3]}</td>
                  <td style={{fontSize:'.65rem',color:'#7a8899'}}>{m[4]}</td>
                  <td><span className={`badge ${m[5]}`}>{m[6]}</span></td>
                  <td><TblBtn label="Abrir →" onClick={() => showToast(`Abriendo Mod. ${m[0]} · ${m[1]} · ${m[3]}`,'info')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox>
          <strong>KonGest IA ha generado 11 modelos automáticamente</strong> usando los datos contables en tiempo real de cada cliente. Tiempo total de revisión estimado: 45 minutos. Sin IA: 6 horas.
        </IaBox>
      </Card>
    </>
  )
}

export const AsClientes = () => <Placeholder
  title="Mis clientes"
  sub="14 clientes · estado fiscal y contable en tiempo real · vista unificada por KonGest IA"
  kpis={[
    {value:'14',label:'Clientes activos',delta:'→ 100% al día',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'11',label:'Declaraciones Q1',delta:'▲ Borradores listos',deltaDir:'up',kc:'#1a9e4a'},
    {value:'2',label:'Anomalías abiertas',delta:'▼ IA detectando',deltaDir:'down',kc:'#e8a010'},
    {value:'0',label:'Impagos AEAT',delta:'▲ 12 meses',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>KonGest IA sincroniza la contabilidad de tus 14 clientes en tiempo real. <strong>2 anomalías abiertas</strong> (María González y Construcciones Arco) con documentación preventiva lista.</>}
  actions={[
    {label:'Añadir nuevo cliente',toast:'Wizard de onboarding · KonGest IA rellenará los datos fiscales automáticamente','type':'info'},
    {label:'Ver anomalías abiertas',toast:'2 anomalías · María González asiento duplicado · Construcciones Arco ratio IVA','type':'warn'},
  ]}
/>

export const AsModelos = () => <Placeholder
  title="Modelos AEAT"
  sub="Borradores generados por IA de todos los modelos · 303, 111, 115, 130, 200, 349, 190..."
  kpis={[
    {value:'11',label:'Borradores Q1',delta:'▲ IA auto',deltaDir:'up',kc:'#1a9e4a'},
    {value:'45 min',label:'Revisión total estimada',delta:'▲ vs 6h sin IA',deltaDir:'up',kc:'#1A78FF'},
    {value:'0',label:'Errores de presentación',delta:'▲ 12 meses',deltaDir:'up',kc:'#00C8FF'},
    {value:'3',label:'Críticos firmar hoy',delta:'▼ Antes 20h',deltaDir:'down',kc:'#e03030'},
  ]}
  summary={<>La IA ha generado todos los modelos del Q1 con los datos contables reales. <strong>3 críticos firmar hoy antes de las 20h</strong>. Cola optimizada por urgencia, riesgo y vencimiento.</>}
  actions={[
    {label:'Abrir cola de firma IA',toast:'Cola firma · 3 críticos + 8 revisar · 45 min total · orden optimizado por IA','type':'info'},
    {label:'Presentar Mod. 303 TechPyme',toast:'Mod. 303 TechPyme 4.280€ presentado AEAT · ticket de confirmación recibido','type':'ok'},
  ]}
/>

export const AsFirma = () => <Placeholder
  title="Asistente de Firma IA"
  sub="KonGest IA organiza tu cola de firma por urgencia, riesgo y vencimiento"
  kpis={[
    {value:'3',label:'Firmar antes 20h',delta:'▼ Críticos hoy',deltaDir:'down',kc:'#e03030'},
    {value:'11',label:'Borradores listos IA',delta:'→ Solo firmar',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'45 min',label:'Tiempo total',delta:'▲ vs 6h sin IA',deltaDir:'up',kc:'#1a9e4a'},
    {value:'2',label:'Atención previa',delta:'→ Incidencia',deltaDir:'neutral',kc:'#e8a010'},
  ]}
  summary={<>Ningún software del mercado prioriza automáticamente qué firmar primero y por qué. KonGest IA sí — basándose en vencimiento AEAT, importe, score de riesgo del cliente y complejidad del modelo.</>}
  actions={[
    {label:'Firmar 3 críticos',toast:'3 modelos firmados · TechPyme 303, Valdés 111, Grupo Inversor Norte 111 · presentados AEAT','type':'ok'},
    {label:'Revisar 2 con incidencia',toast:'2 incidencias · Construcciones Arco datos insuficientes · María González anomalía','type':'warn'},
  ]}
/>

export const AsSimulador = () => <Placeholder
  title="Simulador fiscal IA"
  sub="Simula escenarios: contratar, vehículo empresa, alquiler oficina, dividendos, inversión..."
  kpis={[
    {value:'+8.200€',label:'Mejor escenario Q1',delta:'▲ contratar',deltaDir:'up',kc:'#1a9e4a'},
    {value:'−4.500€',label:'Peor escenario Q1',delta:'▼ dividendo anticipado',deltaDir:'down',kc:'#e03030'},
    {value:'94%',label:'Precisión modelo',delta:'▲ 847 casos',deltaDir:'up',kc:'#1A78FF'},
  ]}
  summary={<>El simulador calcula impacto en IVA, IS, IRPF y SS de cualquier escenario operativo del cliente — antes de ejecutarlo. La IA recomienda momento óptimo de ejecución.</>}
  actions={[
    {label:'Simular contratación 28.000€',toast:'Simulación · ahorro IS 7.000€ · coste SS +8.540€ · umbral rentabilidad 14 meses','type':'info'},
    {label:'Simular vehículo empresa 35.000€',toast:'Simulación · IVA deducible 3.675€ · amortización 7.000€/año','type':'info'},
  ]}
/>

export const AsDocumentos = () => <Placeholder
  title="Documentos"
  sub="Bandeja unificada · facturas, contratos, notificaciones AEAT · buscador IA en lenguaje natural"
  kpis={[
    {value:'147',label:'Documentos indexados',delta:'▲ +23 Q1',deltaDir:'up',kc:'#1A78FF'},
    {value:'14',label:'Clientes con portal',delta:'→ 100%',deltaDir:'neutral',kc:'#1a9e4a'},
    {value:'0',label:'Pendientes OCR',delta:'▲ IA procesó todo',deltaDir:'up',kc:'#00C8FF'},
  ]}
  summary={<>Busca en lenguaje natural: <em>"facturas de TechPyme del Q1 con IVA pendiente"</em> — KonGest IA entiende el contexto y devuelve los documentos exactos.</>}
  actions={[
    {label:'Buscar con IA',toast:'KonGest IA buscando · 147 documentos indexados · resultados en 0.4s','type':'info'},
    {label:'Subir nuevo documento',toast:'Arrastra documentos aquí · OCR IA extraerá los datos automáticamente','type':'info'},
  ]}
/>

export const AsCalendario = () => <Placeholder
  title="Calendario fiscal"
  sub="Todos los vencimientos de tu cartera · monitorizados y gestionados por KonGest IA"
  kpis={[
    {value:'2',label:'Vencen hoy',delta:'▼ Acción inmediata',deltaDir:'down',kc:'#e03030'},
    {value:'4',label:'Esta semana',delta:'→ Borradores listos',deltaDir:'neutral',kc:'#e8a010'},
    {value:'11',label:'Este mes',delta:'→ IA preparando',deltaDir:'neutral',kc:'#1A78FF'},
    {value:'11',label:'Borradores listos',delta:'▲ Solo revisar',deltaDir:'up',kc:'#1a9e4a'},
  ]}
  summary={<>20 Mar: Mod. 303 x4, Mod. 111 x2 · 25 Mar: Mod. 115 · 30 Mar: Mod. 349 · todos con borrador IA listo para firmar.</>}
  actions={[
    {label:'Ver vencimientos marzo',toast:'Marzo 2026 · 11 vencimientos · 11 borradores IA listos · 3 críticos hoy','type':'info'},
    {label:'Sincronizar con calendario externo',toast:'Calendario exportado · 11 eventos · formato .ics · notificaciones activadas','type':'ok'},
  ]}
/>

export const AsComunicacion = () => <Placeholder
  title="Comunicación"
  sub="Bandeja unificada VOZ · WhatsApp · Email · todas tus conversaciones con clientes gestionadas por IA"
  kpis={[
    {value:'24',label:'Conversaciones 24h',delta:'▲ +8 vs ayer',deltaDir:'up',kc:'#1A78FF'},
    {value:'19',label:'Resueltas IA',delta:'▲ 80% tasa',deltaDir:'up',kc:'#1a9e4a'},
    {value:'5',label:'Requieren tu atención',delta:'→ Contexto preparado',deltaDir:'neutral',kc:'#e8a010'},
  ]}
  summary={<>KonGest IA gestiona el 80% de las consultas entrantes al instante con datos fiscales reales. Las que llegan al asesor traen contexto completo — sin necesidad de preguntar al cliente de qué trata la conversación.</>}
  actions={[
    {label:'Ver bandeja unificada',toast:'Bandeja · 24 conversaciones · 5 pendientes · contexto IA preparado','type':'info'},
    {label:'Redactar comunicación masiva',toast:'IA redactando · plantilla personalizada por cliente · listo para revisar','type':'ok'},
  ]}
/>

export const AsDetector = () => <Placeholder
  title="Motor de anomalías"
  sub="IA en tiempo continuo sobre la contabilidad de tus 14 clientes — detecta patrones atípicos antes de que pasen"
  kpis={[
    {value:'2',label:'Anomalías abiertas',delta:'▼ Revisar',deltaDir:'down',kc:'#e8a010'},
    {value:'0',label:'Errores presentación',delta:'▲ 12 meses',deltaDir:'up',kc:'#1a9e4a'},
    {value:'847',label:'Patrones analizados',delta:'▲ IA continua',deltaDir:'up',kc:'#1A78FF'},
  ]}
  summary={<>Anomalías abiertas: <strong>María González</strong> (asiento duplicado 2026-074) y <strong>Construcciones Arco</strong> (ratio IVA atípico +18% vs media sector). Documentación preventiva generada automáticamente.</>}
  actions={[
    {label:'Revisar anomalía María González',toast:'Anomalía · asiento 2026-074 duplicado · 1.840€ · propuesta de corrección IA','type':'warn'},
    {label:'Generar doc. preventiva Construcciones',toast:'Doc. preventiva generada · ratio IVA · justificación técnica incluida','type':'ok'},
  ]}
/>
