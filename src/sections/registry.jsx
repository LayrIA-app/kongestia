import { DashDirector } from './director/DashDirector'
import { DirRentabilidad, DirClientes, DirEquipo, DirBI } from './director/Placeholders'
import { DirRiesgo, DirPrevision, DirCartera, DirPrecio, DirSimulador, DirCaptacion, DirDetector, DirSucesion } from './director/Advanced'
import {
  AsesorDash,
  AsClientes, AsCalendario, AsContabilidad, AsNominas, AsDocumentos,
  AsModelos, AsAnomalias, AsNormativa, AsVerifactu, AsCierre, AsSimulador,
  AsFirma, AsCarga, AsRadar, AsCom,
} from './asesor/AsesorSections'

const IC = (d) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>

export const SECTIONS_DIRECTOR = [
  { section:'Panel' },
  { id:'dash',         label:'Dashboard',             ia:true, Component:DashDirector,    icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'rentabilidad', label:'Rentabilidad',          ia:true, Component:DirRentabilidad, icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'clientes',     label:'Cartera de clientes',   ia:true, Component:DirClientes,     icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { id:'equipo',       label:'Equipo',                ia:true, Component:DirEquipo,       icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { id:'captacion',    label:'Captación',             ia:true, Component:DirCaptacion,    icon:IC('M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z') },
  { section:'Inteligencia IA' },
  { id:'bi',           label:'Business Intelligence', ia:true, Component:DirBI,           icon:IC('M3 3v18h18') },
  { id:'precio',       label:'Motor de precio',       ia:true, Component:DirPrecio,       icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'riesgo',       label:'Motor de Riesgo',       ia:true, Component:DirRiesgo,       icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'prevision',    label:'Previsión ingresos',    ia:true, Component:DirPrevision,    icon:IC('M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6') },
  { id:'cartera',      label:'IA Predictiva',         ia:true, Component:DirCartera,      icon:IC('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v8M8 12h8') },
  { id:'detector',     label:'Motor oportunidades',   ia:true, Component:DirDetector,     icon:IC('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z') },
  { id:'simulador',    label:'Simulador fiscal',      ia:true, Component:DirSimulador,    icon:IC('M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42') },
  { section:'Estrategia' },
  { id:'sucesion',     label:'Planif. sucesión',      ia:true, Component:DirSucesion,     icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
]

export const SECTIONS_ASESOR = [
  { section:'Mi Trabajo' },
  { id:'as-dash',         label:'Mi Dashboard',       ia:true, Component:AsesorDash,     icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'as-clientes',     label:'Mis Clientes',       ia:true, Component:AsClientes,     icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { id:'as-calendario',   label:'Calendario fiscal',  ia:true, Component:AsCalendario,   icon:IC('M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z') },
  { id:'as-contabilidad', label:'Contabilidad',       ia:true, Component:AsContabilidad, icon:IC('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z') },
  { id:'as-nominas',      label:'Nóminas & Laboral',  ia:true, Component:AsNominas,      icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'as-documentos',   label:'Documentos IA',      ia:true, Component:AsDocumentos,   icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { section:'Inteligencia IA' },
  { id:'as-modelos',      label:'Modelos AEAT',       ia:true, Component:AsModelos,      icon:IC('M13 2L3 14h9l-1 8 10-12h-9l1-8z') },
  { id:'as-firma',        label:'Asistente Firma',    ia:true, Component:AsFirma,        icon:IC('M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34') },
  { id:'as-anomalias',    label:'Motor anomalías',    ia:true, Component:AsAnomalias,    icon:IC('M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35') },
  { id:'as-normativa',    label:'Monitor normativo',  ia:true, Component:AsNormativa,    icon:IC('M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0') },
  { id:'as-verifactu',    label:'Verifactu IA',       ia:true, Component:AsVerifactu,    icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'as-cierre',       label:'Planif. cierre',     ia:true, Component:AsCierre,       icon:IC('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2') },
  { id:'simulador',       label:'Simulador fiscal',   ia:true, Component:AsSimulador,    icon:IC('M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42') },
  { section:'Operativa IA' },
  { id:'as-carga',        label:'Carga OCR rápida',   ia:true, Component:AsCarga,        icon:IC('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12') },
  { id:'as-radar',        label:'Radar del sector',   ia:true, Component:AsRadar,        icon:IC('M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z') },
  { id:'as-com',          label:'Comunicación',       ia:true, Component:AsCom,          icon:IC('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z') },
]
