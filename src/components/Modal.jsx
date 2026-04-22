export function Modal({ title, sub, children, onClose, actions }) {
  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={e => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        {title && <div className="dm-title">{title}</div>}
        {sub && <div className="dm-sub">{sub}</div>}
        {children}
        {actions && <div className="dm-actions">{actions}</div>}
      </div>
    </div>
  )
}
