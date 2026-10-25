import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, nodes: Node[] = []
    const mouse = { x: -9999, y: -9999 }
    const LINK = 150, REACH = 190

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(70, Math.floor((w * h) / 20000))
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }))
      draw()
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) { ctx.strokeStyle = `rgba(37,99,235,${0.16 * (1 - d / LINK)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < REACH) { ctx.strokeStyle = `rgba(37,99,235,${0.45 * (1 - dm / REACH)})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
        ctx.fillStyle = dm < REACH ? 'rgba(37,99,235,.75)' : 'rgba(16,42,76,.28)'
        ctx.beginPath(); ctx.arc(a.x, a.y, dm < REACH ? 2.6 : 2, 0, 6.283); ctx.fill()
      }
    }
    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      draw(); raf = requestAnimationFrame(tick)
    }
    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const leave = () => { mouse.x = mouse.y = -9999 }
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) tick() }

    resize()
    if (!reduce) { tick(); window.addEventListener('pointermove', move); window.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', vis) }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); window.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
