/* Helpers de modales · REGLA 10 · todos los CTAs abren modal completo con
 * Editar + Enviar (Email mailto: · WhatsApp wa.me/ prerrellenados del contexto)
 */

import { CLIENTES, CLIENTE_ACTUAL } from './clientes'

const DESPACHO = 'Despacho Mendoza & Asociados — KonGest IA'
const FIRMA_EMAIL = `\n\nUn saludo,\nDespacho Mendoza & Asociados\nGestión Fiscal & Contable · KonGest IA\n--\nEste mensaje lo preparó KonGest IA con tus datos reales.`
const FIRMA_WA = '\n— Despacho Mendoza & Asociados · KonGest IA'

const get = (n) => CLIENTES[n] || {}

/* ════ Ver expediente / ficha cliente ════ */
export function fichaModal(nombre) {
  const c = get(nombre)
  return {
    type:'cliente', accent:'#1A78FF',
    eyebrow:'Expediente KonGest IA',
    title:`Ficha · ${nombre}`,
    subtitle:c.negocio,
    badges:[{cls:'b-blue',txt:c.servicio}, {cls:c.margen?.startsWith('-')?'b-red':c.margen?.startsWith('+7')?'b-ok':'b-blue',txt:`Margen ${c.margen || '—'}`}],
    fields:[
      {label:'Contacto', value:c.contacto, span:'full'},
      {label:'CIF', value:c.cif},
      {label:'Facturado 12m', value:c.facturado, color:'#1a9e4a'},
      {label:'Email', value:c.email, span:'full'},
      {label:'Teléfono', value:c.phone ? `+${c.phone}` : '—'},
      {label:'Régimen fiscal', value:c.regimen, span:'full'},
      {label:'Banco', value:c.banco, span:'full'},
    ],
    sections:[
      {title:'Notas IA', note:c.notas},
    ],
    editLabel:'Editar ficha',
    email:{
      to:c.email,
      subject:`Seguimiento · ${nombre}`,
      body:`Hola ${firstName(c.contacto)},\n\nTe contactamos para hacer seguimiento de tu situación fiscal.\n\n· ${c.servicio}\n· Última información disponible: ${c.notas}\n\n¿Te viene bien que revisemos esta semana algún detalle en concreto? ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, te escribimos desde ${DESPACHO} para hacer seguimiento (${c.servicio}). ¿Hablamos un momento esta semana? ${FIRMA_WA}`,
    },
  }
}

/* ════ Propuesta / Upselling ════ */
export function propuestaModal(nombre, tipo = 'propuesta') {
  const c = get(nombre)
  const mapTitulo = {
    'propuesta':`Propuesta de actualización · ${nombre}`,
    'upselling':`Propuesta upselling · Asesoría financiera · ${nombre}`,
    'honorarios':`Revisión de honorarios · ${nombre}`,
    'retencion':`Plan de retención · ${nombre}`,
  }
  const mapAccent = { propuesta:'#1A78FF', upselling:'#1a9e4a', honorarios:'#e8a010', retencion:'#e03030' }
  const mapServ = {
    propuesta:'Ampliación de servicios KonGest IA',
    upselling:'Asesoría financiera integral · ticket estimado 4.200€/año',
    honorarios:'Ajuste tarifario a margen objetivo 55%',
    retencion:'Programa 60 días con revisión de servicio',
  }
  return {
    type:'propuesta', accent:mapAccent[tipo] || '#1A78FF',
    eyebrow:'KonGest IA · Propuesta personalizada',
    title:mapTitulo[tipo],
    subtitle:c.negocio,
    badges:[{cls:'b-blue',txt:mapServ[tipo]},{cls:'b-ok',txt:'Lista para enviar'}],
    fields:[
      {label:'Cliente', value:nombre, span:'full'},
      {label:'Contacto', value:c.contacto},
      {label:'Facturado actual', value:c.facturado},
      {label:'Email', value:c.email, span:'full'},
      {label:'Propuesta generada', value:`${new Date().toLocaleDateString('es-ES')} · KonGest IA`, span:'full'},
    ],
    sections:[
      {title:'Contenido de la propuesta', rows:(
        tipo === 'upselling' ? [
          ['Servicio nuevo', 'Asesoría financiera integral', '#1a9e4a'],
          ['Ticket anual estimado', '4.200€', '#1A78FF'],
          ['Probabilidad cierre IA', '74%', '#1a9e4a'],
          ['Plazo de incorporación', '2 semanas'],
        ] : tipo === 'honorarios' ? [
          ['Tarifa actual', c.facturado],
          ['Tarifa propuesta IA', '+18% · ajuste al margen objetivo', '#1A78FF'],
          ['Retorno anual estimado', '+3.360€', '#1a9e4a'],
          ['Justificación', 'Incremento de complejidad · horas adicionales Q1'],
        ] : tipo === 'retencion' ? [
          ['Señales detectadas', 'Satisfacción baja · interacción <30d', '#e8a010'],
          ['Plan IA', 'Revisión de servicio + contacto directo + ajuste tarifa'],
          ['Riesgo sin acción', 'Baja probable 45 días', '#e03030'],
          ['Probabilidad retención', '68% con plan IA', '#1a9e4a'],
        ] : [
          ['Objetivo', 'Renovación anual con ampliación de servicios'],
          ['Valor añadido IA', 'Automatización 180h/año · ahorro deducciones 5.500€', '#1a9e4a'],
          ['Nueva tarifa propuesta', `+8% · alineada con margen ${c.margen}`],
          ['Vigencia', '12 meses · prorrogable automáticamente'],
        ]
      )},
      {title:'Notas IA del cliente', note:c.notas},
    ],
    editLabel:'Editar propuesta',
    email:{
      to:c.email,
      subject:`${mapTitulo[tipo]}`,
      body:`Hola ${firstName(c.contacto)},\n\nAdjunto la propuesta que KonGest IA ha preparado específicamente para ${nombre}:\n\n${mapServ[tipo]}\n\nContexto rápido:\n· Servicio actual: ${c.servicio}\n· Facturado 12m: ${c.facturado}\n· Margen actual: ${c.margen}\n\nSi la encaja, respondo este email y te envío la propuesta detallada para firma digital. ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, te paso la propuesta KonGest IA para ${nombre}: ${mapServ[tipo]}. Si te encaja, me dices por aquí y te envío el detalle al email. ${FIRMA_WA}`,
    },
  }
}

