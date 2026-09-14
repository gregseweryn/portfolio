import React, { useEffect, useRef } from 'react'

export type FigureType = 'research' | 'design' | 'systems' | 'a11y'

interface GeometricFigureProps {
  type: FigureType
}

// 1. UX Research: 4D Tesseract Wireframe Projection
const TesseractFigure: React.FC = () => {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return

    const verts: [number, number, number, number][] = []
    for (let x = -1; x <= 1; x += 2)
      for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2)
          for (let w = -1; w <= 1; w += 2)
            verts.push([x, y, z, w])

    const edges: [number, number][] = []
    for (let i = 0; i < 16; i++)
      for (let j = i + 1; j < 16; j++) {
        let d = 0
        for (let k = 0; k < 4; k++) if (verts[i][k] !== verts[j][k]) d++
        if (d === 1) edges.push([i, j])
      }

    let animId: number

    function frame(now: number) {
      const a = (now / 1000) * 0.7
      const cosA = Math.cos(a), sinA = Math.sin(a)
      const cosB = Math.cos(a * 0.7), sinB = Math.sin(a * 0.7)
      const pts: { x: number; y: number; w: number }[] = []

      for (let i = 0; i < 16; i++) {
        const [x, y, z, w] = verts[i]
        const z1 = z * cosA - w * sinA, w1 = z * sinA + w * cosA
        const x1 = x * cosB - w1 * sinB, w2 = x * sinB + w1 * cosB
        const f4 = 1 / (2.4 - w2)
        const x3 = x1 * f4, y3 = y * f4, z3 = z1 * f4
        const rotY = a * 0.4
        const rx = x3 * Math.cos(rotY) - z3 * Math.sin(rotY)
        const rz = x3 * Math.sin(rotY) + z3 * Math.cos(rotY)
        const f3 = 1 / (3.2 - rz)
        pts.push({ x: rx * f3 * 125, y: y3 * f3 * 125, w: w2 })
      }

      let out = ''
      edges.forEach(([p1, p2]) => {
        const avgW = (pts[p1].w + pts[p2].w) / 2
        const stroke = avgW < -0.2 ? '#666666' : '#111111'
        const width = avgW < -0.2 ? 1.0 : 1.5
        out += `<line x1="${pts[p1].x.toFixed(1)}" y1="${pts[p1].y.toFixed(1)}" x2="${pts[p2].x.toFixed(1)}" y2="${pts[p2].y.toFixed(1)}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`
      })
      pts.forEach(p => {
        out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.w > 0 ? 2.6 : 1.8}" fill="#111111"/>`
      })
      if (g) g.innerHTML = out
      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center select-none bg-transparent transition-transform duration-300 group-hover:scale-[1.03]">
      <svg viewBox="-120 -100 240 200" className="w-full h-full max-w-[280px] max-h-[220px] overflow-visible">
        <g ref={gRef} />
      </svg>
    </div>
  )
}

// 2. UX & UI Design: Isometric Exploded Cube
const IsometricCubeFigure: React.FC = () => {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return

    const verts = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ]
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]

    let animId: number

    function frame(now: number) {
      const t = now / 1000
      const rotY = t * 0.45, rotX = 0.615479
      const explode = Math.sin(t * 1.5) * 0.25 + 0.25
      const scale = 54
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      const pts = verts.map(([vx, vy, vz]) => {
        const ex = vx * (1 + explode * 0.4)
        const ey = vy * (1 + explode * 0.6)
        const ez = vz * (1 + explode * 0.4)
        const x1 = ex * cosY - ez * sinY
        const z1 = ex * sinY + ez * cosY
        const y2 = ey * cosX - z1 * sinX
        return { x: x1 * scale, y: y2 * scale }
      })

      let out = '<line x1="-90" y1="65" x2="90" y2="65" stroke="#cccccc" stroke-width="0.75" stroke-dasharray="3 3"/>'
      edges.forEach(([a, b]) => {
        out += `<line x1="${pts[a].x.toFixed(1)}" y1="${pts[a].y.toFixed(1)}" x2="${pts[b].x.toFixed(1)}" y2="${pts[b].y.toFixed(1)}" stroke="#111111" stroke-width="1.5" stroke-linecap="round"/>`
      })
      pts.forEach(p => {
        out += `<rect x="${(p.x - 2.5).toFixed(1)}" y="${(p.y - 2.5).toFixed(1)}" width="5" height="5" fill="#ffffff" stroke="#111111" stroke-width="1.2"/>`
      })
      if (g) g.innerHTML = out
      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center select-none bg-transparent transition-transform duration-300 group-hover:scale-[1.03]">
      <svg viewBox="-120 -100 240 200" className="w-full h-full max-w-[280px] max-h-[220px] overflow-visible">
        <g ref={gRef} />
      </svg>
    </div>
  )
}

