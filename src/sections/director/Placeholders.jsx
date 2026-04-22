import { Placeholder } from '../common'

export function DirRentabilidad(){
  return <Placeholder
    title="Rentabilidad real"
    sub="KonGest IA calcula el margen por cliente, hora trabajada y tarifa aplicada — con precisión del 94%"
    kpis={[
      {value:'68%',label:'Margen medio',delta:'▲ +11pp',deltaDir:'up',kc:'#1a9e4a'},
      {value:'2.712€',label:'Ingresos/cliente',delta:'▲ +8%',deltaDir:'up',kc:'#1A78FF'},
      {value:'189h',label:'Horas facturables Q1',delta:'▲ 38% liberadas',deltaDir:'up',kc:'#00C8FF'},
      {value:'3',label:'Clientes revisar tarifa',delta:'→ oportunidad',deltaDir:'neutral',kc:'#e8a010'},
    ]}
    summary={<>KonGest IA ha identificado <strong>3 clientes con tarifa inferior al margen objetivo del 55%</strong>. Al aplicar las propuestas de revisión, el margen global subiría del 68% al 72% — ingresos adicionales anuales estimados: <strong>+14.800€</strong>.</>}
    actions={[
      {label:'Generar propuesta de tarifa por cliente',toast:'IA generó 3 propuestas de revisión tarifaria · listas para enviar',type:'ok'},
      {label:'Simular margen al 72%',toast:'Simulación ejecutada · Q1 proyectado 42.100€ · +4.120€ sobre real','type':'info'},
      {label:'Exportar informe rentabilidad',variant:'outline',toast:'Informe rentabilidad Q1 exportado en PDF','type':'ok'},
    ]}
  />
}

export function DirClientes(){
  return <Placeholder
    title="Cartera de clientes"
    sub="IA predictiva sobre tu cartera completa — anticipa abandono, detecta upselling y gestiona la relación"
    kpis={[
      {value:'14',label:'Clientes activos',delta:'→ 2 nuevos Q1',deltaDir:'neutral',kc:'#1A78FF'},
      {value:'92%',label:'Retención 12m',delta:'▲ +4pp',deltaDir:'up',kc:'#1a9e4a'},
      {value:'3',label:'Upselling detectado',delta:'→ 71% probabilidad',deltaDir:'neutral',kc:'#e8a010'},
      {value:'2',label:'Riesgo abandono',delta:'▼ IA monitorizando',deltaDir:'down',kc:'#e03030'},
    ]}
    summary={<>KonGest IA tiene <strong>14 clientes bajo monitorización proactiva</strong>. 3 con oportunidad de upselling identificada (asesoría financiera · ticket medio 4.200€/año) y 2 en seguimiento por señales de abandono (última interacción &gt;45 días).</>}
    actions={[
      {label:'Activar secuencia de upselling en los 3',toast:'IA iniciando secuencia personalizada · 3 propuestas listas en 24h','type':'ok'},
      {label:'Ver expedientes de riesgo',toast:'2 expedientes abiertos · Construcciones Arco y Transportes Montes · score 62 y 58','type':'warn'},
      {label:'Añadir nuevo cliente',variant:'outline',toast:'Wizard de onboarding · KonGest IA rellenará los datos fiscales automáticamente','type':'info'},
    ]}
  />
}

export function DirEquipo(){
  return <Placeholder
    title="Equipo"
    sub="KonGest IA redistribuye la carga operativa y libera a tu equipo de tareas automatizables"
    kpis={[
      {value:'5',label:'Asesores activos',delta:'→ 100% capacidad',deltaDir:'neutral',kc:'#1A78FF'},
      {value:'14h',label:'Liberadas/semana',delta:'▲ por asesor',deltaDir:'up',kc:'#1a9e4a'},
      {value:'0',label:'Bajas Q1',delta:'▲ Retención total',deltaDir:'up',kc:'#1a9e4a'},
      {value:'4.2/5',label:'Satisfacción equipo',delta:'▲ +0.6 vs Q4',deltaDir:'up',kc:'#00C8FF'},
    ]}
    summary={<>La automatización IA ha redistribuido <strong>70h/semana de tareas operativas</strong> (presentación AEAT, conciliación, recordatorios) hacia trabajo de mayor valor. El equipo reporta mejor satisfacción y cero rotación en Q1.</>}
    actions={[
      {label:'Evaluar perfil de cada asesor',toast:'Evaluación 360 IA · 5 asesores · informe individual generado','type':'ok'},
      {label:'Ver plan de desarrollo',toast:'Plan de desarrollo IA · 5 rutas personalizadas · objetivos 2026','type':'info'},
    ]}
  />
}

export function DirBI(){
  return <Placeholder
    title="Business Intelligence"
    sub="KPIs del despacho en tiempo real · benchmarks del sector · simulador de escenarios"
    kpis={[
      {value:'68%',label:'Margen vs 52% sector',delta:'▲ +16pp top decil',deltaDir:'up',kc:'#1a9e4a'},
      {value:'0.6%',label:'Rotación Q1',delta:'▼ vs 14% sector',deltaDir:'down',kc:'#1A78FF'},
      {value:'x2.1',label:'Ingresos/asesor',delta:'▲ vs media sector',deltaDir:'up',kc:'#00C8FF'},
      {value:'94%',label:'Satisfacción clientes',delta:'▲ +12pp vs 82% sector',deltaDir:'up',kc:'#e8a010'},
    ]}
    summary={<>Tu despacho está en el <strong>top decil del sector en margen operativo (68% vs 52% media)</strong> y rotación de clientes (0.6% vs 14%). El ratio ingresos/asesor (x2.1) duplica la media — argumento comercial clave para captación.</>}
    actions={[
      {label:'Exportar benchmark ejecutivo',toast:'Benchmark sectorial Q1 exportado en PDF · 12 páginas','type':'ok'},
      {label:'Simular escenario 2026 +20% clientes',toast:'Escenario simulado · ingresos 2026 +31% · margen estable 66%','type':'info'},
    ]}
  />
}