/* ════ Protocolo de riesgo / documentación preventiva ════ */
export function protocoloModal(nombre, accion = 'protocolo') {
  const c = get(nombre)
  const mapAcc = {
    protocolo:{titulo:`Protocolo de riesgo tributario · ${nombre}`, accent:'#e03030'},
    'doc-prev':{titulo:`Documentación preventiva · ${nombre}`, accent:'#e8a010'},
    'alerta-ia':{titulo:`Alerta IA activada · ${nombre}`, accent:'#e8a010'},
  }
  const a = mapAcc[accion] || mapAcc.protocolo
  return {
    type:'riesgo', accent:a.accent,
    eyebrow:'Acción IA · riesgo tributario',
    title:a.titulo,
    subtitle:c.negocio,
    badges:[{cls:'b-red',txt:'Score riesgo 62'},{cls:'b-amber',txt:'Monitorización activa'}],
    fields:[
      {label:'Cliente', value:nombre, span:'full'},
      {label:'CIF', value:c.cif},
      {label:'Régimen', value:c.regimen},
      {label:'Contacto', value:c.contacto},
      {label:'Email', value:c.email, span:'full'},
      {label:'Teléfono', value:c.phone ? `+${c.phone}` : '—'},
    ],
    sections:[
      {title:'Motivos detectados IA', rows:[
        ['Patrón pago tardío', 'Score caído 76 → 62', '#e03030'],
        ['IVA deducido atípico', 'Ratio gastos/ingresos >+18% sector', '#e8a010'],
        ['Recordatorio IA enviado', 'Hace 2h · sin respuesta aún'],
      ]},
      {title:'Acciones programadas', rows:[
        ['Documentación preventiva', 'Generada automáticamente', '#1a9e4a'],
        ['Seguimiento IA', '24h · llamada VOZ IA si no responde'],
        ['Siguiente hito', 'Revisión Mod. 303 · 18 Mar'],
      ]},
      {title:'Notas IA', note:c.notas},
    ],
    editLabel:'Editar protocolo',
    email:{
      to:c.email,
      subject:`${nombre} · Seguimiento fiscal preventivo`,
      body:`Hola ${firstName(c.contacto)},\n\nEn KonGest IA hemos detectado algunos puntos que conviene revisar en ${nombre} antes del cierre del trimestre:\n\n· Patrón de pago más dilatado de lo habitual\n· Ratio de IVA deducido por encima del habitual en el sector\n\nYa hemos preparado la documentación preventiva. ¿Podemos quedar 15 minutos esta semana para revisarlo juntos y evitar sorpresas? ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, necesitamos revisar un par de puntos preventivos de ${nombre} antes del cierre Q1. KonGest IA ya ha preparado la documentación. ¿Te parece si hablamos 15 min? ${FIRMA_WA}`,
    },
  }
}

