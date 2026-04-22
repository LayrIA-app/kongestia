import { PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn } from '../common'
import { showToast } from '../../components/Toast'

const CLIENTES = [
  { n:'TechPyme S.L.', neg:'SaaS', hrs:'21.5', ing:'6.450€', marg:'+78%', est:'b-ok', txt:'Óptimo' },
  { n:'Almacenes Valdés', neg:'Distribución', hrs:'18.0', ing:'5.400€', marg:'+72%', est:'b-ok', txt:'Óptimo' },
  { n:'Industrias Clave S.A.', neg:'Industrial', hrs:'32.0', ing:'9.600€', marg:'+68%', est:'b-ok', txt:'Óptimo' },
  { n:'Grupo Inversor Norte', neg:'Holding', hrs:'14.5', ing:'4.350€', marg:'+61%', est:'b-blue', txt:'Bueno' },
  { n:'Farmacia Beltrán', neg:'Retail', hrs:'12.0', ing:'3.600€', marg:'+55%', est:'b-blue', txt:'Bueno' },
  { n:'María González', neg:'Autónomo', hrs:'9.5', ing:'2.850€', marg:'+49%', est:'b-amber', txt:'Revisar' },
  { n:'Construcciones Arco', neg:'Construcción', hrs:'17.5', ing:'3.200€', marg:'+18%', est:'b-red', txt:'Crítico' },
  { n:'Transportes Montes', neg:'Logística', hrs:'11.0', ing:'1.980€', marg:'−5%', est:'b-red', txt:'Pérdida' },
]

export function DashDirector({ goTo }) {
  return (
    <>
      <div style={{background:'linear-gradient(135deg,#071830 65%,#1A78FF 100%)',borderRadius:12,padding:'20px 24px',marginBottom:14,position:'relative',overflow:'hidden',color:'#fff'}}>
        <div style={{fontSize:'.62rem',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,255,255,.55)',marginBottom:6}}>
          {new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
        </div>
        <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',fontWeight:900,letterSpacing:'.02em',marginBottom:6}}>
          Buenos días, Carlos
        </div>
        <div style={{fontSize:'.84rem',color:'rgba(255,255,255,.8)',lineHeight:1.5,maxWidth:720}}>
          KonGest IA ha procesado esta noche <strong style={{color:'#00C8FF'}}>11 borradores AEAT</strong> y detectado <strong style={{color:'#00C8FF'}}>3 oportunidades de upselling</strong>. Tu margen operativo de Q1 sube a <strong style={{color:'#00C8FF'}}>68%</strong> — máximo histórico.
        </div>
      </div>

      <PageHdr
        title="Panel de Dirección"
        sub="Rentabilidad real, cartera y KPIs estratégicos del despacho — KonGest IA anticipa, tú decides"
        badge={{cls:'b-blue',txt:'Q1 2026 · Tiempo real'}}
      />

      <KpiGrid items={[
        { value:'68%',label:'Margen operativo',delta:'▲ +11pp vs Q4',deltaDir:'up',kc:'#1a9e4a' },
        { value:'37.980€',label:'Ingresos Q1',delta:'▲ +23% YoY',deltaDir:'up',kc:'#1A78FF' },
        { value:'14',label:'Clientes activos',delta:'→ 2 nuevos',deltaDir:'neutral',kc:'#00C8FF' },
        { value:'38%',label:'Tiempo liberado IA',delta:'▲ 14h/semana',deltaDir:'up',kc:'#e8a010' },
      ]} />

      <div className="g2 mb14">
        <Card title="Alertas IA proactivas" ia>
          <Alert tone="red"
                 title="Construcciones Arco · impago probable"
                 sub="Score de riesgo 62 · IA ha enviado recordatorio automático · respuesta estimada en 2h"
                 actions={<TblBtn label="Ver expediente" variant="red" onClick={() => showToast('Expediente IA · Construcciones Arco · score riesgo 62 · 3 alertas abiertas','warn')} />} />
          <Alert tone="amber"
                 title="Transportes Montes · margen negativo −5%"
                 sub="IA propone redistribuir carga administrativa · ahorro estimado 380€/mes"
                 actions={<TblBtn label="Redistribuir" variant="amber" onClick={() => showToast('IA redistribuyendo carga · Transportes Montes · 380€/mes liberados','ok')} />} />
          <Alert tone="blue"
                 title="Upselling detectado en 3 clientes"
                 sub="Probabilidad media 71% · asesoría financiera · ticket estimado 4.200€/año"
                 actions={<TblBtn label="Activar IA" onClick={() => showToast('IA iniciando secuencia de upselling para 3 clientes · propuestas en 24h','ok')} />} />
        </Card>

        <Card title="Acciones rápidas">
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button className="btn btn-blue" onClick={() => goTo?.('rentabilidad')}>Ver rentabilidad por cliente →</button>
            <button className="btn btn-blue" onClick={() => goTo?.('clientes')}>Ir a cartera de clientes →</button>
            <button className="btn btn-blue" onClick={() => goTo?.('riesgo')}>Revisar Motor de Riesgo →</button>
            <button className="btn btn-outline" onClick={() => showToast('Informe ejecutivo Q1 exportado en PDF · KonGest IA','ok')}>Exportar informe ejecutivo</button>
            <button className="btn btn-outline" onClick={() => showToast('Simulación fiscal IA ejecutada para cartera completa · 14 clientes','info')}>Simular escenario fiscal cartera</button>
          </div>
          <IaBox style={{marginTop:12}}>
            <strong>IA sugerencia:</strong> Revisa <em>Motor de Riesgo</em> antes de cerrar el día — hay 2 clientes que requieren tu atención directa.
          </IaBox>
        </Card>
      </div>

      <Card title="Cartera — rentabilidad por cliente" ia style={{marginBottom:14}}>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Negocio</th><th>Horas Q1</th><th>Ingresos</th><th>Margen</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {CLIENTES.map(c => (
                <tr key={c.n}>
                  <td><strong>{c.n}</strong></td>
                  <td style={{color:'#7a8899',fontSize:'.7rem'}}>{c.neg}</td>
                  <td>{c.hrs}h</td>
                  <td style={{color:'#1A78FF',fontWeight:700}}>{c.ing}</td>
                  <td style={{color:c.marg.startsWith('−') ? '#e03030' : c.est === 'b-red' ? '#e03030' : '#1a9e4a',fontWeight:700}}>{c.marg}</td>
                  <td><span className={`badge ${c.est}`}>{c.txt}</span></td>
                  <td><TblBtn label="Ver →" onClick={() => showToast(`Expediente IA · ${c.n} · margen ${c.marg} · ${c.hrs}h Q1`,'info')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IaBox>
          <strong>KonGest IA recomienda:</strong> Focalizar esfuerzo comercial en el segmento SaaS/Industrial (margen medio 73%) y revisar la estructura tarifaria de Construcciones y Transportes (margen bajo 18% y −5%).
        </IaBox>
      </Card>
    </>
  )
}
