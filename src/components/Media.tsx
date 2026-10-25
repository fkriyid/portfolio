import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const clamp = (n: number) => Math.min(5, Math.max(1, n))
const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)
const ZOOM_IN = 'M11 8v6M8 11h6M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'
const ZOOM_OUT = 'M8 11h6M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'
const CLOSE = 'M18 6 6 18M6 6l12 12'

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [shown, setShown] = useState(false)
  const [view, setView] = useState({ s: 1, x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const drag = useRef(false)
  const close = useCallback(() => { setShown(false); window.setTimeout(onClose, 220) }, [onClose])
  const zoom = useCallback((f: (s: number) => number) => {
    setView(v => { const s = clamp(f(v.s)); return s === 1 ? { s, x: 0, y: 0 } : { ...v, s } })
  }, [])
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true))
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === '+' || e.key === '=') zoom(s => s * 1.4)
      if (e.key === '-') zoom(s => s / 1.4)
      if (e.key === '0') zoom(() => 1)
    }
    window.addEventListener('keydown', key)
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = prev; window.removeEventListener('keydown', key) }
  }, [close, zoom])
  const pill = 'flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95'
  const zoomed = view.s > 1
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={alt} className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-200 ${shown ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        onClick={e => { if (e.target === e.currentTarget) close() }}
        onWheel={e => zoom(s => s * (e.deltaY < 0 ? 1.2 : 1 / 1.2))}>
        <div className={`transition duration-300 ease-out ${shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <img src={src} alt={alt} draggable={false}
            onDoubleClick={() => setView(v => (v.s > 1 ? { s: 1, x: 0, y: 0 } : { s: 2.5, x: 0, y: 0 }))}
            onPointerDown={e => { if (!zoomed) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = true; setDragging(true) }}
            onPointerMove={e => { if (drag.current) setView(v => ({ ...v, x: v.x + e.movementX, y: v.y + e.movementY })) }}
            onPointerUp={() => { drag.current = false; setDragging(false) }}
            onPointerCancel={() => { drag.current = false; setDragging(false) }}
            className="max-h-[78vh] max-w-[92vw] rounded-lg shadow-2xl"
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`, transition: dragging ? 'none' : 'transform 250ms cubic-bezier(.2,.8,.2,1)', cursor: zoomed ? (dragging ? 'grabbing' : 'grab') : 'zoom-in', touchAction: 'none' }} />
        </div>
      </div>
      <button onClick={close} aria-label="Close" className={`${pill} absolute right-4 top-4 bg-white/10 backdrop-blur`}><Icon d={CLOSE} /></button>
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-3 px-4">
        <p className="rounded-full bg-black/40 px-4 py-1.5 text-center text-xs text-white/80 backdrop-blur">
          <span className="hidden sm:inline">Scroll to zoom · Drag to move · Double-click to toggle · Esc to close</span>
          <span className="sm:hidden">Use + and − to zoom · Drag to move</span>
        </p>
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-md">
          <button className={pill} onClick={() => zoom(s => s / 1.4)} aria-label="Zoom out"><Icon d={ZOOM_OUT} /></button>
          <button className="w-14 text-center text-sm font-medium text-white" onClick={() => zoom(() => 1)} aria-label="Reset zoom">{Math.round(view.s * 100)}%</button>
          <button className={pill} onClick={() => zoom(s => s * 1.4)} aria-label="Zoom in"><Icon d={ZOOM_IN} /></button>
        </div>
      </div>
    </div>, document.body)
}

export default function Media({ src, alt, ratio = '16/9', className = '' }: { src: string; alt: string; ratio?: string; className?: string }) {
  const [bad, setBad] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <div className={`glass overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: ratio }}>
      {bad ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[repeating-linear-gradient(135deg,#F1F4F8,#F1F4F8_10px,#F7F9FB_10px,#F7F9FB_20px)] p-3 text-center text-xs text-mute" role="img" aria-label={alt}>
          <span>Visual coming soon</span>
          {import.meta.env.DEV && <code className="text-[10px] text-accent">missing: public{src}</code>}
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge image: ${alt}`} className="group relative block h-full w-full cursor-zoom-in overflow-hidden">
          <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-ink/0 transition duration-300 group-hover:bg-ink/15" />
          <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur transition duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
            <Icon d={ZOOM_IN} /> Click to zoom
          </span>
        </button>
      )}
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </div>)
}