/* ════ Modelo AEAT ════ */
export function modeloAEATModal({modelo, cliente, periodo, resultado, estado, estadoCls}) {
  const c = get(cliente)
  const amount = resultado?.match(/([\d.,]+€)/)?.[1] || ''
  const isIngresar = /ingresar/i.test(resultado || '')
  return {
    type:'modelo', accent:'#1A78FF',
    eyebrow:'KonGest IA · Borrador automático',
    title:`Modelo ${modelo} · ${cliente}`,
    subtitle:`${periodo || ''} · ${resultado || ''}`,
    badges:[{cls:estadoCls || 'b-ok',txt:estado || 'Borrador listo'}],
    fields:[
      {label:'Cliente', value:cliente, span:'full'},
      {label:'CIF', value:c.cif},
      {label:'Modelo', value:`Mod. ${modelo}`},
      {label:'Periodo', value:periodo},
      {label:'Resultado', value:resultado, color:isIngresar?'#e03030':'#1a9e4a'},
      {label:'Régimen', value:c.regimen},
      {label:'Email', value:c.email, span:'full'},
      {label:'Teléfono', value:c.phone ? `+${c.phone}` : '—'},
    ],
    sections:[
      {title:'Base de cálculo IA', rows:[
        ['Base imponible', amount ? `Calculada con datos contables ${periodo}` : 'Pendiente de datos'],
        ['Autogenerado por', 'KonGest IA · motor fiscal'],
        ['Verificado con', `Histórico 2023-2026 · contabilidad tiempo real`],
        ['Tiempo revisión estimado', '4-7 minutos'],
      ]},
      {title:'Acciones disponibles', note:'Revisa el borrador, firma con certificado digital y presenta directamente en AEAT. KonGest IA registra la trazabilidad Verifactu.'},
    ],
    editLabel:`Editar Mod. ${modelo}`,
    email:{
      to:c.email,
      subject:`Mod. ${modelo} · ${periodo} · ${cliente}`,
      body:`Hola ${firstName(c.contacto)},\n\nTe adjuntamos el borrador del Mod. ${modelo} correspondiente a ${periodo}:\n\n· Resultado: ${resultado}\n· Estado: ${estado || 'Borrador listo'}\n\nKonGest IA lo ha preparado usando tu contabilidad en tiempo real. Si lo ves bien, lo firmamos y presentamos directamente en AEAT. ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, el Mod. ${modelo} (${periodo}) de ${cliente} está listo: ${resultado}. Si lo ves bien, te paso el borrador al email para firma. ${FIRMA_WA}`,
    },
  }
}

/* ════ Firma de modelo (en cola de firma) ════ */
export function firmarModeloModal({modelo, cliente, resultado, estado, estadoCls, orden}) {
  const base = modeloAEATModal({modelo, cliente, periodo:'—', resultado, estado, estadoCls})
  return {
    ...base,
    type:'modelo', accent:'#e03030',
    eyebrow:`Cola de firma IA · Orden ${orden}`,
    title:`Firmar Mod. ${modelo} · ${cliente}`,
    badges:[{cls:estadoCls||'b-red',txt:estado || 'Firmar antes 20h'}],
    sections:[
      {title:'Proceso de firma', rows:[
        ['Paso 1', 'Revisar borrador IA (~4 min)'],
        ['Paso 2', 'Firma digital con certificado del cliente'],
        ['Paso 3', 'Envío automático AEAT + ticket Verifactu'],
        ['Paso 4', 'Confirmación al cliente por Email/WhatsApp IA'],
      ]},
      {title:'Urgencia', note:`Este modelo forma parte de la cola crítica del día. La IA lo ha priorizado en posición ${orden} basándose en vencimiento, riesgo e importe.`},
    ],
    editLabel:'Revisar borrador',
    email:{
      ...base.email,
      subject:`Firma pendiente · Mod. ${modelo} · ${cliente}`,
    },
  }
}

