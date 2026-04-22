import { useEffect, useRef, useState } from 'react'

const PUSHES_BY_ROLE = {
  director: [
    { bar:'#1A78FF', label:'KONGEST IA · RENTABILIDAD', txt:'IA detectó mejora de margen en TechPyme · +3.2pp · revisando 4 clientes similares' },
    { bar:'#1a9e4a', label:'KONGEST IA · COBROS', txt:'IA envió recordatorio a Construcciones Arco · 3er intento · respuesta en 2h' },
    { bar:'#e8a010', label:'KONGEST IA · UPSELLING', txt:'IA preparó propuesta asesoría financiera para 3 clientes · probabilidad 71%' },
    { bar:'#1A78FF', label:'KONGEST IA · BI', txt:'Margen operativo del despacho 68% · máximo histórico · +11pp desde implantación' },
  ],
  asesor: [
    { bar:'#e03030', label:'KONGEST IA · VENCIMIENTOS', txt:'3 modelos críticos firmar antes 20h · cola optimizada en 45 min' },
    { bar:'#1A78FF', label:'KONGEST IA · AEAT', txt:'11 borradores automáticos generados · TechPyme, Almacenes Valdés, Farmacia Beltrán...' },
    { bar:'#1a9e4a', label:'KONGEST IA · ANOMALÍAS', txt:'Asiento duplicado en Construcciones Arco resuelto · documentación preventiva generada' },
    { bar:'#e8a010', label:'KONGEST IA · NORMATIVO', txt:'Novedad DGT V0142-25 aplicada a cartera · 14 clientes beneficiados' },
  ],
  cliente: [
    { bar:'#1A78FF', label:'KONGEST IA · IVA Q1', txt:'Tu Mod. 303 Q1 está listo · 4.280€ a ingresar · vence 20 Mar · solo firmar' },
    { bar:'#1a9e4a', label:'KONGEST IA · AHORRO', txt:'13.000€ en deducciones IA aplicadas a tu IS 2026 · cuota final 9.000€' },
    { bar:'#1A78FF', label:'KONGEST IA · NORMATIVO', txt:'DGT V0142-25 aplicada · tu deducción vehículo sube del 50% al 65%' },
    { bar:'#e8a010', label:'KONGEST IA · PREVISIÓN', txt:'Tu IRPF Q2 estimado: 1.240€ · +3% vs Q1 · ahorro IA detectado 340€' },
  ],
}

export function PushNotifications({ role = 'director' }) {
  const [current, setCurrent] = useState(null)
  const idxRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    const list = PUSHES_BY_ROLE[role] || []
    if (!list.length) return
    let hideTimer
    function show() {
      const p = list[idxRef.current % list.length]
      idxRef.current++
      setCurrent({ ...p, id: Date.now() })
      hideTimer = setTimeout(() => setCurrent(prev => prev ? { ...prev, hiding:true } : null), 7500)
      setTimeout(() => setCurrent(null), 8100)
    }
    timerRef.current = setInterval(show, 38000)
    const firstTimer = setTimeout(show, 6000)
    return () => { clearInterval(timerRef.current); clearTimeout(firstTimer); clearTimeout(hideTimer) }
  }, [role])

  if (!current) return null
  return (
    <div className={`push-notif${current.hiding ? ' hiding' : ''}`} onClick={() => setCurrent(null)}>
      <div className="push-notif-bar" style={{background:current.bar}} />
      <div className="push-notif-body">
        <div className="push-notif-label">{current.label}</div>
        <div className="push-notif-txt">{current.txt}</div>
      </div>
    </div>
  )
}
