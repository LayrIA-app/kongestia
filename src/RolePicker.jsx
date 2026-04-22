import { useEffect, useRef, useState } from 'react'

const FBG_ITEMS = ['FAC-2026-0142','3.847,00 €','IVA 21%','303 · Q1','FAC-2026-0139','12.400,00 €','IRPF 15%','111 · Feb','Sociedades 25%','FAC-2026-0156','8.920,00 €','200 · 2025','1.240,00 €','FAC-2026-0161','24.800,00 €','6.320,00 €','130 · Q4','15.600,00 €','IRPF 19%','FAC-2026-0133','347,00 €']

const TW_PHRASES = ['IA gestiona modelos AEAT...', 'IA detecta anomalías contables...', 'IA optimiza rentabilidad por cliente...', 'IA anticipa vencimientos fiscales...']

export function RolePicker({ onSelect }) {
  const fbgRef = useRef(null)
  const [twText, setTwText] = useState('')
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const el = fbgRef.current
    if (!el || el.children.length) return
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('span')
      s.textContent = FBG_ITEMS[i % FBG_ITEMS.length]
      s.style.cssText = `left:${Math.random()*70}%;top:${Math.random()*90}%;font-size:${10+Math.random()*10}px;animation-duration:${18+Math.random()*22}s;animation-delay:-${Math.random()*22}s;overflow:hidden;text-overflow:ellipsis;max-width:100px;`
      el.appendChild(s)
    }
  }, [])

  useEffect(() => {
    let phraseIdx = 0
    let charIdx = 0
    let deleting = false
    const tick = () => {
      const phrase = TW_PHRASES[phraseIdx]
      if (!deleting) {
        charIdx++
        setTwText(phrase.slice(0, charIdx))
        if (charIdx >= phrase.length) { deleting = true; setTimeout(tick, 1800); return }
      } else {
        charIdx--
        setTwText(phrase.slice(0, charIdx))
        if (charIdx <= 0) { deleting = false; phraseIdx = (phraseIdx + 1) % TW_PHRASES.length }
      }
      setTimeout(tick, deleting ? 30 : 60)
    }
    const t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const target = 1247
    let n = 0
    const step = Math.ceil(target / 80)
    const t = setInterval(() => {
      n = Math.min(n + step, target)
      setCounter(n)
      if (n >= target) clearInterval(t)
    }, 25)
    return () => clearInterval(t)
  }, [])

  return (
    <div id="roleScreen">
      <div className="rs-split"></div>
      <div className="rs-fbg" ref={fbgRef}></div>
      <div className="rs-inner">
        <div className="rs-logo-wrap">
          <div className="rs-logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".3"/>
              <rect x="9" y="9" width="6" height="14" rx="1.5" fill="#fff"/>
              <rect x="17" y="13" width="6" height="10" rx="1.5" fill="#fff" opacity=".75"/>
              <rect x="23" y="5" width="6" height="6" rx="2" fill="#fff"/>
              <text x="26" y="9.5" textAnchor="middle" fontSize="4" fontWeight="700" fill="#0D1F3C" fontFamily="sans-serif">IA</text>
            </svg>
          </div>
          <div className="rs-logo-text">
            <span className="rs-logo-dark">Kon</span><span className="rs-logo-dark">Gest</span><span className="rs-logo-blue"> IA</span>
          </div>
        </div>
        <div className="rs-tagline">— Gestión Fiscal · Contable · IA 4ª Generación —</div>
        <div className="rs-subtitle">Selecciona el perfil que deseas ver</div>

        <div className="rs-tw-wrap"><span className="rs-tw-text">{twText}</span><span className="rs-tw-cursor">|</span></div>

        <div className="rs-counter-row">
          <div className="rs-counter-dot"></div>
          <div className="rs-counter-txt"><span className="rs-counter-num">{counter}</span> declaraciones gestionadas hoy</div>
        </div>

        <div className="rs-canales">
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#FF6B2B'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 5.91 5.91l.27-.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#FF6B2B'}}>VOZ IA</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#25D366'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#25D366'}}>WHATSAPP</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#378ADD'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#378ADD'}}>EMAIL</span>
          </div>
        </div>
        <div className="rs-canal-sub">KonGest IA gestiona todos tus canales</div>

        <div className="rs-cards">
          <div className="rs-card" onClick={() => onSelect('director')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-1">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="12" width="4" height="9" rx="1" fill="#1A78FF"/>
                  <rect x="10" y="7" width="4" height="14" rx="1" fill="#1A78FF" opacity=".8"/>
                  <rect x="17" y="3" width="4" height="18" rx="1" fill="#1A78FF" opacity=".6"/>
                  <path d="M3 8L7 5L12 7L17 3" stroke="#00C8FF" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="rs-cn-dark">Director</div>
              <div className="rs-cd-dark">Rentabilidad, cartera y KPIs del despacho en tiempo real</div>
            </div>
            <div className="rs-cta-1">Entrar →</div>
          </div>
          <div className="rs-card" onClick={() => onSelect('asesor')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="3" width="16" height="18" rx="2" stroke="#fff" strokeWidth="1.8" fill="none"/>
                  <rect x="7" y="7" width="10" height="2" rx="1" fill="#fff"/>
                  <rect x="7" y="11" width="8" height="2" rx="1" fill="#fff" opacity=".7"/>
                  <rect x="7" y="15" width="6" height="2" rx="1" fill="#fff" opacity=".5"/>
                  <circle cx="18" cy="18" r="4" fill="#fff" opacity=".9"/>
                  <path d="M16.5 18L17.5 19L19.5 17" stroke="#1A78FF" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="rs-cn-light">Asesor</div>
              <div className="rs-cd-light">Modelos AEAT, contabilización autónoma y plazos fiscales IA</div>
            </div>
            <div className="rs-cta-2">Entrar →</div>
          </div>
          <div className="rs-card" onClick={() => onSelect('cliente')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#1A78FF" strokeWidth="1.8" fill="none"/>
                  <path d="M3 9h18" stroke="#1A78FF" strokeWidth="1.5"/>
                  <rect x="7" y="13" width="4" height="3" rx="1" fill="#1A78FF" opacity=".7"/>
                  <rect x="13" y="13" width="4" height="3" rx="1" fill="#00C8FF" opacity=".7"/>
                </svg>
              </div>
              <div className="rs-cn-light">Cliente</div>
              <div className="rs-cd-light">Mi situación fiscal en tiempo real y previsión trimestral IA</div>
            </div>
            <div className="rs-cta-3">Entrar →</div>
          </div>
        </div>
      </div>
      <div className="rs-footer">
        <div className="rs-footer-txt">COAXIONIA · KonGest IA</div>
        <div className="rs-footer-dot"></div>
        <div className="rs-footer-txt">Selecciona tu perfil</div>
      </div>
    </div>
  )
}