/* ════ Factura (cliente emite) ════ */
export function facturaModal({num, cliente, concepto, importe, fecha, estado, estadoCls}) {
  const c = CLIENTES[cliente] || {email:'contacto@cliente.es', phone:'34600000000', contacto:cliente}
  const isVencida = /vencida/i.test(estado || '')
  const isPendiente = /pendiente/i.test(estado || '')
  return {
    type:'factura', accent:isVencida?'#e03030':isPendiente?'#e8a010':'#1a9e4a',
    eyebrow:'Factura emitida',
    title:`${num}`,
    subtitle:`${cliente} · ${concepto}`,
    badges:[{cls:estadoCls || 'b-ok',txt:estado || 'Cobrada'}],
    fields:[
      {label:'Nº factura', value:num},
      {label:'Fecha emisión', value:fecha},
      {label:'Cliente', value:cliente, span:'full'},
      {label:'Concepto', value:concepto, span:'full'},
      {label:'Base imponible', value:calcBase(importe)},
      {label:'IVA 21%', value:calcIva(importe)},
      {label:'Total', value:importe, color:'#1a9e4a'},
      {label:'Email cliente', value:c.email, span:'full'},
    ],
    sections:[
      {title:'Estado de cobro', rows:[
        ['Estado actual', estado || 'Cobrada'],
        ['Método de pago', 'Transferencia'],
        ['IBAN', 'ES76 0049 0001 52 1234567890'],
        ['Referencia', num],
      ]},
      isVencida ? {title:'Acción IA', note:'Recordatorio automático enviado hace 3 días. Segunda reclamación programada para mañana. Si no se resuelve en 7 días, KonGest IA escalará a protocolo de cobro.'} :
      isPendiente ? {title:'Acción IA', note:'Recordatorio cordial enviado. Vencimiento estándar 30 días. Monitoreo activo.'} :
      {title:'Cobro completado', note:'Factura cobrada en plazo. Asiento contable generado automáticamente. Verifactu enviado a AEAT.'}
    ],
    editLabel:'Editar factura',
    email:{
      to:c.email,
      subject:`Factura ${num} · ${concepto}`,
      body:`Hola ${firstName(c.contacto)},\n\n${isVencida ? 'Te contactamos por la factura '+num+' que figura como vencida en nuestro sistema:' : isPendiente ? 'Adjuntamos recordatorio amistoso de la factura '+num+':' : 'Te reenviamos copia de la factura '+num+':'}\n\n· Concepto: ${concepto}\n· Importe: ${importe}\n· Fecha: ${fecha}\n· Referencia: ${num}\n\n${isVencida || isPendiente ? 'Si ya has realizado el pago, te agradecemos mucho que nos envíes el justificante para conciliarlo desde KonGest IA.' : 'Si necesitas algo más, estoy a tu disposición.'} ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, ${isVencida ? '¿cómo estamos con la factura '+num+'? Figura como vencida en nuestro sistema. Cualquier cosa me dices.' : isPendiente ? 'recordatorio amistoso de la factura '+num+' ('+importe+'). Gracias por tu atención.' : 'te reenvío copia de la factura '+num+' ('+importe+') por si la necesitas.'} ${FIRMA_WA}`,
    },
  }
}

/* ════ Recordatorio AEAT al cliente ════ */
export function recordatorioModal(nombre, modelo = '303', proxVenc = '20 Mar') {
  const c = get(nombre)
  return {
    type:'vencim', accent:'#1A78FF',
    eyebrow:'Recordatorio fiscal IA',
    title:`Recordatorio · ${nombre}`,
    subtitle:`Próximo vencimiento · Mod. ${modelo} · ${proxVenc}`,
    badges:[{cls:'b-amber',txt:'Envío pendiente'}],
    fields:[
      {label:'Cliente', value:nombre, span:'full'},
      {label:'Contacto', value:c.contacto},
      {label:'Email', value:c.email},
      {label:'Teléfono', value:c.phone ? `+${c.phone}` : '—'},
      {label:'Modelo próximo', value:`Mod. ${modelo}`},
      {label:'Vencimiento', value:proxVenc, color:'#e03030'},
    ],
    sections:[
      {title:'Mensaje preparado IA', note:`Texto profesional listo para enviar. La IA ha detectado que es el mejor momento (3-7 días antes del vencimiento) para maximizar la tasa de respuesta.`},
      {title:'Notas cliente', note:c.notas},
    ],
    editLabel:'Editar mensaje',
    email:{
      to:c.email,
      subject:`Recordatorio · Mod. ${modelo} · ${proxVenc}`,
      body:`Hola ${firstName(c.contacto)},\n\nTe recuerdo que el próximo ${proxVenc} vence el Mod. ${modelo} correspondiente a ${nombre}.\n\nKonGest IA ya tiene el borrador preparado con los datos de tu contabilidad en tiempo real. Solo necesitamos unos minutos para revisarlo juntos y firmarlo digitalmente antes del plazo.\n\n¿Te viene bien alguna hora esta semana? ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, recordatorio amistoso: el Mod. ${modelo} vence el ${proxVenc}. KonGest IA ya tiene el borrador listo. Solo falta revisarlo contigo y firmar. ¿Qué hora te viene bien? ${FIRMA_WA}`,
    },
  }
}

/* ════ Anomalía contable ════ */
export function anomaliaModal({cliente, tipo, impacto, factura}) {
  const c = get(cliente)
  return {
    type:'anomalia', accent:'#e8a010',
    eyebrow:'Motor anomalías IA',
    title:`Anomalía · ${cliente}`,
    subtitle:tipo,
    badges:[{cls:'b-amber',txt:'Corrección preparada IA'}],
    fields:[
      {label:'Cliente', value:cliente, span:'full'},
      {label:'Factura/Asiento', value:factura || '—'},
      {label:'Tipo', value:tipo},
      {label:'Impacto', value:impacto, color:'#e8a010'},
      {label:'Detectada', value:`Hoy · motor IA continuo`},
    ],
    sections:[
      {title:'Detalle técnico', rows:[
        ['Análisis', 'Comparativa con patrones sector + histórico 3 años'],
        ['Confianza IA', '94% · corrección segura'],
        ['Impacto fiscal si no corrige', `${impacto} en próximo cierre trimestral`, '#e03030'],
      ]},
      {title:'Acción propuesta IA', note:`Corrección preparada y lista para aplicar. La IA ha generado el asiento de corrección y la justificación técnica. Solo necesita tu validación antes de aplicar al libro.`},
    ],
    editLabel:'Editar corrección',
    email:{
      to:c.email,
      subject:`${cliente} · Anomalía detectada · ${tipo}`,
      body:`Hola ${firstName(c.contacto)},\n\nKonGest IA ha detectado una anomalía que conviene corregir antes del cierre del trimestre:\n\n· Tipo: ${tipo}\n· Impacto estimado: ${impacto}\n· Factura/Asiento: ${factura || '—'}\n\nYa tenemos la corrección preparada. Te contacto para validarla contigo y aplicarla esta semana. ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, KonGest IA ha detectado una anomalía menor en ${cliente} (${tipo}, impacto ${impacto}). Ya tenemos corrección preparada, solo necesita tu OK. ¿Hablamos? ${FIRMA_WA}`,
    },
  }
}

