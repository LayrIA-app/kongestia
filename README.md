# KonGest IA · MVP Fase 2

Ecosistema IA Adaptativa · Gestión Fiscal y Contable · 4ª Generación
Parte del ecosistema **COAXIONIA**.

## Stack

- **Vite** 8 + **React** 19
- Sin backend: los botones disparan `showToast` con mensajes contextuales (Fase 2 = producto visual completo, sin BBDD ni IA real)
- Responsive COAXIONIA: 360 / 480 / 768 / 900 / 1100 / 1400 con escalado `html{font-size}` +15-20% en móvil
- Reglas del ecosistema aplicadas desde el commit 0 (ver `SISTEMA_FRANQUICIA.md`): sin chat reactivo, sin bordes laterales de color acento, sin overflow horizontal, todo botón con `onClick` activo

## Perfiles

1. **Director / Socio** — rentabilidad, cartera, BI, motor de precio y de riesgo, previsión
2. **Gestor / Asesor** — modelos AEAT, asistente de firma, simulador fiscal, motor de anomalías, calendario
3. **Cliente** — IVA/IRPF tiempo real, facturas, simulador fiscal, score, previsión, ahorro

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```

## Deploy

Configurado para Vercel (ver `vercel.json`). Framework: Vite. Build command: `npm run build`. Output: `dist`.

## Fase 3 (pendiente)

- Login real (Supabase Auth)
- Base de datos (Supabase)
- IA real (Claude API) conectada por sección
- Envío de emails (Resend), PDFs (jsPDF), pagos (Stripe/Redsys)
- Integraciones: Google Calendar, WhatsApp Business, Verifactu, SII, Holded/A3/SAGE

## Estructura

```
src/
  App.jsx                 · entry · role router
  RolePicker.jsx          · portada con 3 perfiles
  LoginScreen.jsx         · login split por rol
  AppShell.jsx            · shell para director / asesor
  index.css               · estilos globales + safety net + responsive 360→1920
  components/
    Toast.jsx             · showToast() global
    BellAlerts.jsx        · campana alertas IA por rol
    PushNotifications.jsx · notificaciones push cada 38s
    Modal.jsx             · modal genérico
  sections/
    common.jsx            · primitivas (PageHdr, KpiGrid, Card, Alert, IaBox, TblBtn, Placeholder)
    registry.jsx          · registro de secciones por rol
    director/             · sección Dashboard migrada + 8 placeholders funcionales
    asesor/               · AsesorDash migrada + 8 secciones funcionales
  cliente/
    ClienteShell.jsx      · shell separado del cliente
    sectionsCliente.jsx   · 12 secciones del portal cliente
```