// 3. Design Systems: Atomic Lattice
const AtomicLatticeFigure: React.FC = () => {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return

    let animId: number

    function frame(now: number) {
      const t = now / 1000
      let out = ''
      const spacing = 44, baseScale = 19

      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const pulse = Math.sin(t * 2 + (ix + 1) * 0.6 + (iy + 1) * 0.4) * 0.35 + 0.65
          const s = baseScale * pulse
          const x = (ix - iy) * (spacing * 0.866)
          const y = (ix + iy) * (spacing * 0.5) * 0.7

          out += `
            <polygon points="${x},${y - s} ${x + s * 0.866},${y - s * 0.5} ${x},${y} ${x - s * 0.866},${y - s * 0.5}" fill="none" stroke="#111111" stroke-width="1.2"/>
            <line x1="${x}" y1="${y}" x2="${x}" y2="${y + s}" stroke="#111111" stroke-width="1.2"/>
            <line x1="${x + s * 0.866}" y1="${y - s * 0.5}" x2="${x + s * 0.866}" y2="${y + s * 0.5}" stroke="#111111" stroke-width="1.2"/>
            <line x1="${x - s * 0.866}" y1="${y - s * 0.5}" x2="${x - s * 0.866}" y2="${y + s * 0.5}" stroke="#111111" stroke-width="1.2"/>
            <line x1="${x}" y1="${y + s}" x2="${x + s * 0.866}" y2="${y + s * 0.5}" stroke="#111111" stroke-width="1.2"/>
            <line x1="${x}" y1="${y + s}" x2="${x - s * 0.866}" y2="${y + s * 0.5}" stroke="#111111" stroke-width="1.2"/>
          `
          if (ix < 1) {
            const nx = ((ix + 1) - iy) * (spacing * 0.866)
            const ny = ((ix + 1) + iy) * (spacing * 0.5) * 0.7
            out += `<line x1="${x}" y1="${y}" x2="${nx}" y2="${ny}" stroke="#999999" stroke-width="0.8" stroke-dasharray="2 3"/>`
          }
        }
      }
      if (g) g.innerHTML = out
      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center select-none bg-transparent transition-transform duration-300 group-hover:scale-[1.03]">
      <svg viewBox="-120 -100 240 200" className="w-full h-full max-w-[280px] max-h-[220px] overflow-visible">
        <g ref={gRef} />
      </svg>
    </div>
  )
}

// 4. Accessibility: Frustum & Scanning Plane
const FrustumFigure: React.FC = () => {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return

    let animId: number

    function frame(now: number) {
      const t = now / 1000
      const ax = -85, ay = 0
      const bTL = { x: 75, y: -65 }, bTR = { x: 95, y: -50 }
      const bBR = { x: 95, y: 50 }, bBL = { x: 75, y: 65 }

      const p = 0.2 + ((Math.sin(t * 1.8) + 1) / 2) * 0.7
      const pTL = { x: ax + (bTL.x - ax) * p, y: ay + (bTL.y - ay) * p }
      const pTR = { x: ax + (bTR.x - ax) * p, y: ay + (bTR.y - ay) * p }
      const pBR = { x: ax + (bBR.x - ax) * p, y: ay + (bBR.y - ay) * p }
      const pBL = { x: ax + (bBL.x - ax) * p, y: ay + (bBL.y - ay) * p }
      const cx = (pTL.x + pBR.x) / 2, cy = (pTL.y + pBR.y) / 2

      let out = `
        <line x1="${ax}" y1="${ay}" x2="${bTL.x}" y2="${bTL.y}" stroke="#111111" stroke-width="1.3"/>
        <line x1="${ax}" y1="${ay}" x2="${bTR.x}" y2="${bTR.y}" stroke="#666666" stroke-width="0.9" stroke-dasharray="3 3"/>
        <line x1="${ax}" y1="${ay}" x2="${bBR.x}" y2="${bBR.y}" stroke="#666666" stroke-width="0.9" stroke-dasharray="3 3"/>
        <line x1="${ax}" y1="${ay}" x2="${bBL.x}" y2="${bBL.y}" stroke="#111111" stroke-width="1.3"/>
        <polygon points="${bTL.x},${bTL.y} ${bTR.x},${bTR.y} ${bBR.x},${bBR.y} ${bBL.x},${bBL.y}" fill="none" stroke="#111111" stroke-width="1.4"/>
        <polygon points="${pTL.x.toFixed(1)},${pTL.y.toFixed(1)} ${pTR.x.toFixed(1)},${pTR.y.toFixed(1)} ${pBR.x.toFixed(1)},${pBR.y.toFixed(1)} ${pBL.x.toFixed(1)},${pBL.y.toFixed(1)}" fill="#ffffff" fill-opacity="0.85" stroke="#111111" stroke-width="1.8"/>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5" fill="none" stroke="#111111" stroke-width="1.2"/>
        <line x1="${(cx - 9).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + 9).toFixed(1)}" y2="${cy.toFixed(1)}" stroke="#111111" stroke-width="1"/>
        <line x1="${cx.toFixed(1)}" y1="${(cy - 9).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy + 9).toFixed(1)}" stroke="#111111" stroke-width="1"/>
        <circle cx="${ax}" cy="${ay}" r="4" fill="#111111"/>
        <rect x="${ax - 8}" y="${ay - 8}" width="16" height="16" fill="none" stroke="#111111" stroke-width="1" stroke-dasharray="2 2"/>
      `
      if (g) g.innerHTML = out
      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center select-none bg-transparent transition-transform duration-300 group-hover:scale-[1.03]">
      <svg viewBox="-120 -100 240 200" className="w-full h-full max-w-[280px] max-h-[220px] overflow-visible">
        <g ref={gRef} />
      </svg>
    </div>
  )
}

export const GeometricFigure: React.FC<GeometricFigureProps> = ({ type }) => {
  if (type === 'research') {
    return <TesseractFigure />
  }
  if (type === 'design') {
    return <IsometricCubeFigure />
  }
  if (type === 'systems') {
    return <AtomicLatticeFigure />
  }
  return <FrustumFigure />
}