/* ════ Ajuste de precio (propuesta interna → envío al cliente) ════ */
export function ajustePrecioModal({cliente, actual, sugerida, delta, potencial}) {
  const c = get(cliente)
  return {
    type:'precio', accent:'#1A78FF',
    eyebrow:'Motor de precio IA',
    title:`Ajuste de honorarios · ${cliente}`,
    subtitle:c.negocio,
    badges:[{cls:'b-blue',txt:`Retorno anual ${potencial}`}],
    fields:[
      {label:'Cliente', value:cliente, span:'full'},
      {label:'Tarifa actual', value:actual},
      {label:'Tarifa propuesta IA', value:sugerida, color:'#1A78FF'},
      {label:'Δ', value:delta},
      {label:'Retorno anual estimado', value:potencial, color:'#1a9e4a'},
      {label:'Email contacto', value:c.email, span:'full'},
    ],
    sections:[
      {title:'Justificación IA', rows:[
        ['Margen actual', c.margen],
        ['Margen objetivo', '55% alineado con política del despacho'],
        ['Complejidad real del servicio', 'Incrementada en Q1 2026 (+12 modelos/mes)'],
        ['Benchmark sector', 'Tarifas comparables en 8 clientes similares'],
      ]},
      {title:'Comunicación recomendada', note:`El mensaje al cliente enfatiza el valor añadido (automatización 180h/año · ahorro deducciones aplicado) más que el ajuste. Probabilidad aceptación IA: 78%.`},
    ],
    editLabel:'Editar propuesta',
    email:{
      to:c.email,
      subject:`Revisión anual · ${cliente}`,
      body:`Hola ${firstName(c.contacto)},\n\nComo cada año, en ${DESPACHO} revisamos el encaje de nuestros servicios con las necesidades reales de cada cliente.\n\nEn el caso de ${cliente}, durante los últimos 12 meses KonGest IA ha automatizado más de 180 horas de trabajo operativo y ha detectado deducciones por valor de 5.500€. Nos gustaría ajustar la tarifa para reflejar ese valor añadido real:\n\n· Tarifa actual: ${actual}\n· Tarifa propuesta para el próximo ejercicio: ${sugerida} (${delta})\n\nRetorno neto estimado para ${cliente}: todo el ahorro fiscal + 40h/mes liberadas del equipo.\n\n¿Podemos agendar 20 minutos para repasarlo juntos? ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, te acabo de enviar por email la revisión anual de honorarios de ${cliente} (actual ${actual} → propuesta ${sugerida}). El ahorro fiscal IA compensa de sobra el ajuste. ¿Hablamos 20 min? ${FIRMA_WA}`,
    },
  }
}

