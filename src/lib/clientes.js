/* KonGest IA · registro central de clientes de la cartera
 *
 * Datos de contexto que la IA ya conoce — email y teléfono se prerrellenan en
 * los modales de Enviar (Email mailto: · WhatsApp wa.me/). Formato teléfono
 * internacional E.164 sin + ni espacios (ej. 34612345678).
 */

export const CLIENTES = {
  'TechPyme S.L.': {
    cif:'B-87432098', contacto:'Javier Ortiz · CFO',
    email:'javier.ortiz@techpyme.es', phone:'34612340011',
    negocio:'SaaS · 28 empleados · Madrid',
    servicio:'Fiscal integral · IS + IVA · RRHH',
    facturado:'28.400€/año', margen:'+67%',
    regimen:'IS 25% · IVA 21% estándar',
    banco:'CaixaBank ES76 0049 0001 52 1234567890',
    notas:'Cliente modelo · paga puntual · candidato a upselling asesoría financiera',
  },
  'Almacenes Valdés S.L.': {
    cif:'B-45678321', contacto:'Miguel Valdés · Gerente',
    email:'miguel@almacenesvaldes.es', phone:'34618720544',
    negocio:'Distribución alimentaria · 22 empleados · Valencia',
    servicio:'Fiscal + Laboral completo',
    facturado:'34.600€/año', margen:'+69%',
    regimen:'IS 25% · IVA 21% + 10% alimentación',
    banco:'Santander ES12 0075 0123 45 0987654321',
    notas:'Cartera estable · revisar deducción I+D logística Q3',
  },
  'Grupo Inversor Norte': {
    cif:'A-60123456', contacto:'Rosa Etxebarria · Dir. Financiera',
    email:'rosa.etxebarria@gruponorte.es', phone:'34691455320',
    negocio:'Holding familiar · 6 empleados · Bilbao',
    servicio:'Fiscal + Contable + Asesoría financiera',
    facturado:'48.200€/año', margen:'+71%',
    regimen:'Régimen consolidación fiscal · IS grupo',
    banco:'BBVA ES34 0182 5432 10 1122334455',
    notas:'Top cliente · probabilidad upselling asesoría 74% · reunión programada 28 Mar',
  },
  'Construcciones Arco': {
    cif:'B-29874503', contacto:'Antonio Ramírez · Administrador',
    email:'administracion@construccionesarco.es', phone:'34654887021',
    negocio:'Construcción · 14 empleados · Sevilla',
    servicio:'Fiscal + Contable',
    facturado:'19.800€/año', margen:'+43%',
    regimen:'IS 25% · IVA 21% construcción',
    banco:'Caja Rural ES90 3025 0012 34 5566778899',
    notas:'Score riesgo 62 · patrón pago tardío · IVA deducido atípico · protocolo IA activo',
  },
  'Farmacia Beltrán': {
    cif:'B-71234567', contacto:'Lucía Beltrán · Titular',
    email:'lbeltran@farmaciabeltran.com', phone:'34676990812',
    negocio:'Farmacia · autónoma · Zaragoza',
    servicio:'Contable · IRPF + IVA',
    facturado:'16.400€/año', margen:'+70%',
    regimen:'IRPF módulos · IVA 4% productos sanitarios',
    banco:'Kutxabank ES55 2095 0123 45 1122334455',
    notas:'Margen alto · candidato upselling SAC IA · retenciones IRPF revisar Q3-Q4',
  },
  'Industrias Clave S.A.': {
    cif:'A-33222111', contacto:'Pedro Clavero · Director General',
    email:'direccion@industriasclave.es', phone:'34660554488',
    negocio:'Industrial · 18 empleados · Barcelona',
    servicio:'Fiscal + RRHH',
    facturado:'14.200€/año', margen:'+52%',
    regimen:'IS 25% · IVA 21% · tramo I+D aplicable',
    banco:'Sabadell ES44 0081 0123 45 6677889900',
    notas:'Reserva capitalización aplicable · ahorro IS 5.500€ · documentar operaciones vinculadas',
  },
  'María González': {
    cif:'78901234M', contacto:'María González',
    email:'maria.gonzalez.autonoma@gmail.com', phone:'34665112233',
    negocio:'Autónoma · consultoría estratégica',
    servicio:'IRPF + IVA',
    facturado:'8.400€/año', margen:'+71%',
    regimen:'IRPF estimación directa · IVA 21%',
    banco:'ING ES66 1465 0123 45 8877665544',
    notas:'Anomalía asiento duplicado FRA-2026-0139 · corrección IA preparada',
  },
  'Transportes Montes': {
    cif:'B-55112233', contacto:'Jorge Montes · Gerente',
    email:'jorge@transportesmontes.es', phone:'34677445566',
    negocio:'Logística · 12 empleados · Murcia',
    servicio:'Contable',
    facturado:'7.800€/año', margen:'−5%',
    regimen:'IS 25% · IVA 21% · módulos transporte',
    banco:'Unicaja ES22 2103 0123 45 3344556677',
    notas:'Módulos fiscales incompatibles facturación real · diferencia 2.840€ · revisar antes cierre Q1',
  },
  'Clínica Sur S.L.': {
    cif:'B-90887766', contacto:'Dra. Elena Ruiz · Gerente Médico',
    email:'direccion@clinicasur.es', phone:'34693221100',
    negocio:'Clínica privada · 8 empleados · Málaga',
    servicio:'Fiscal + Laboral',
    facturado:'6.200€/año', margen:'+69%',
    regimen:'IVA exento sanidad · IS 25%',
    banco:'CaixaBank ES76 0049 1234 56 5566778822',
    notas:'Perfil ideal · candidato upselling asesoría financiera',
  },
  'Automoción Pérez': {
    cif:'22334455P', contacto:'Luis Pérez',
    email:'luis.perez.automocion@outlook.es', phone:'34681556677',
    negocio:'Autónomo · taller · Granada',
    servicio:'IRPF + Contable',
    facturado:'4.100€/año', margen:'-7%',
    regimen:'IRPF módulos · IVA 21% módulos automoción',
    banco:'Caja Rural ES90 3025 9988 77 6655443322',
    notas:'Gastos no justificados · tickets sin digitalizar · revisar tarifa y retención',
  },
  'Restaurantes Bernat': {
    cif:'B-11998877', contacto:'Marc Bernat · Propietario',
    email:'marc@restaurantesbernat.cat', phone:'34633778899',
    negocio:'Restauración · 16 empleados · Barcelona',
    servicio:'Fiscal + Laboral',
    facturado:'11.800€/año', margen:'+42%',
    regimen:'IS 25% · IVA 10% hostelería',
    banco:'Banco Sabadell ES44 0081 2233 44 8877665500',
    notas:'Riesgo baja 45 días · satisfacción IA 42 · reunión revisión servicio',
  },
  'Manufacturas del Norte S.L.': {
    cif:'B-88776655', contacto:'Sergio Iturria · Dir. Financiero',
    email:'s.iturria@manufacturasdelnorte.es', phone:'34634887766',
    negocio:'Industrial · 35 empleados · Santander',
    servicio:'(Lead IA · sin asesoría actual)',
    facturado:'12.400€/año estimado', margen:'Objetivo 68%',
    regimen:'IS 25% · IVA 21% industrial',
    banco:'—',
    notas:'Lead detectado IA · valor anual estimado 12.400€ · perfil ideal pyme industrial',
  },
}

/* Cliente actual cuando el perfil es cliente (TechPyme es el cliente logueado) */
export const CLIENTE_ACTUAL = {
  nombre:'TechPyme S.L.',
  asesora:{nombre:'Laura Sánchez', email:'laura.sanchez@despacho.es', phone:'34696001122'},
  despacho:{nombre:'Despacho Mendoza & Asociados', email:'contacto@despacho.es', phone:'34917001122'},
}

export function getCliente(nombre) {
  return CLIENTES[nombre] || null
}

export function getContactoAsesora() {
  return CLIENTE_ACTUAL.asesora
}
