import { useEffect, useRef } from 'react'

export function ChartJS({ type, data, options, height = 180 }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const C = typeof window !== 'undefined' && window.Chart
    if (!C || !ref.current) return
    chartRef.current = new C(ref.current, { type, data, options })
    return () => { chartRef.current?.destroy() }
  }, [type, data, options])

  return (
    <div style={{ position: 'relative', height, margin: '12px 0 8px' }}>
      <canvas ref={ref} />
    </div>
  )
}