/* ════ Vencimiento fiscal (calendario) ════ */
export function vencimientoModal({modelo, clientes, fecha, estado, txt}) {
  const firstCliente = clientes && clientes[0]
  const c = firstCliente ? get(firstCliente) : {}
  return {
    type:'vencim', accent:'#1A78FF',
    eyebrow:'Calendario fiscal IA',
    title:`Vencimiento Mod. ${modelo} · ${fecha}`,
    subtitle:`${clientes?.length || 0} clientes afectados`,
    badges:[{cls:estado || 'b-ok',txt:txt || 'Borrador IA listo'}],
    fields:[
      {label:'Modelo', value:`Mod. ${modelo}`},
      {label:'Fecha vencimiento', value:fecha, color:'#e03030'},
      {label:'Clientes afectados', value:`${clientes?.length || 0}`},
      {label:'Estado global', value:txt},
    ],
    sections:[
      {title:'Clientes', rows:(clientes || []).map(n => [n, get(n)?.servicio || '—'])},
      {title:'Acción IA', note:`Los borradores están ${txt}. La IA ha priorizado el orden de firma por importe y riesgo. Tiempo estimado total de revisión: ${Math.max(3, (clientes?.length || 1) * 5)} minutos.`},
    ],
    editLabel:'Editar lote',
    email:{
      to:firstCliente ? c.email : '',
      subject:`Vencimiento Mod. ${modelo} · ${fecha}`,
      body:`Recordatorio de vencimiento próximo:\n\n· Modelo: ${modelo}\n· Fecha: ${fecha}\n· Estado borrador: ${txt}\n· Clientes afectados: ${(clientes || []).join(', ')}\n\nKonGest IA tiene los borradores listos para firma. Solo falta revisar y presentar en AEAT. ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:firstCliente ? c.phone : '',
      text:`Mod. ${modelo} vence ${fecha}. ${(clientes || []).length} clientes · borradores KonGest IA listos. Revisamos y firmamos. ${FIRMA_WA}`,
    },
  }
}

/* ════ Alerta IA (dashboard alerts) ════ */
export function alertaModal({tipo, titulo, sub, cliente}) {
  const c = cliente ? get(cliente) : {}
  const accent = tipo === 'red' ? '#e03030' : tipo === 'amber' ? '#e8a010' : tipo === 'green' ? '#1a9e4a' : '#1A78FF'
  return {
    type:'alerta', accent,
    eyebrow:'Alerta KonGest IA',
    title:titulo,
    subtitle:cliente || sub,
    badges:[{cls:`b-${tipo === 'red' ? 'red' : tipo === 'amber' ? 'amber' : tipo === 'green' ? 'ok' : 'blue'}`,txt:tipo === 'red' ? 'Acción inmediata' : tipo === 'amber' ? 'Revisar pronto' : 'Informativa'}],
    fields:cliente ? [
      {label:'Cliente', value:cliente, span:'full'},
      {label:'Contacto', value:c.contacto},
      {label:'Email', value:c.email, span:'full'},
      {label:'Teléfono', value:c.phone ? `+${c.phone}` : '—'},
    ] : [],
    sections:[
      {title:'Detalle', note:sub},
      cliente ? {title:'Contexto cliente', note:c.notas} : null,
    ].filter(Boolean),
    editLabel:'Gestionar alerta',
    email:cliente ? {
      to:c.email,
      subject:`${cliente} · ${titulo}`,
      body:`Hola ${firstName(c.contacto)},\n\n${titulo}\n\n${sub}\n\n¿Hablamos para ver siguientes pasos? ${FIRMA_EMAIL}`,
    } : null,
    whatsapp:cliente ? {
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, ${titulo}. ${sub}. ¿Hablamos? ${FIRMA_WA}`,
    } : null,
  }
}

