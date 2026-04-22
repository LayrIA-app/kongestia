import { DashDirector } from './director/DashDirector'
import { DirRentabilidad, DirClientes, DirEquipo, DirBI, DirPrecio, DirRiesgo, DirPrevision, DirCartera } from './director/Placeholders'
import { AsesorDash, AsClientes, AsModelos, AsFirma, AsSimulador, AsDocumentos, AsCalendario, AsComunicacion, AsDetector } from './asesor/AsesorSections'

const IC = (d) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>

export const SECTIONS_DIRECTOR = [
  { section:'Panel' },
  { id:'dash',         label:'Dashboard',           ia:true, Component:DashDirector,   icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'rentabilidad', label:'Rentabilidad',        ia:true, Component:DirRentabilidad, icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'clientes',     label:'Cartera de clientes', ia:true, Component:DirClientes,     icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { id:'equipo',       label:'Equipo',              ia:true, Component:DirEquipo,       icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { section:'Inteligencia IA' },
  { id:'bi',           label:'Business Intelligence', ia:true, Component:DirBI,       icon:IC('M3 3v18h18') },
  { id:'precio',       label:'Motor de precio',     ia:true, Component:DirPrecio,       icon:IC('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6') },
  { id:'riesgo',       label:'Motor de Riesgo',     ia:true, Component:DirRiesgo,       icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'prevision',    label:'Previsión ingresos',  ia:true, Component:DirPrevision,    icon:IC('M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6') },
  { id:'cartera',      label:'IA Predictiva',       ia:true, Component:DirCartera,      icon:IC('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v8M8 12h8') },
]

export const SECTIONS_ASESOR = [
  { section:'Operativa' },
  { id:'as-dash',        label:'Panel Operativo',    ia:true, Component:AsesorDash,    icon:IC('M18 20V10M12 20V4M6 20v-6') },
  { id:'as-clientes',    label:'Mis clientes',       ia:true, Component:AsClientes,    icon:IC('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z') },
  { id:'as-modelos',     label:'Modelos AEAT',       ia:true, Component:AsModelos,     icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { id:'as-firma',       label:'Asistente Firma',    ia:true, Component:AsFirma,       icon:IC('M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34') },
  { id:'as-calendario',  label:'Calendario fiscal',  ia:true, Component:AsCalendario,  icon:IC('M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z') },
  { section:'Inteligencia IA' },
  { id:'simulador',      label:'Simulador fiscal',   ia:true, Component:AsSimulador,   icon:IC('M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42') },
  { id:'as-detector',    label:'Motor anomalías',    ia:true, Component:AsDetector,    icon:IC('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z') },
  { id:'as-documentos',  label:'Documentos IA',      ia:true, Component:AsDocumentos,  icon:IC('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z') },
  { id:'as-com',         label:'Comunicación',       ia:true, Component:AsComunicacion, icon:IC('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z') },
]