export function DirPrecio(){
  return <Placeholder
    title="Motor de precio IA"
    sub="Fija honorarios óptimos por cliente en función de complejidad, tamaño y margen objetivo"
    kpis={[
      {value:'+8.4%',label:'Ajuste tarifa medio',delta:'▲ +14.800€ anual',deltaDir:'up',kc:'#1a9e4a'},
      {value:'3',label:'Clientes subir tarifa',delta:'→ Revisar',deltaDir:'neutral',kc:'#e8a010'},
      {value:'94%',label:'Precisión modelo',delta:'▲ basado en 847 casos',deltaDir:'up',kc:'#1A78FF'},
    ]}
    summary={<>KonGest IA sugiere subir tarifa a <strong>Construcciones Arco (+12%), Transportes Montes (+18%) y Farmacia Beltrán (+6%)</strong> por estar por debajo del margen objetivo. Retorno anual estimado: 14.800€.</>}
    actions={[
      {label:'Generar 3 propuestas de ajuste',toast:'IA generó 3 propuestas personalizadas · listas para enviar al cliente','type':'ok'},
      {label:'Simular cartera al margen 72%',toast:'Simulación · margen global 72% · ingresos Q1 +4.120€','type':'info'},
    ]}
  />
}

export function DirRiesgo(){
  return <Placeholder
    title="Motor de Riesgo"
    sub="Score de riesgo tributario por cliente · patrones de inspección AEAT · alertas anticipadas"
    kpis={[
      {value:'62',label:'Score Construcciones Arco',delta:'▼ −14 · crítico',deltaDir:'down',kc:'#e03030'},
      {value:'58',label:'Score Transportes Montes',delta:'▼ −9 · revisar',deltaDir:'down',kc:'#e8a010'},
      {value:'84',label:'Score medio cartera',delta:'▲ estable',deltaDir:'up',kc:'#1a9e4a'},
      {value:'0',label:'Inspecciones AEAT abiertas',delta:'▲ 12 meses',deltaDir:'up',kc:'#1a9e4a'},
    ]}
    summary={<>KonGest IA monitoriza <strong>14 clientes en tiempo continuo</strong>. 2 con score crítico/revisar — documentación preventiva generada automáticamente. Tu cartera lleva 12 meses sin inspección AEAT gracias al motor predictivo.</>}
    actions={[
      {label:'Activar protocolo Construcciones Arco',toast:'Protocolo de riesgo tributario activado · documentación preventiva generada','type':'ok'},
      {label:'Ver patrones AEAT detectados',toast:'3 patrones atípicos detectados · ratio IVA, margen y plantilla · contexto preparado','type':'info'},
    ]}
  />
}

export function DirPrevision(){
  return <Placeholder
    title="Previsión de ingresos"
    sub="KonGest IA proyecta ingresos a 6 semanas vista basándose en pipeline, rentabilidad y estacionalidad"
    kpis={[
      {value:'42.100€',label:'Q2 proyectado',delta:'▲ +11% vs Q1',deltaDir:'up',kc:'#1A78FF'},
      {value:'168.400€',label:'2026 estimado',delta:'▲ +23% YoY',deltaDir:'up',kc:'#1a9e4a'},
      {value:'94%',label:'Precisión modelo',delta:'▲ basada en 24m de datos',deltaDir:'up',kc:'#00C8FF'},
    ]}
    summary={<>La proyección para Q2 es <strong>42.100€ (+11% vs Q1)</strong> con 3 clientes nuevos incorporándose en mayo. El escenario pesimista (sin nuevos clientes) se queda en 37.500€ — aún por encima de Q1.</>}
    actions={[
      {label:'Ver escenario optimista',toast:'Escenario optimista · 45.800€ · +3 clientes SaaS en pipeline','type':'info'},
      {label:'Exportar previsión anual',toast:'Previsión 2026 exportada en PDF · 8 páginas · gráficos incluidos','type':'ok'},
    ]}
  />
}

export function DirCartera(){
  return <Placeholder
    title="IA Predictiva · Cartera"
    sub="Anticipa abandono, detecta upselling y personaliza la relación con cada cliente"
    kpis={[
      {value:'14',label:'Clientes bajo IA',delta:'→ 100% cartera',deltaDir:'neutral',kc:'#1A78FF'},
      {value:'3',label:'Upselling detectado',delta:'▲ 71% probabilidad',deltaDir:'up',kc:'#1a9e4a'},
      {value:'2',label:'Riesgo abandono',delta:'▼ IA monitorizando',deltaDir:'down',kc:'#e03030'},
      {value:'94%',label:'Satisfacción prevista',delta:'▲ +12pp',deltaDir:'up',kc:'#00C8FF'},
    ]}
    summary={<>KonGest IA analiza 23 señales por cliente (frecuencia contacto, puntualidad pago, volumen, complejidad). <strong>Upselling detectado en 3 clientes</strong> (asesoría financiera · probabilidad 71%). <strong>Riesgo abandono en 2</strong> (última interacción &gt;45 días).</>}
    actions={[
      {label:'Activar campaña retención',toast:'IA activando campaña · 2 clientes · email + llamada + revisión fiscal','type':'ok'},
      {label:'Propuesta upselling 3 clientes',toast:'IA preparó 3 propuestas personalizadas · ticket anual 4.200€/cliente','type':'ok'},
    ]}
  />
}