/* ════ Informe ejecutivo (export) ════ */
export function informeModal(tipo = 'BI') {
  const mapa = {
    BI:{t:'Informe ejecutivo · BI despacho', sub:'Marzo 2026 · 12 páginas · Chart.js incluido', rows:[
      ['Margen operativo', '68% (+11pp)', '#1a9e4a'],
      ['Proyección 2026', '1.38M€ (+21%)', '#1A78FF'],
      ['ROI KonGest IA', '4.2x', '#0D55CC'],
      ['Horas liberadas IA', '180h/mes', '#e8a010'],
    ]},
    rentabilidad:{t:'Informe de rentabilidad por cliente', sub:'Q1 2026 · 10 clientes · análisis margen', rows:[
      ['Margen medio despacho', '68%', '#1a9e4a'],
      ['Ingreso hora efectiva', '142€/h', '#1A78FF'],
      ['Clientes no rentables', '18 revisar', '#e8a010'],
    ]},
    ahorro:{t:'Informe de ahorro fiscal IA', sub:'TechPyme S.L. · 2026 · 6 páginas', rows:[
      ['Ahorro anual aplicado', '13.000€', '#1a9e4a'],
      ['Deducciones activas', '9.500€', '#1A78FF'],
      ['Optimizaciones operativas', '3.500€', '#00C8FF'],
      ['IS 2026 con/sin IA', '9k€ vs 22k€', '#e8a010'],
    ]},
  }
  const m = mapa[tipo] || mapa.BI
  return {
    type:'propuesta', accent:'#0D55CC',
    eyebrow:'Export KonGest IA',
    title:m.t,
    subtitle:m.sub,
    badges:[{cls:'b-blue',txt:'PDF generado'}],
    fields:[
      {label:'Tipo', value:tipo},
      {label:'Fecha', value:new Date().toLocaleDateString('es-ES')},
      {label:'Generado por', value:'KonGest IA · motor analítico', span:'full'},
    ],
    sections:[
      {title:'Highlights', rows:m.rows},
      {title:'Contenido', note:'El PDF incluye gráficos interactivos, benchmarks de sector, detalle por cliente y recomendaciones IA priorizadas.'},
    ],
    editLabel:'Personalizar PDF',
    email:{
      to:'',
      subject:m.t,
      body:`Te envío el ${m.t.toLowerCase()} generado por KonGest IA.\n\nResumen: ${m.sub}.\n\nCualquier detalle que quieras ampliar, me dices. ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:'',
      text:`Te acabo de enviar por email el ${m.t.toLowerCase()} (${m.sub}). ${FIRMA_WA}`,
    },
  }
}

/* ════ Lead detectado (captación) ════ */
export function leadModal({nombre, tipo, valor, canal}) {
  return {
    type:'cliente', accent:'#1a9e4a',
    eyebrow:'Lead detectado IA',
    title:`Contactar lead · ${nombre}`,
    subtitle:tipo,
    badges:[{cls:'b-ok',txt:`Valor estimado ${valor}`}],
    fields:[
      {label:'Nombre/Razón social', value:nombre, span:'full'},
      {label:'Perfil', value:tipo},
      {label:'Valor anual estimado', value:valor, color:'#1a9e4a'},
      {label:'Canal sugerido', value:canal || 'Email + LinkedIn'},
      {label:'Probabilidad conversión IA', value:'68%', color:'#1A78FF'},
    ],
    sections:[
      {title:'Mensaje IA preparado', note:`Mensaje profesional personalizado según perfil del prospecto. KonGest IA ha cruzado 23 señales públicas (web, LinkedIn, cuentas anuales).`},
      {title:'Siguientes pasos', rows:[
        ['Envío inicial', 'Email + conexión LinkedIn'],
        ['Follow-up IA', '72h si no responde'],
        ['Reunión propuesta', 'Plantilla cerrar 30 min'],
      ]},
    ],
    editLabel:'Editar mensaje',
    email:{
      to:'',
      subject:`${nombre} · Propuesta KonGest IA`,
      body:`Buenas tardes,\n\nSoy Laura Sánchez, del ${DESPACHO}. Desde nuestro motor de análisis sectorial hemos identificado a ${nombre} como un perfil que encaja con clientes a los que ayudamos de forma específica:\n\n· Perfil: ${tipo}\n· Dimensión aproximada: ${valor} de facturación\n\nTrabajamos con despachos y empresas del ecosistema con un enfoque distinto: IA proactiva de gestión fiscal y contable que automatiza el 80% del trabajo repetitivo y libera a los asesores para el trabajo estratégico.\n\n¿Te vendría bien agendar 20 minutos esta o próxima semana para conocer si encaja? ${FIRMA_EMAIL}`,
    },
    whatsapp:{
      phone:'',
      text:`Hola, soy Laura Sánchez del ${DESPACHO}. Hemos identificado ${nombre} como perfil ideal para nuestros servicios (${tipo}). ¿20 minutos esta semana para hablar? ${FIRMA_WA}`,
    },
  }
}

/* ════ Documento subido por cliente / bandeja ════ */
export function documentoModal({titulo, cliente, tipo, fecha, estado}) {
  const c = cliente ? get(cliente) : {}
  return {
    type:'propuesta', accent:'#1A78FF',
    eyebrow:'Documento KonGest IA',
    title:titulo,
    subtitle:cliente ? `${cliente} · ${tipo}` : tipo,
    badges:[{cls:estado === 'b-ok' ? 'b-ok' : 'b-amber',txt:estado === 'b-ok' ? 'Clasificado IA' : 'Revisar'}],
    fields:[
      {label:'Documento', value:titulo, span:'full'},
      cliente ? {label:'Cliente', value:cliente} : null,
      {label:'Tipo', value:tipo},
      {label:'Fecha', value:fecha},
      cliente && c.email ? {label:'Email cliente', value:c.email, span:'full'} : null,
    ].filter(Boolean),
    sections:[
      {title:'Procesamiento IA', rows:[
        ['OCR', 'Completado · confianza 94%'],
        ['Clasificación', tipo],
        ['Indexado', 'Búsqueda por lenguaje natural activa'],
        ['Vinculación', cliente ? `Asociado a ${cliente}` : 'Sin vincular'],
      ]},
    ],
    editLabel:'Editar documento',
    email:cliente ? {
      to:c.email,
      subject:`${titulo} · ${cliente}`,
      body:`Hola ${firstName(c.contacto)},\n\nTe reenvío copia del documento ${titulo} (${tipo}) con fecha ${fecha}.\n\nSi necesitas algo adicional, me dices. ${FIRMA_EMAIL}`,
    } : null,
    whatsapp:cliente ? {
      phone:c.phone,
      text:`Hola ${firstName(c.contacto)}, te reenvío ${titulo} (${tipo}, ${fecha}). ${FIRMA_WA}`,
    } : null,
  }
}

/* ════ Deducción IA para aplicar en IS ════ */
export function deduccionModal({nombre, ahorro, descripcion}) {
  return {
    type:'propuesta', accent:'#1a9e4a',
    eyebrow:'Deducción IA aplicable',
    title:nombre,
    subtitle:`Ahorro estimado: ${ahorro}`,
    badges:[{cls:'b-ok',txt:'Lista para aplicar'}],
    fields:[
      {label:'Deducción', value:nombre, span:'full'},
      {label:'Ahorro anual', value:ahorro, color:'#1a9e4a'},
      {label:'Cliente', value:CLIENTE_ACTUAL.nombre},
    ],
    sections:[
      {title:'Descripción', note:descripcion},
      {title:'Trámite IA', rows:[
        ['Documentación', 'KonGest IA la tiene preparada · 100% conforme AEAT'],
        ['Estado', 'Lista para aplicar al IS 2026'],
        ['Revisión asesora', 'Laura Sánchez · OK'],
      ]},
    ],
    editLabel:'Editar deducción',
    email:{
      to:CLIENTE_ACTUAL.asesora.email,
      subject:`Confirmación · ${nombre}`,
      body:`Hola Laura,\n\nConfirmo la aplicación de la deducción ${nombre} (ahorro ${ahorro}) al IS 2026 de ${CLIENTE_ACTUAL.nombre}.\n\nSi necesitas algún detalle más por mi parte, dime.\n\nUn saludo,\n${CLIENTE_ACTUAL.nombre}`,
    },
    whatsapp:{
      phone:CLIENTE_ACTUAL.asesora.phone,
      text:`Hola Laura, confirmo ${nombre} (ahorro ${ahorro}) al IS 2026. Gracias.`,
    },
  }
}

/* ════ Búsqueda documentos IA (resultados) ════ */
export function busquedaDocumentosModal(query) {
  const q = (query || '').trim() || 'todos los documentos'
  const results = [
    ['FRA-2026-0142','TechPyme S.L.','Factura recibida · Hoy','4.840,00€','b-ok'],
    ['Contrato alquiler local','Almacenes Valdés S.L.','Contrato · Ayer','—','b-ok'],
    ['Escritura constitución','Construcciones Arco','Escritura · 15 Mar','—','b-ok'],
    ['Nómina marzo 2026','Grupo Inversor Norte','Nómina · 14 Mar','—','b-ok'],
    ['Resolución AEAT','Transportes Montes','Notificación · 12 Mar','—','b-amber'],
    ['FRA-2026-0141','Almacenes Valdés S.L.','Factura recibida · Ayer','12.400,00€','b-ok'],
    ['FRA-2026-0140','Construcciones Arco','Factura recibida · 2d','8.920,00€','b-ok'],
    ['FRA-2026-0139','María González','Factura recibida · 2d','1.240,00€','b-amber'],
  ]
  return {
    type:'propuesta', accent:'#1A78FF',
    eyebrow:'Búsqueda KonGest IA · 0.4s',
    title:`Resultados · "${q}"`,
    subtitle:`${results.length} documentos encontrados · 1.842 totales indexados`,
    badges:[{cls:'b-blue',txt:'OCR IA · lenguaje natural'}],
    fields:[
      {label:'Consulta', value:q, span:'full'},
      {label:'Documentos totales', value:'1.842'},
      {label:'Tiempo búsqueda', value:'0.4s'},
      {label:'Precisión semántica', value:'94%'},
    ],
    sections:[
      {title:'Resultados (top 8)', rows:results.map(r => [`${r[0]} · ${r[1]}`, r[2], '#7a8899'])},
      {title:'Acción IA', note:'KonGest IA entiende lenguaje natural y devuelve documentos por contexto (no solo por nombre). Prueba: "facturas pendientes de cobro del Q1" o "contratos que vencen este año".'},
    ],
    editLabel:'Refinar búsqueda',
    email:{
      to:'',
      subject:`Resultado búsqueda KonGest IA · ${q}`,
      body:`Te envío los resultados de búsqueda "${q}":\n\n${results.slice(0,5).map(r => `· ${r[0]} · ${r[1]} · ${r[2]}`).join('\n')}\n\nPuedes acceder al documento completo desde el panel de KonGest IA.`,
    },
    whatsapp:{
      phone:'',
      text:`Resultados búsqueda "${q}" en KonGest IA: ${results.length} documentos. Top: ${results.slice(0,3).map(r => r[0]).join(', ')}. Accede desde el panel.`,
    },
  }
}

/* ════ Util: primer nombre ════ */
function firstName(nombreCompleto) {
  if (!nombreCompleto) return ''
  const parts = String(nombreCompleto).split(/[·\s]/).filter(Boolean)
  return parts[0] || nombreCompleto
}

function calcBase(totalStr) {
  const m = /([\d.,]+)€/.exec(totalStr || '')
  if (!m) return '—'
  const total = parseFloat(m[1].replace(/\./g,'').replace(',','.'))
  const base = total / 1.21
  return base.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2}) + '€'
}
function calcIva(totalStr) {
  const m = /([\d.,]+)€/.exec(totalStr || '')
  if (!m) return '—'
  const total = parseFloat(m[1].replace(/\./g,'').replace(',','.'))
  const iva = total - (total / 1.21)
  return iva.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2}) + '€'
}
